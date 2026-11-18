import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const branch = searchParams.get('branch')
    const category = searchParams.get('category')
    const search = searchParams.get('search') || searchParams.get('q')

    // Fetch from Supabase
    let query = supabaseAdmin
      .from('courses')
      .select('*, categories(*), primary_instructor:primary_instructor_id(*)')
      .eq('is_published', true)

    if (branch) {
      // If branch specified, check course_branch_mappings
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
    if (courses.length === 0) {
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

    // In-memory filters for category & search if requested
    if (category && category !== 'ALL') {
      const catLower = category.toLowerCase()
      courses = courses.filter((c: any) => {
        const catName = c.categories?.name?.toLowerCase() || c.category?.name?.toLowerCase() || ''
        const catSlug = c.categories?.slug?.toLowerCase() || c.category?.slug?.toLowerCase() || ''
        const catId = c.category_id || ''
        return catName === catLower || catSlug === catLower || catId === category || catName.includes(catLower)
      })
    }

    if (search) {
      const q = search.toLowerCase()
      courses = courses.filter((c: any) => {
        return (
          c.title?.toLowerCase().includes(q) ||
          c.short_description?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q)
        )
      })
    }

    return NextResponse.json(
      {
        success: true,
        data: courses,
        total: courses.length,
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
        description,
        price: price || 0,
        category_id: category_id || null,
        is_published: true,
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
