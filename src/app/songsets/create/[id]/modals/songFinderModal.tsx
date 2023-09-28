'use client'
import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/input";
import Modal from "@/app/components/modal";
import { Select } from "@/app/components/select";
import { Table, TableRow } from "@/app/components/table";
import { Globe, Mic2, Monitor, Plus, Search, X } from "lucide-react";
import { SongFinderModalForm } from "../forms/songFinderModalForm";
import { useState } from "react";
import toast from "react-hot-toast";
import { AddSongFormSchema } from "../clientPage";

type SongFinderModalProps = {
  songSet: SongSet;
  addSongToSongSetState: (song: Song) => void;
  changeSongFinderModalOpen: (isModalOpen: boolean) => void
  handleSongFinderFormSubmit: (data: SongFinderAction) => Promise<SongWeb[]>;
  handleAddSongFormSubmit: ({ }: AddSongFormSchema, songSetId: number) => Promise<number | boolean>;

}

export function SongFinderModal({ changeSongFinderModalOpen, handleSongFinderFormSubmit, addSongToSongSetState,  handleAddSongFormSubmit, songSet }: SongFinderModalProps) {
  const [songsFind, setSongsFind] = useState<SongWeb[]>([]);

  function populateTableSongsWeb(songs: SongWeb[]) {
    setSongsFind(songs);
  }

  async function onSubmitHandleAddSong(data: AddSongFormSchema) {
    try {
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
    }
  }

  return (
    <Modal
      title="Song Finder"
      className="lg songFinderModal"
      closeModal={changeSongFinderModalOpen}
    >
      <SongFinderModalForm
        populateTableSongsWeb={populateTableSongsWeb}
        handleSongFinderFormSubmit={handleSongFinderFormSubmit}
      />
      <div className="resultSongFinder">
        <Table>
          {
            songsFind.map((song) => {
              return (
                <TableRow>
                  <div className='info'>
                    <span>{`${song.artist} - ${song.title}`}</span>
                    <div className="extraInfo">
                      <span>
                        <Monitor />
                        {song.anime}
                      </span>
                      <span>
                        <Mic2 />
                        {song.type}
                      </span>
                      <span>
                        <Globe />
                        {song.video?.link}
                      </span>
                    </div>
                  </div>
                  <div className='actions'>
                    <Plus className="icon" onClick={() => {onSubmitHandleAddSong({
                      id: 0,
                      anime: song.anime,
                      artist: song.artist,
                      link: song.video?.link || '',
                      name: song.title,
                      type: 'ENDING'
                    })}} />
                    <X className="icon" />
                  </div>
                </TableRow>
              )
            })
          }
        </Table>
      </div>
    </Modal >
  );
}