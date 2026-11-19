import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { AcademicBranch, InsertAcademicBranch } from '@/types/database'

// GET /api/branches - Get all active branches
export async function GET() {
  try {
    const { data, error, status } = await supabaseAdmin
      .from('academic_branches')
      .select('*')
      .eq('is_active', true)

    if (error) {
      console.warn('Supabase branches fetch warning:', error)
    }

    const normalized = (data || []).map((b: any) => ({
      ...b,
      branch_code: b.branch_code || b.code,
      code: b.code || b.branch_code,
      branch_name: b.branch_name || b.name,
      name: b.name || b.branch_name,
    }))
    return NextResponse.json({
      data: normalized as AcademicBranch[],
      total: normalized.length,
    })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// POST /api/branches - Create a new branch (admin only)
export async function POST(request: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: Admin authentication required' }, { status: 401 })
    }

    const body = await request.json()
    const rawCode = body.branch_code || body.code
    const rawName = body.branch_name || body.name
    const { description, icon, sort_order } = body

    if (!rawCode || !rawName) {
      return NextResponse.json(
        { error: 'Branch code and name are required' },
        { status: 400 }
      )
    }

    const branch_code = rawCode.toUpperCase().trim()
    const branch_name = rawName.trim()

    // Check if branch already exists
    const { data: existing } = await supabaseAdmin
      .from('academic_branches')
      .select('id')
      .or(`code.eq.${branch_code},branch_code.eq.${branch_code}`)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: 'Branch code already exists' },
        { status: 409 }
      )
    }

    const newBranch: any = {
      code: branch_code,
      branch_code,
      name: branch_name,
      branch_name,
      description: description || null,
      icon: icon || null,
      sort_order: sort_order || 0,
      is_active: true,
    }

    const { data, error, status } = await supabaseAdmin
      .from('academic_branches')
      .insert(newBranch)
      .select()
      .single()

    if (error) {
      console.error('Error creating branch:', error)
      return NextResponse.json(
        { error: 'Failed to create branch' },
        { status: status || 500 }
      )
    }

    return NextResponse.json(
      { data: data as AcademicBranch, message: 'Branch created successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
