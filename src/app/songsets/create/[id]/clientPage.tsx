'use client'
import { useEffect, useState } from "react";
import { CreateUpdateSongSetForm } from "./forms/createUpdateSongSetForm";
import { AddSongForm } from "./forms/addSongForm";
import { Table, TableRow } from "@/app/components/table";
import { X } from "lucide-react";
import { handleAddSongFormSubmit } from "@/repositories/song.repository";
import Link from "next/link";
import toast from "react-hot-toast";

type ClientCreateSongPageProps = {
  dbSet: SongSet | false;
  handleCreateFormSubmit: ({ }: CreateForm) => Promise<number | boolean>;
  handleAddSongFormSubmit: ({ }: AddSongFormSchema, songSetId: number) => Promise<number | boolean>;
  handleDeleteSong: (id: number) => Promise<boolean>;
}

type SongSetFormatter = {
  id: number;
  name: string;
  songs: Song[];
}

export type CreateForm = {
  name: string;
}

export type AddSongFormSchema = {
  anime: string;
  artist: string;
  name: string;
  link: string;
  type: string;
}

const initialValue = {
  id: 0,
  name: '',
  songs: []
}

export function ClientCreateSongPage({ dbSet, handleCreateFormSubmit, handleDeleteSong, handleAddSongFormSubmit }: ClientCreateSongPageProps) {
  const [songSet, setSongSet] = useState<SongSetFormatter>(initialValue)

  const cardTitle = dbSet == false ? "Create new Song set" : "Edit song set"
  const buttonTitle = dbSet == false ? "Create" : "Update";

  function updateSetSongSet(name: string, id: number) {
    setSongSet({
      ...songSet,
      name: name,
      id: Number(id)
    })
  }

  function addSongToSongSetState(song: Song) {
    const updatedSongs = songSet.songs.concat([...songSet.songs], [song])

    setSongSet({
      ...songSet,
      songs: updatedSongs
    })
  }

  function deleteSongToSongSetState(songId: number) {
    const updatedSongs = songSet.songs.filter(song => song.id !== songId)

    setSongSet({
      ...songSet,
      songs: updatedSongs
    })
  } 

  useEffect(() => {
    if (dbSet != false) {
      const dbSetAsSongSet = dbSet as SongSet
      setSongSet({
        id: dbSetAsSongSet.id,
        name: dbSetAsSongSet.name,
        songs: dbSetAsSongSet.songs || []
      })
    }
  }, [dbSet])

  async function onDeleteSong(id: number) {
    const result = await handleDeleteSong(id)

    if(result){
      deleteSongToSongSetState(id)
      toast.success("Song deleted successfully")
    }
  }

  return (
    <>
      <div className="infoSection">
        <h3>{cardTitle}</h3>
        <CreateUpdateSongSetForm
          songSet={songSet}
          handleCreateFormSubmit={handleCreateFormSubmit}
          updateSetSongSet={updateSetSongSet}
          buttonName={buttonTitle}
        />

        {
          songSet.id != 0 &&
          <div className="songFormSection">
            <h3>Add song</h3>
            <AddSongForm
              songSet={songSet}
              handleAddSongFormSubmit={handleAddSongFormSubmit}
              addSongToSongSetState={addSongToSongSetState}
            />
          </div>
        }
      </div>
      {
        songSet.songs.length > 0 &&
        <div className="songsDiv">
          <Table>
            {
              (songSet.songs.toReversed()).map(song => {
                return (
                  <TableRow key={song.id}>
                    <div className='info'>
                      <span>{`${song.artist} - ${song.name}`}</span>

                    </div>
                    <div className='actions'>
                      <X className="icon" onClick={() => { onDeleteSong(song.id) }} />
                    </div>
                  </TableRow>
                )
              })
            }
          </Table>
        </div>
      }

    </>
  )
}