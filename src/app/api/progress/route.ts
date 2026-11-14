import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// POST /api/progress - Save lesson watch position & mark completion
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    const body = await request.json()
    const { lessonId, courseId, positionSeconds, completed } = body

    if (!lessonId || !courseId) {
      return NextResponse.json({ error: 'lessonId and courseId are required' }, { status: 400 })
    }

    const studentId = userId || body.studentId || 'guest-student'

    // Upsert watch_progress
    const { data: existingProgress } = await supabaseAdmin
      .from('watch_progress')
      .select('id')
      .eq('student_id', studentId)
      .eq('lesson_id', lessonId)
      .single()

    if (existingProgress) {
      await supabaseAdmin
        .from('watch_progress')
        .update({
          position_seconds: positionSeconds || 0,
          completed: !!completed,
          last_watched_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingProgress.id)
    } else {
      await supabaseAdmin.from('watch_progress').insert({
        student_id: studentId,
        lesson_id: lessonId,
        course_id: courseId,
        position_seconds: positionSeconds || 0,
        completed: !!completed,
        last_watched_at: new Date().toISOString(),
      })
    }

    // Record completion if marked complete
    if (completed) {
      const { data: existingCompletion } = await supabaseAdmin
        .from('lesson_completions')
        .select('id')
        .eq('student_id', studentId)
        .eq('lesson_id', lessonId)
        .single()

      if (!existingCompletion) {
        await supabaseAdmin.from('lesson_completions').insert({
          student_id: studentId,
          lesson_id: lessonId,
          course_id: courseId,
          completed_at: new Date().toISOString(),
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Watch progress saved successfully',
    })
  } catch (error) {
    console.error('Watch progress error:', error)
    return NextResponse.json({ error: 'Failed to update watch progress' }, { status: 500 })
  }
}
