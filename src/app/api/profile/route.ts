import { NextRequest, NextResponse } from 'next/server'
import { auth, currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// GET /api/profile - Fetch student profile and academic qualification
export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('clerk_user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.warn('Error fetching profile:', error)
    }

    let qualification = null
    if (profile) {
      const { data: qual } = await supabaseAdmin
        .from('academic_qualifications')
        .select('*')
        .eq('profile_id', profile.id)
        .single()
      qualification = qual
    }

    return NextResponse.json({
      profile: profile || null,
      qualification: qualification || null,
    })
  } catch (error) {
    console.error('Profile GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/profile - Save or update student academic profile
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    const user = await currentUser()
    const body = await request.json()

    const {
      fullName,
      phone,
      educationLevel,
      collegeName,
      degree,
      branchCode,
      passedOutYear,
    } = body

    const clerkId = userId || body.clerkUserId || 'guest-user'
    const email = user?.primaryEmailAddress?.emailAddress || body.email || 'student@saryonaya.com'
    const name = fullName || user?.fullName || 'Student'

    // Upsert profile
    const { data: existingProfile } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('clerk_user_id', clerkId)
      .single()

    let profileId = existingProfile?.id

    if (profileId) {
      await supabaseAdmin
        .from('profiles')
        .update({
          full_name: name,
          phone: phone || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profileId)
    } else {
      const { data: newProfile } = await supabaseAdmin
        .from('profiles')
        .insert({
          clerk_user_id: clerkId,
          full_name: name,
          email: email,
          phone: phone || null,
          role: 'student',
          status: 'active',
        })
        .select('id')
        .single()

      profileId = newProfile?.id
    }

    // Find branch by code
    if (profileId && branchCode) {
      const { data: branch } = await supabaseAdmin
        .from('academic_branches')
        .select('id')
        .eq('branch_code', branchCode)
        .single()

      const branchId = branch?.id || null

      const { data: existingQual } = await supabaseAdmin
        .from('academic_qualifications')
        .select('id')
        .eq('profile_id', profileId)
        .single()

      if (existingQual) {
        await supabaseAdmin
          .from('academic_qualifications')
          .update({
            college_name: collegeName || null,
            branch_id: branchId,
            degree: degree || educationLevel || null,
            field_of_study: branchCode,
            passed_out_year: passedOutYear ? Number(passedOutYear) : null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingQual.id)
      } else {
        await supabaseAdmin.from('academic_qualifications').insert({
          profile_id: profileId,
          college_name: collegeName || null,
          branch_id: branchId,
          degree: degree || educationLevel || null,
          field_of_study: branchCode,
          passed_out_year: passedOutYear ? Number(passedOutYear) : null,
          is_current: true,
        })
      }
    }

    return NextResponse.json({
      success: true,
      profileId,
      branchCode,
      message: 'Academic profile saved successfully',
    })
  } catch (error) {
    console.error('Profile POST error:', error)
    return NextResponse.json({ error: 'Failed to update academic profile' }, { status: 500 })
  }
}
