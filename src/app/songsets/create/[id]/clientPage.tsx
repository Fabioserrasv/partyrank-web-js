'use client'
import { useEffect, useState } from "react";
import { CreateUpdateSongSetForm } from "./forms/createUpdateSongSetForm";
import { AddSongForm } from "./forms/addSongForm";
import { Music, Search, Upload, Users } from "lucide-react";
import toast from "react-hot-toast";
import { SongFinderModal } from "./modals/songFinderModal";
import { JsonViewModal } from "./modals/jsonViewModal";
import { UsersTab } from "./tabs/usersTab";
import { SongsTab } from "./tabs/songsTab";

type ClientCreateSongPageProps = {
  dbSet: SongSet | null;
  user: User;
  handleCreateFormSubmit: ({ }: SongSetPostData) => Promise<number | boolean>;
  handleAddSongFormSubmit: ({ }: AddSongFormSchema, songSetId: number) => Promise<number | boolean>;
  handleSongFinderFormSubmit: (data: SongFinderAction) => Promise<SongWeb[]>;
  handleDeleteSong: (id: number) => Promise<boolean>;
  handleGetSongSet: (id: number, generateJson: boolean) => Promise<SongSet | null>
  handleInviteUser: (songSetId: number, username: string) => Promise<Boolean>
  handleUpdateSongSet:(set: SongSetPostData, id: number) => Promise<SongSet>
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
  type: 'PRIVATE' as SongSetType,
  status: 'ON_GOING' as SongSetStatus,
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

type tabs = "users" | "songs"

export function ClientCreateSongPage({
  dbSet,
  user,
  handleCreateFormSubmit,
  handleDeleteSong,
  handleSongFinderFormSubmit,
  handleAddSongFormSubmit,
  handleGetSongSet,
  handleInviteUser,
  handleUpdateSongSet
}: ClientCreateSongPageProps) {

  const [songSet, setSongSet] = useState<SongSet>(initialValue)
  const [song, setSong] = useState<AddSongFormSchema>(initialSongValue)
  const [songFinderModalOpen, setSongFinderModalOpen] = useState<boolean>(false);
  const [jsonModalOpen, setJsonModalOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<tabs>("songs");
  const [isSetCreator, setIsSetCreator] = useState<boolean>(false);

  const cardTitle = dbSet == null ? "Create new Song set" : "Edit song set"
  const buttonTitle = dbSet == null ? "Create" : "Update";

  function updateSetSongSet(name: string, id: number) {
    setSongSet({
      ...songSet,
      name: name,
      user: user,
      id: Number(id)
    })
  }

  function updateNewSongSet(newSongSet: SongSet) {
    setSongSet(newSongSet)
  }
  
  function changeSongFinderModalOpen(isModalOpen: boolean) {
    setSongFinderModalOpen(isModalOpen)
  }

  function changeJsonModalOpen(isModalOpen: boolean) {
    setJsonModalOpen(isModalOpen)
  }

  function updateSongState(song: AddSongFormSchema) {
    setSong(song)
  }

  function addSongToSongSetState(song: Song) {
    let newSong = true

    const updatedSongs = songSet.songs!.map((songOld) => {
      if (songOld.id == song.id) {
        songOld = song
        newSong = false
      }
      return songOld
    })

    if (newSong) {
      updatedSongs.push(song)
    }

    setSongSet({
      ...songSet,
      songs: updatedSongs
    })
  }

  function addArrayToSongSet(songs: Song[]) {
    setSongSet({
      ...songSet,
      songs: [
        ...songSet.songs!,
        ...songs
      ]
    })
  }

  function deleteSongToSongSetState(songId: number) {
    const updatedSongs = songSet.songs!.filter(song => song.id !== songId)

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
    if (dbSet != null) {
      const dbSetAsSongSet = dbSet as SongSet
      setSongSet({
        id: dbSetAsSongSet.id,
        type: dbSetAsSongSet.type,
        status: dbSetAsSongSet.status,
        name: dbSetAsSongSet.name,
        user: dbSetAsSongSet.user,
        usersOn: dbSetAsSongSet.usersOn,
        songs: dbSetAsSongSet.songs || []
      })
    }
  }, [dbSet]) 

  useEffect(() => {
    setIsSetCreator(Boolean(songSet.id && songSet.id != 0 && songSet.user?.id == user.id))
  }, [songSet]) 

  return (
    <>
      {
        songFinderModalOpen &&
        <SongFinderModal
          songSet={songSet}
          addSongToSongSetState={addSongToSongSetState}
          changeSongFinderModalOpen={changeSongFinderModalOpen}
          handleAddSongFormSubmit={handleAddSongFormSubmit}
          handleSongFinderFormSubmit={handleSongFinderFormSubmit}
          addArrayToSongSet={addArrayToSongSet}
        />
      }
      {
        jsonModalOpen &&
        <JsonViewModal
          songSetId={songSet.id}
          closeModal={changeJsonModalOpen}
          handleGetSongSet={handleGetSongSet}
        />
      }
      <div className="infoSection">
        <div className="titleSection">
          <h3>{cardTitle}</h3>

          {
            isSetCreator &&
            <div className="tabs">
              <Upload className="generateIcon" onClick={() => { setJsonModalOpen(true) }} />
              <Users className={tab == "users" ? "active" : ""} onClick={() => { setTab("users") }} />
              <Music className={tab == "songs" ? "active" : ""} onClick={() => { setTab("songs") }} />
            </div>
          }
        </div>
        {
          (songSet.id == 0 || isSetCreator) &&
          <CreateUpdateSongSetForm
            songSet={songSet}
            handleCreateFormSubmit={handleCreateFormSubmit}
            updateSetSongSet={updateSetSongSet}
            buttonName={buttonTitle}
          />
        }
        {
          isSetCreator ?
            <>
              <div className="songFormSection">
                <div className="sectionTitle">
                  <h3>Manage song</h3>
                  <span onClick={() => { setSongFinderModalOpen(true) }}>
                    Search on Song Finder
                  </span>
                </div>
                <AddSongForm
                  songSet={songSet}
                  handleAddSongFormSubmit={handleAddSongFormSubmit}
                  addSongToSongSetState={addSongToSongSetState}
                  song={song}
                  updateSongState={updateSongState}
                />
              </div>
            </> :
            <>
              <span className="titleSongSet">{songSet.name}</span>
            </>
        }
      </div>
      {(() => {
        switch (tab) {
          case 'users':
            return <UsersTab
              songSet={songSet}
              handleUpdateSongSet={handleUpdateSongSet}
              handleInviteUser={handleInviteUser}
              updateNewSongSet={updateNewSongSet}
            />
          case 'songs':
            return <SongsTab
              songs={songSet.songs}
              isSetCreator={isSetCreator}
              onDeleteSong={onDeleteSong}
              onSongClick={onSongClick}
            />
          default:
            return <></>
        }
      })()}
    </>
  )
}