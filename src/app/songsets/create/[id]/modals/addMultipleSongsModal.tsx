'use client'
import { Button } from "@/components/button/Button";
import Modal from "@/components/modal";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { AddSongFormSchema } from "../clientPage";
import { convertType } from "@/repositories/songfinder.repository";
import { LoadingComponent } from "@/components/loading-component";
import SongFinderComponent from "@/components/songfinder";
import { handleAddMultipleSongsFormSubmit, handleAddSongFormSubmit } from "@/handlers/song.handlers";
import { Input } from "@/components/input";
import { Textarea } from "@/components/textarea";

type AddMultipleSongsModalProps = {
  songSet: SongSet;
  addMultipleSongsToSongSetState: (songs: Song[]) => void;
  changeAddMultipleSongsModalOpen: Dispatch<SetStateAction<boolean>>
  setSongSet: Dispatch<SetStateAction<SongSet>>;
  services: SongService[];
}

export function AddMultipleSongsModal({ changeAddMultipleSongsModalOpen, addMultipleSongsToSongSetState, songSet, setSongSet, services }: AddMultipleSongsModalProps) {
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const [songsFind, setSongsFind] = useState<SongWeb[]>([]);
  const [songs, setSongs] = useState<string>('');

  const exampleJson = `[{
    "anime": "Anime 1",
    "artist": "Artist 2",
    "name": "Song 1",
    "link": "https://drive.google.com/file/d/1234567890/view?usp=sharing",
    "type": "ENDING"
  },{
    "anime": "Anime 2",
    "artist": "Artist 2",
    "name": "Song 2",
    "link": "https://drive.google.com/file/d/1234567890/view?usp=sharing",
    "type": "ENDING"
  }]`

  async function submitFormAddMultipleSongs() {
    try {
      setIsLoadind(true);
      const songsData = JSON.parse(songs) as AddSongFormSchema[];


      const newSongs = await handleAddMultipleSongsFormSubmit(songsData, songSet.id)
      console.log(newSongs);
      if(newSongs){
        toast.success("Songs added successfully")

        const newSongsNotInSongSet = newSongs.filter(song => !songSet.songs!.some(s => s.id === song.id))
        console.log('--------------');
        console.log(newSongsNotInSongSet);
        console.log('--------------');
        addMultipleSongsToSongSetState(newSongsNotInSongSet)

        changeAddMultipleSongsModalOpen(false)
      }else{
        toast.error("Something went wrong");
      }
    }catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    } finally {
      setIsLoadind(false)
    }
  }

  return (
    <Modal
      title="Add Multiple Songs"
      className="lg songFinderModal"
      closeModal={changeAddMultipleSongsModalOpen}
    >
      <div className="examples">
        <h4>Example:</h4>
        <span>{exampleJson}</span>
      </div>

      <div>
        <Textarea
          displayName="Songs"
          name="songs"
          content={songs}
          onChange={(e) => { setSongs(e.target.value) }}
          className="textSongs"
        />
      </div>
        
      <Button
        name="Add Songs"
        onClick={() => { submitFormAddMultipleSongs() }}
      />


      {isLoading && <LoadingComponent />}
    </Modal >
  );
}