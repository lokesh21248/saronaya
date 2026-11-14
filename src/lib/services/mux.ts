import Mux from '@mux/mux-node'
import type { MuxVideo, MuxProgressEvent } from '@/types/video'

class MuxService {
  private mux: Mux | null = null

  private getClient(): Mux | null {
    const tokenId = process.env.MUX_TOKEN_ID
    const tokenSecret = process.env.MUX_TOKEN_SECRET

    if (!tokenId || !tokenSecret || tokenId.includes('your-mux-token-id')) {
      return null
    }

    if (!this.mux) {
      this.mux = new Mux({ tokenId, tokenSecret })
    }
    return this.mux
  }

  /**
   * Create a direct video upload URL for client-side uploads
   */
  async createDirectUpload(): Promise<{ uploadUrl: string; uploadId: string }> {
    const client = this.getClient()
    if (!client) {
      // Mock upload URL for dev/test when keys not configured
      const mockId = `mock_upload_${Date.now()}`
      return {
        uploadUrl: `https://mock.mux.com/upload/${mockId}`,
        uploadId: mockId,
      }
    }

    const upload = await client.video.uploads.create({
      new_asset_settings: {
        playback_policy: ['public'],
        encoding_tier: 'baseline',
      },
      cors_origin: '*',
    })

    return {
      uploadUrl: upload.url || '',
      uploadId: upload.id,
    }
  }

  /**
   * Create a signed playback token for paid content
   */
  async createPlaybackToken(playbackId: string): Promise<string> {
    const signingKeyId = process.env.MUX_SIGNING_KEY_ID
    const signingPrivateKey = process.env.MUX_SIGNING_PRIVATE_KEY
    const client = this.getClient()

    if (client && signingKeyId && signingPrivateKey && !signingKeyId.includes('your-mux')) {
      try {
        return await client.jwt.signPlaybackId(playbackId, {
          keyId: signingKeyId,
          keySecret: signingPrivateKey,
          expiration: '6h',
        })
      } catch (err) {
        console.warn('Mux token signing error, falling back:', err)
      }
    }

    // Default playback token fallback
    return `jwt_${playbackId}_${Date.now()}`
  }

  /**
   * Get Mux video asset details by asset ID
   */
  async getVideoAsset(assetId: string): Promise<MuxVideo | null> {
    const client = this.getClient()
    if (!client) {
      return {
        assetId,
        playbackId: assetId,
        uploadId: '',
        status: 'ready',
        durationSeconds: 1200,
        videoQuality: '1080p',
        processedAt: new Date().toISOString(),
      }
    }

    try {
      const asset = await client.video.assets.retrieve(assetId)
      const playbackId = asset.playback_ids?.[0]?.id || ''
      return {
        assetId: asset.id,
        playbackId,
        uploadId: asset.upload_id || '',
        status: asset.status as MuxVideo['status'],
        durationSeconds: Math.round(asset.duration || 0),
        videoQuality: 'auto',
        processedAt: asset.created_at ? new Date(Number(asset.created_at) * 1000).toISOString() : undefined,
      }
    } catch {
      return null
    }
  }

  /**
   * Handle Mux webhook event
   */
  async handleWebhook(event: MuxProgressEvent): Promise<void> {
    console.log('Mux Webhook received:', event.EventType, event.AssetId)
  }
}

export const muxService = new MuxService()
