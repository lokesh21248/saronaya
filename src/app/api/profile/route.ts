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
      .or(`clerk_id.eq.${userId},clerk_user_id.eq.${userId}`)
      .maybeSingle()

    if (error && error.code !== 'PGRST116') {
      console.warn('Error fetching profile:', error)
    }

    let qualification = null
    if (profile) {
      const { data: qual } = await supabaseAdmin
        .from('academic_qualifications')
        .select('*, branch:academic_branches(*)')
        .or(`student_id.eq.${profile.id},profile_id.eq.${profile.id}`)
        .maybeSingle()
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

    const clerkId = userId || body.clerkUserId || user?.id || null
    const email = user?.primaryEmailAddress?.emailAddress || body.email?.trim().toLowerCase() || 'student@saryonaya.com'
    const name = fullName?.trim() || user?.fullName || `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Student'

    // Look up existing profile by clerk_id OR email
    let existingProfile = null
    if (clerkId) {
      const { data } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .or(`clerk_id.eq.${clerkId},clerk_user_id.eq.${clerkId}`)
        .maybeSingle()
      existingProfile = data
    }

    if (!existingProfile && email) {
      const { data } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('email', email)
        .maybeSingle()
      existingProfile = data
    }

    let profileId = existingProfile?.id

    if (profileId) {
      await supabaseAdmin
        .from('profiles')
        .update({
          full_name: name,
          phone: phone || null,
          ...(clerkId && { clerk_id: clerkId, clerk_user_id: clerkId }),
          updated_at: new Date().toISOString(),
        })
        .eq('id', profileId)
    } else {
      const insertData: Record<string, any> = {
        full_name: name,
        email: email,
        phone: phone || null,
        status: 'active',
      }
      if (clerkId) {
        insertData.clerk_id = clerkId
        insertData.clerk_user_id = clerkId
      }

      const { data: newProfile, error: insertError } = await supabaseAdmin
        .from('profiles')
        .insert(insertData)
        .select('id')
        .single()

      if (insertError) {
        console.error('Failed to insert new student profile:', insertError)
      }
      profileId = newProfile?.id
    }

    // Find branch by code or branch_code
    if (profileId && branchCode) {
      const { data: branch } = await supabaseAdmin
        .from('academic_branches')
        .select('id')
        .or(`code.eq.${branchCode},branch_code.eq.${branchCode}`)
        .maybeSingle()

      const branchId = branch?.id || null

      const { data: existingQual } = await supabaseAdmin
        .from('academic_qualifications')
        .select('id')
        .or(`student_id.eq.${profileId},profile_id.eq.${profileId}`)
        .maybeSingle()

      const qualPayload: any = {
        student_id: profileId,
        profile_id: profileId,
        branch_id: branchId,
        college_name: collegeName || null,
        degree: degree || educationLevel || null,
        passed_out_year: passedOutYear ? Number(passedOutYear) : null,
      }

      if (existingQual) {
        await supabaseAdmin
          .from('academic_qualifications')
          .update(qualPayload)
          .eq('id', existingQual.id)
      } else {
        await supabaseAdmin
          .from('academic_qualifications')
          .insert(qualPayload)
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
