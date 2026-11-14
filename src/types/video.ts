export interface MuxVideo {
  assetId: string
  playbackId: string
  uploadId: string
  status: 'pending' | 'uploading' | 'processing' | 'ready' | 'failed'
  durationSeconds: number
  videoQuality: string | undefined
  processedAt: string | undefined
}

export interface VideoUploadRequest {
  assetId: string
  description: string
  container?: string
}

export interface VideoUploadResponse {
  assetId: string
  playbackId: string
  uploadId: string
  status: 'pending' | 'ready'
  durationSeconds: number
  videoQuality: string | undefined
  processedAt: string | undefined
}

export interface MuxPlaybackTokenRequest {
  assetId: string
  playbackPolicy?: 'public' | 'signed'
  signature?: string
  expiresAt?: string
}

export interface MuxProgressEvent {
  EventType: string
  AssetId: string
  PlaybackId?: string
  StatusCode: string
  Message: string
  Time?: string
  Version?: string
  RequestId?: string
  Signature?: string
  Payload?: string
}
