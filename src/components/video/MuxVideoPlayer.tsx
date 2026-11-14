'use client'

import React, { useState } from 'react'
import MuxPlayer from '@mux/mux-player-react'

interface MuxVideoPlayerProps {
  playbackId?: string
  playbackToken?: string
  videoUrl?: string
  title?: string
  onEnded?: () => void
}

export function MuxVideoPlayer({
  playbackId,
  playbackToken,
  videoUrl,
  title,
  onEnded,
}: MuxVideoPlayerProps) {
  const [hasError, setHasError] = useState(false)

  const fallbackUrl =
    videoUrl ||
    'https://raw.githubusercontent.com/intel-iot-devkit/sample-videos/master/classroom.mp4'

  if (playbackId && !playbackId.startsWith('mock_') && !hasError) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <MuxPlayer
          playbackId={playbackId}
          tokens={playbackToken ? { playback: playbackToken } : undefined}
          metadata={{ video_title: title || 'SARYONAYA Video Lecture' }}
          streamType="on-demand"
          autoPlay={false}
          accentColor="#e5a93b"
          className="w-full h-full aspect-video max-h-[68vh]"
          onEnded={onEnded}
          onError={(e) => {
            console.warn('Mux Player encountered an error, falling back to direct video stream:', e)
            setHasError(true)
          }}
        />
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <video
        src={fallbackUrl}
        controls
        playsInline
        className="w-full h-full object-contain max-h-[68vh]"
        onEnded={onEnded}
      />
    </div>
  )
}
