'use client'
import { Select } from "@/components/select";
import { Table, TableRow } from "@/components/table";
import { reverseArray } from "@/lib/utils";
import { Globe, Mic2, Monitor, X } from "lucide-react";
import { useEffect, useState } from "react";
import ConfirmDeleteModal from '@/components/confirm-delete-modal';

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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [songIdToRemove, setSongIdToRemove] = useState<number | null>(null);

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

  function openDeleteModal(songId: number) {
    setSongIdToRemove(songId);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
    setSongIdToRemove(null);
  }

  async function handleConfirmDelete() {
    if (songIdToRemove !== null) {
      await onDeleteSong(songIdToRemove);
      closeDeleteModal();
    }
  }

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
                  <span className="song-title">{`${song.artist} - ${song.name}`}</span>
                  <small className="song-anime-mobile">{song.anime}</small>
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
                    <X className="icon" onClick={() => { openDeleteModal(song.id) }} />
                  </div>
                }
              </TableRow>
            )
          })
        }
      </Table>

      {isDeleteModalOpen && songIdToRemove !== null && (
        <ConfirmDeleteModal
          title="Delete song"
          message={`Are you sure you want to delete the song ${songsTab.find(s => s.id === songIdToRemove)?.artist} - ${songsTab.find(s => s.id === songIdToRemove)?.name}?`}
          onConfirm={handleConfirmDelete}
          onCancel={closeDeleteModal}
        />
      )}
    </div>
  )
}