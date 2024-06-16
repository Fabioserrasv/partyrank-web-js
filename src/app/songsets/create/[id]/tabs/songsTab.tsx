'use client'
import Select from "@/components/select";
import { Table, TableRow } from "@/components/table";
import { reverseArray } from "@/lib/utils";
import { Globe, Mic2, Monitor, X } from "lucide-react";
import { useEffect, useState } from "react";

type SongsTabProps = {
  isSetCreator: boolean;
  songs: Song[];
  onSongClick: (song: Song) => void
  onDeleteSong: (id: number) => Promise<void>
}

const formattedTypes = {
  "OPENING": "Opening",
  "ENDING": "Ending",
  "INSERT_SONG": "Insert Song"
}

const sortOptions = [
  { value: "inserted_desc", display: "Inserted (DESC)" },
  { value: "inserted_asc", display: "Inserted (ASC)" },
  { value: "ranking", display: "Ranking (RESULT)" },
]


export function SongsTab({ onDeleteSong, onSongClick, songs, isSetCreator }: SongsTabProps) {
  const [songsTab, setSongsTab] = useState<Song[]>(songs);

  function onChangeSort(e: React.ChangeEvent<HTMLSelectElement>) {
    let cloneSongs = [...songs]
    let songsSorted: Song[] = cloneSongs
    
    if (e.target.value == "inserted_asc") {
      songsSorted = cloneSongs
    } else if (e.target.value == "inserted_desc") {
      songsSorted = reverseArray(cloneSongs)
    } else if (e.target.value == "ranking") {
      songsSorted = cloneSongs.sort((songA, songB) => {
        let sumA = 0
        let sumB = 0
        songA.scores.map((sc) => {
          sumA += sc.value
        })
        songB.scores.map((sc) => {
          sumB += sc.value
        })
        if (sumA > sumB) return -1
        if (sumA < sumB) return 1
        return 0
      })
    }
    setSongsTab(songsSorted)
  }

  useEffect(() => {
    const s = [...songs]
    setSongsTab(reverseArray(s))
  }, [songs])

  return (
    <div className="songsDiv">
      <Select
        displayName="Sort By"
        name="sort"
        options={sortOptions}
        onChange={onChangeSort}
      />
      <Table>
        {
          songsTab.map(song => {
            return (
              <TableRow key={song.id}>
                <div className='info edit' onClick={() => { onSongClick(song) }}>
                  <span>{`${song.artist} - ${song.name}`}</span>
                  <div className="extraInfo">
                    <span>
                      <Monitor />
                      {song.anime}
                    </span>
                    <span>
                      <Mic2 />
                      {formattedTypes[song.type]}
                    </span>
                    <span>
                      <Globe />
                      {song.link}
                    </span>
                  </div>
                </div>
                {
                  isSetCreator &&
                  <div className='actions'>
                    <X className="icon" onClick={() => { onDeleteSong(song.id) }} />
                  </div>
                }
              </TableRow>
            )
          })
        }
      </Table>
    </div>
  )
}