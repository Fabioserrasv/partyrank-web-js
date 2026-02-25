'use client'
import { Monitor } from "lucide-react";

type VideoPlayerProps = {
  selectedSong: Song;
  isTheaterMode: boolean;
  onToggleTheaterMode: () => void;
}

export function VideoPlayer({ selectedSong, isTheaterMode, onToggleTheaterMode }: VideoPlayerProps) {
  return (
    <div className={`video`}>
      {selectedSong?.link ?
        <>
          {
            (selectedSong.link.includes('drive.google.com') || selectedSong.link.includes('youtube.com')) ?
            <iframe src={selectedSong.link} ></iframe>
            :
            <video src={selectedSong.link} controls muted></video>
          }
          <div className="video-controls">
            <Monitor onClick={onToggleTheaterMode} />
          </div>
        </>
      : <div>Song Not Found</div>}
    </div>
  );
}
