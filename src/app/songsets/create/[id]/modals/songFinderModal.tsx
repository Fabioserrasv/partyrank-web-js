'use client'
import { Button } from "@/components/button/Button";
import Modal from "@/components/modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddSongFormSchema } from "../clientPage";
import { convertType } from "@/repositories/songfinder.repository";
import { LoadingComponent } from "@/components/loading-component";
import SongFinderComponent from "@/components/songfinder";

type SongFinderModalProps = {
  songSet: SongSet;
  addSongToSongSetState: (song: Song) => void;
  changeSongFinderModalOpen: (isModalOpen: boolean) => void
  addArrayToSongSet: (songs: Song[]) => void
}

export function SongFinderModal({ changeSongFinderModalOpen, addSongToSongSetState, songSet, addArrayToSongSet }: SongFinderModalProps) {
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const [songsFind, setSongsFind] = useState<SongWeb[]>([]);

  function populateTableSongsWeb(songs: SongWeb[]) {
    setSongsFind(songs);
  }

  async function onSubmitHandleAddSong(data: AddSongFormSchema) {
    try {
      setIsLoadind(true);
      const id = await handleAddSongFormSubmit(data, songSet.id)
      if (id) {
        addSongToSongSetState({
          id: Number(id),
          anime: data.anime,
          artist: data.artist,
          link: data.link,
          name: data.name,
          type: data.type,
          scores: [],
          songSet: songSet
        })
        toast.success("Song added successfully")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoadind(false)
    }
  }

  function addSongFromSongFinder(song: SongWeb) {
    onSubmitHandleAddSong({
      id: 0,
      anime: song.anime,
      artist: song.artist,
      link: song.video?.link || '',
      name: song.title,
      type: 'ENDING'
    })
  }

  async function addAllSongsFindToSongSet() {
    let songsToAddToState: Song[] = [];
    try {
      setIsLoadind(true);

      for (let i = 0; i < songsFind.length; i++) {
        const id = await handleAddSongFormSubmit({
          id: 0,
          anime: songsFind[i].anime,
          artist: songsFind[i].artist,
          link: songsFind[i].video?.link || '',
          name: songsFind[i].title,
          type: 'ENDING'
        }, songSet.id)

        if (id) {
          songsToAddToState.push({
            id: Number(id),
            anime: songsFind[i].anime,
            artist: songsFind[i].artist,
            link: songsFind[i].video?.link || '',
            name: songsFind[i].title,
            type: convertType(songsFind[i].type),
            scores: [],
            songSet: songSet
          })
        }
      }

      addArrayToSongSet(songsToAddToState)
      toast.success("Songs added successfully")
      changeSongFinderModalOpen(false)
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoadind(false)
    }

  }

  return (
    <Modal
      title="Song Finder"
      className="lg songFinderModal"
      closeModal={changeSongFinderModalOpen}
    >
      <SongFinderComponent
        songsFind={songsFind}
        populateTableSongsWeb={populateTableSongsWeb}
        actions={true}
        addSongFromSongFinder={addSongFromSongFinder}
      />

      {
        songsFind.length > 0 &&
        <Button
          name="Add all songs"
          onClick={addAllSongsFindToSongSet}
        />
      }
      {isLoading && <LoadingComponent />}
    </Modal >
  );
}