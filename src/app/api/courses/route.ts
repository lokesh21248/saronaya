import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const branch = searchParams.get('branch')
    const category = searchParams.get('category')
    const search = searchParams.get('search') || searchParams.get('q')
    const slug = searchParams.get('slug')

    // Fetch from Supabase with relations
    let query = supabaseAdmin
      .from('courses')
      .select(`
        *,
        category:categories(*),
        primary_instructor:primary_instructor_id(*),
        course_sections(
          id,
          title,
          sort_order,
          lessons(
            id,
            title,
            sort_order,
            duration_minutes,
            duration_seconds,
            is_preview
          )
        )
      `)
      .order('created_at', { ascending: false })

    if (slug) {
      query = query.eq('slug', slug)
    }

    if (branch && branch !== 'ALL') {
      try {
        const { data: mappings } = await supabaseAdmin
          .from('course_branch_mappings')
          .select('course_id, academic_branches!inner(code, branch_code)')
          .or(`academic_branches.code.eq.${branch},academic_branches.branch_code.eq.${branch}`)

        if (mappings && mappings.length > 0) {
          const courseIds = mappings.map((m: any) => m.course_id)
          query = query.in('id', courseIds)
        }
      } catch (branchErr) {
        console.warn('Branch mapping query notice:', branchErr)
      }
    }

    const { data: dbCourses, error } = await query

    let courses = dbCourses || []

    // If database returned empty or error, fallback to Admin Portal API
    if (courses.length === 0 && !error) {
      try {
        const adminUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://admin-saronya.vercel.app'
        const adminRes = await fetch(`${adminUrl}/api/courses`, { cache: 'no-store' })
        if (adminRes.ok) {
          const adminJson = await adminRes.json()
          if (adminJson.success && Array.isArray(adminJson.data)) {
            courses = adminJson.data
          }
        }
      } catch (adminErr) {
        console.warn('Courses fallback to admin API notice:', adminErr)
      }
    }

    // Normalize course data fields
    let normalized = courses.map((c: any) => {
      const sections = c.course_sections || []
      const lessonsCount =
        c.lessons_count ||
        sections.reduce((acc: number, s: any) => acc + (s.lessons ? s.lessons.length : 0), 0)

      const instructorName =
        c.primary_instructor?.full_name ||
        c.instructor?.name ||
        c.primary_instructor?.name ||
        'Sarvonaya Faculty'

      const instructorBio =
        c.primary_instructor?.bio ||
        c.instructor?.title ||
        'Senior Academic Faculty'

      const catName = c.category?.name || c.categories?.name || 'Engineering'

      return {
        ...c,
        category: c.category || c.categories || { name: catName, slug: c.category_id || 'engineering' },
        categories: c.category || c.categories || { name: catName, slug: c.category_id || 'engineering' },
        instructor: {
          name: instructorName,
          bio: instructorBio,
          avatar: c.primary_instructor?.avatar_url || null,
        },
        primary_instructor: c.primary_instructor || {
          full_name: instructorName,
          bio: instructorBio,
        },
        lessons_count: lessonsCount,
        sections_count: sections.length,
        average_rating: Number(c.average_rating) || 4.8,
        reviews_count: Number(c.reviews_count) || 128,
        price: Number(c.price) || 0,
        discount_price: c.discount_price ? Number(c.discount_price) : undefined,
        thumbnail_url: c.thumbnail_url || '/images/mockup/card1-full.png',
      }
    })

    // Filter by category
    if (category && category !== 'ALL') {
      const catLower = category.toLowerCase()
      normalized = normalized.filter((c: any) => {
        const cName = (c.category?.name || '').toLowerCase()
        const cSlug = (c.category?.slug || '').toLowerCase()
        const cId = c.category_id || ''
        return cName === catLower || cSlug === catLower || cId === category || cName.includes(catLower)
      })
    }

    // Filter by search query
    if (search) {
      const q = search.toLowerCase()
      normalized = normalized.filter((c: any) => {
        return (
          c.title?.toLowerCase().includes(q) ||
          c.short_description?.toLowerCase().includes(q) ||
          c.full_description?.toLowerCase().includes(q) ||
          c.instructor?.name?.toLowerCase().includes(q)
        )
      })
    }

    return NextResponse.json(
      {
        success: true,
        data: normalized,
        total: normalized.length,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    )
  } catch (err) {
    console.error('API /courses error:', err)
    return NextResponse.json({ error: 'Failed to fetch courses', data: [], total: 0 }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, description, price, category_id } = body

    if (!title || !slug) {
      return NextResponse.json({ error: 'Title and slug are required' }, { status: 400 })
    }

    const { data: course, error } = await supabaseAdmin
      .from('courses')
      .insert({
        title,
        slug,
        short_description: description,
        price: price || 0,
        category_id: category_id || null,
        status: 'published',
      })
      .select()
      .single()

    if (error) {
      console.warn('Supabase course insert warning:', error)
      return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: course,
      message: 'Course created successfully',
    })
  } catch (err) {
    console.error('API /courses POST error:', err)
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
  }
}
