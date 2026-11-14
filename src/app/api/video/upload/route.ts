import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { muxService } from '@/lib/services/mux'

export const dynamic = 'force-dynamic'

// POST /api/video/upload - Generate Mux direct upload URL for client video uploads
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    const { uploadUrl, uploadId } = await muxService.createDirectUpload()

    return NextResponse.json({
      uploadUrl,
      uploadId,
    })
  } catch (error) {
    console.error('Mux direct upload error:', error)
    return NextResponse.json({ error: 'Failed to create video upload URL' }, { status: 500 })
  }
}
