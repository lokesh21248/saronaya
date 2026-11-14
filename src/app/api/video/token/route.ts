import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { muxService } from '@/lib/services/mux'

export const dynamic = 'force-dynamic'

// GET /api/video/token?playbackId=xyz - Generates a signed Mux JWT token for paid playback
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()
    const { searchParams } = new URL(request.url)
    const playbackId = searchParams.get('playbackId')

    if (!playbackId) {
      return NextResponse.json({ error: 'playbackId is required' }, { status: 400 })
    }

    const token = await muxService.createPlaybackToken(playbackId)

    return NextResponse.json({
      token,
      playbackId,
    })
  } catch (error) {
    console.error('Mux token generation error:', error)
    return NextResponse.json({ error: 'Failed to generate video playback token' }, { status: 500 })
  }
}
