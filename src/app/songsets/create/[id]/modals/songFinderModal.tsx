'use client'
import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/input";
import Modal from "@/app/components/modal";
import { Select } from "@/app/components/select";
import { Table, TableRow } from "@/app/components/table";
import { Globe, Mic2, Monitor, Plus, Search, X } from "lucide-react";
import { SongFinderModalForm } from "../forms/songFinderModalForm";
import { useState } from "react";

type SongFinderModalProps = {
  changeSongFinderModalOpen: (isModalOpen: boolean) => void
  handleSongFinderFormSubmit: (data: SongFinderAction) => Promise<SongWeb[]>;
}

export function SongFinderModal({ changeSongFinderModalOpen, handleSongFinderFormSubmit }: SongFinderModalProps) {
  const [songsFind, setSongsFind] = useState<SongWeb[]>([]);

  function populateTableSongsWeb(songs: SongWeb[]) {
    setSongsFind(songs);
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
                    <Plus className="icon" />
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