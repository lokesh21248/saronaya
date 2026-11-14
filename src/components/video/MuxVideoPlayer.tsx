'use client'

import React from 'react'
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
  if (playbackId && !playbackId.startsWith('mock_')) {
    return (
      <div className="w-full h-full bg-black flex items-center justify-center">
        <MuxPlayer
          playbackId={playbackId}
          tokens={playbackToken ? { playback: playbackToken } : undefined}
          metadata={{ video_title: title }}
          streamType="on-demand"
          autoPlay={false}
          accentColor="#d9ad61"
          className="w-full h-full aspect-video max-h-[68vh]"
          onEnded={onEnded}
        />
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <video
        src={videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
        controls
        className="w-full h-full object-contain max-h-[68vh]"
        onEnded={onEnded}
      />
    </div>
  )
}
