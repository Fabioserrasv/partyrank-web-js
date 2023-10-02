'use client'
import { useEffect, useState } from "react";
import { CreateUpdateSongSetForm } from "./forms/createUpdateSongSetForm";
import { AddSongForm } from "./forms/addSongForm";
import { Music, Upload, Users } from "lucide-react";
import toast from "react-hot-toast";
import { SongFinderModal } from "./modals/songFinderModal";
import { JsonViewModal } from "./modals/jsonViewModal";
import { UsersTab } from "./tabs/usersTab";
import { SongsTab } from "./tabs/songsTab";
import { handleDeleteSong } from "@/handlers/song.handlers";
import { SongSetTabs } from "@/components/songset-tabs";

type ClientCreateSongPageProps = {
  dbSet: SongSet | null;
  user: User;
}

export type AddSongFormSchema = {
  id: number;
  anime: string;
  artist: string;
  name: string;
  link: string;
  type: SongType;
}

type tabs = "users" | "songs"

const initialValue = {
  id: 0,
  name: '',
  type: 'PRIVATE' as SongSetType,
  status: 'ON_GOING' as SongSetStatus,
  scoreSystem: 'SCORING_AVERAGE' as SongSetScoreSystemType,
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

export function ClientCreateSongPage({ dbSet, user }: ClientCreateSongPageProps) {
  const [songSet, setSongSet] = useState<SongSet>(initialValue)
  const [song, setSong] = useState<AddSongFormSchema>(initialSongValue)
  const [songFinderModalOpen, setSongFinderModalOpen] = useState<boolean>(false);
  const [jsonModalOpen, setJsonModalOpen] = useState<boolean>(false);
  const [tab, setTab] = useState<tabs>("songs");
  const [isSetCreator, setIsSetCreator] = useState<boolean>(false);

  const cardTitle = dbSet == null ? "Create new Song set" : "Edit song set"
  const buttonTitle = dbSet == null ? "Create" : "Update";

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
      setSongSet(dbSetAsSongSet)
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
          changeSongFinderModalOpen={setSongFinderModalOpen}
          setSongSet={setSongSet}
        />
      }
      {
        jsonModalOpen &&
        <JsonViewModal
          songSetId={songSet.id}
          closeModal={setJsonModalOpen}
        />
      }
      <div className="infoSection">
        <div className="titleSection">
          <h3>{cardTitle}</h3>

          {
            isSetCreator &&
            <SongSetTabs setJsonModalOpen={setJsonModalOpen} tab={tab} setTab={setTab} />
          }
        </div>
        {
          (songSet.id == 0 || isSetCreator) &&
          <CreateUpdateSongSetForm
            songSet={songSet}
            setSongSet={setSongSet}
            user={user}
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
                  addSongToSongSetState={addSongToSongSetState}
                  song={song}
                  updateSongState={setSong}
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
              setSongSet={setSongSet}
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