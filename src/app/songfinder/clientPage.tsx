'use client'
import { useState } from "react";
import SongFinderComponent from "../components/songfinder";

type SongFinderClientPageProps = {
  handleSongFinderFormSubmit: (data: SongFinderAction) => Promise<SongWeb[]>;
  populateTableSongsWeb?: (songs: SongWeb[]) => void;
}

export function SongFinderClientPage({
  handleSongFinderFormSubmit
}: SongFinderClientPageProps) {
  const [songsFind, setSongsFind] = useState<SongWeb[]>([]);

  function populateTableSongsWeb(songs: SongWeb[]) {
    setSongsFind(songs);
  }

  return (
    <SongFinderComponent
      songsFind={songsFind}
      handleSongFinderFormSubmit={handleSongFinderFormSubmit}
      populateTableSongsWeb={populateTableSongsWeb}
      actions={false}
    />
  )
}