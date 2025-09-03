'use client'
import { useState } from "react";
import SongFinderComponent from "@/components/songfinder";

type SongFinderClientPageProps = {
  services: SongService[]
  populateTableSongsWeb?: (songs: SongWeb[]) => void;
}

export function SongFinderClientPage({ services }: SongFinderClientPageProps) {
  const [songsFind, setSongsFind] = useState<SongWeb[]>([]);

  function populateTableSongsWeb(songs: SongWeb[]) {
    setSongsFind(songs);
  }

  return (
    <SongFinderComponent
      songsFind={songsFind}
      populateTableSongsWeb={populateTableSongsWeb}
      actions={false}
      services={services}
    />
  )
}