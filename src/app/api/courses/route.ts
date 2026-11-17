import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const branch = searchParams.get('branch')
    const category = searchParams.get('category')

    // Fetch from Supabase
    let query = supabaseAdmin.from('courses').select('*, categories(*), primary_instructor:primary_instructor_id(*)')
    if (branch) {
      // If branch specified, check course_branch_mappings
      const { data: mappings } = await supabaseAdmin
        .from('course_branch_mappings')
        .select('course_id, academic_branches!inner(code, branch_code)')
        .or(`academic_branches.code.eq.${branch},academic_branches.branch_code.eq.${branch}`)

      if (mappings && mappings.length > 0) {
        const courseIds = mappings.map((m: any) => m.course_id)
        query = query.in('id', courseIds)
      }
    }

    const { data: dbCourses, error } = await query

    if (error) {
      console.warn('API /courses Supabase query notice:', error.message)
    }

    const courses = dbCourses || []

    return NextResponse.json({
      data: courses,
      total: courses.length,
    })
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
