import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

// POST /api/webhooks/mux - Receives video processing lifecycle events from Mux
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('mux-signature')

    let event: any
    try {
      event = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }

    const { type, data } = event

    console.log(`[Mux Webhook] Received event: ${type}`, data?.id)

    switch (type) {
      case 'video.asset.ready': {
        const assetId = data.id
        const uploadId = data.upload_id
        const playbackId = data.playback_ids?.[0]?.id || ''
        const durationSeconds = Math.round(data.duration || 0)

        console.log(`[Mux Webhook] Video asset ready: ${assetId}, Playback ID: ${playbackId}`)

        // Update lesson status in Supabase if associated with uploadId or assetId
        if (uploadId) {
          await supabaseAdmin
            .from('lessons')
            .update({
              mux_asset_id: assetId,
              mux_playback_id: playbackId,
              video_status: 'ready',
              duration_seconds: durationSeconds,
              processed_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq('mux_upload_id', uploadId)
        }
        break
      }

      case 'video.asset.errored': {
        const assetId = data.id
        const uploadId = data.upload_id
        const errorMessage = data.errors?.messages?.join(', ') || 'Video encoding error'

        console.error(`[Mux Webhook] Video asset error for ${assetId}: ${errorMessage}`)

        if (uploadId) {
          await supabaseAdmin
            .from('lessons')
            .update({
              video_status: 'failed',
              updated_at: new Date().toISOString(),
            })
            .eq('mux_upload_id', uploadId)
        }
        break
      }

      default:
        console.log(`[Mux Webhook] Unhandled event type: ${type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Mux Webhook Error]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
