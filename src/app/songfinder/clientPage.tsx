'use client'
import { useState } from "react";
import SongFinderComponent from "@/components/songfinder";

type SongFinderClientPageProps = {
  populateTableSongsWeb?: (songs: SongWeb[]) => void;
}

export function SongFinderClientPage({ }: SongFinderClientPageProps) {
  const [songsFind, setSongsFind] = useState<SongWeb[]>([]);

  function populateTableSongsWeb(songs: SongWeb[]) {
    setSongsFind(songs);
  }

  return (
    <SongFinderComponent
      songsFind={songsFind}
      populateTableSongsWeb={populateTableSongsWeb}
      actions={false}
    />
  )
}