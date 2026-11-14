import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import { AcademicBranch, InsertAcademicBranch } from '@/types/database'

// GET /api/branches - Get all active branches
export async function GET() {
  try {
    const { data, error, status } = await supabaseAdmin
      .from('academic_branches')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching branches:', error)
      return NextResponse.json(
        { error: 'Failed to fetch branches' },
        { status: status || 500 }
      )
    }

    return NextResponse.json({
      data: data as AcademicBranch[],
      total: data?.length || 0,
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
    const body = await request.json()
    const { branch_code, branch_name, description, icon, sort_order } = body

    if (!branch_code || !branch_name) {
      return NextResponse.json(
        { error: 'Branch code and name are required' },
        { status: 400 }
      )
    }

    // Check if branch already exists
    const { data: existing } = await supabaseAdmin
      .from('academic_branches')
      .select('id')
      .eq('branch_code', branch_code)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'Branch code already exists' },
        { status: 409 }
      )
    }

    const newBranch: InsertAcademicBranch = {
      branch_code,
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
