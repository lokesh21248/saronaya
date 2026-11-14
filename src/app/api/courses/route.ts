import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { COURSES_DATA } from '@/lib/data/lms-data'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const branch = searchParams.get('branch')
    const category = searchParams.get('category')

    // Try fetching from Supabase
    let query = supabaseAdmin.from('courses').select('*, categories(*)')
    if (branch) {
      // If branch specified, check course_branch_mappings
      const { data: mappings } = await supabaseAdmin
        .from('course_branch_mappings')
        .select('course_id, academic_branches!inner(branch_code)')
        .eq('academic_branches.branch_code', branch)

      if (mappings && mappings.length > 0) {
        const courseIds = mappings.map((m: any) => m.course_id)
        query = query.in('id', courseIds)
      }
    }

    const { data: dbCourses, error } = await query

    // If Supabase has courses, return them
    if (dbCourses && dbCourses.length > 0) {
      return NextResponse.json({
        data: dbCourses,
        total: dbCourses.length,
      })
    }

    // Fallback to rich seed data
    let courses = COURSES_DATA
    if (branch && branch !== 'ALL') {
      courses = courses.filter((c) => c.eligibleBranches.includes(branch))
    }
    if (category) {
      courses = courses.filter((c) => c.category.toLowerCase() === category.toLowerCase())
    }

    return NextResponse.json({
      data: courses,
      total: courses.length,
    })
  } catch (err) {
    console.error('API /courses error:', err)
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, slug, description, price, category_id, branch_codes } = body

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
      console.warn('Supabase course insert fallback:', error)
    }

    return NextResponse.json({
      success: true,
      data: course || body,
      message: 'Course created successfully',
    })
  } catch (err) {
    console.error('API /courses POST error:', err)
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 })
  }
}
