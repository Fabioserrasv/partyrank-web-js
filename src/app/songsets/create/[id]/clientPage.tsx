'use client'
import { useEffect, useState } from "react";
import { CreateUpdateSongSetForm } from "./forms/createUpdateSongSetForm";
import { AddSongForm } from "./forms/addSongForm";
import { Table, TableRow } from "@/app/components/table";
import { Globe, Mic2, Monitor, X } from "lucide-react";
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
  id: number;
  name: string;
}

export type AddSongFormSchema = {
  id: number;
  anime: string;
  artist: string;
  name: string;
  link: string;
  type: SongType;
}

const initialValue = {
  id: 0,
  name: '',
  songs: []
}

export const initialSongValue: AddSongFormSchema = {
  id: 0,
  anime: '',
  artist: '',
  name: '',
  link: '',
  type: 'OPENING' as SongType
}

const formattedTypes = {
  "OPENING": "Opening",
  "ENDING": "Ending",
  "INSERT_SONG": "Insert Song"
}

export function ClientCreateSongPage({ dbSet, handleCreateFormSubmit, handleDeleteSong, handleAddSongFormSubmit }: ClientCreateSongPageProps) {
  const [songSet, setSongSet] = useState<SongSetFormatter>(initialValue)
  const [song, setSong] = useState<AddSongFormSchema>(initialSongValue)

  const cardTitle = dbSet == false ? "Create new Song set" : "Edit song set"
  const buttonTitle = dbSet == false ? "Create" : "Update";

  function updateSetSongSet(name: string, id: number) {
    setSongSet({
      ...songSet,
      name: name,
      id: Number(id)
    })
  }

  function updateSongState(song: AddSongFormSchema) {
    setSong(song)
  }

  function addSongToSongSetState(song: Song) {
    let newSong = true
    const updatedSongs = songSet.songs.map((songOld) => { 
      if(songOld.id == song.id) {
        songOld = song
        newSong = false
      }
      return songOld
    })

    if (newSong){
      updatedSongs.push(song)
    }

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

  async function onDeleteSong(id: number) {
    const result = await handleDeleteSong(id)

    if (result) {
      deleteSongToSongSetState(id)
      toast.success("Song deleted successfully")
    }
  }

  function onSongClick(song: Song) {
    setSong({
      id: song.id,
      name: song.name,
      anime: song.anime,
      artist: song.artist,
      link: song.link,
      type: song.type
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
              song={song}
              updateSongState={updateSongState}
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
                    <div className='info' onClick={() => { onSongClick(song) }}>
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