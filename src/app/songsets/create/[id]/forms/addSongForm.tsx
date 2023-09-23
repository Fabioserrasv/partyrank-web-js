'use client'
import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/input"
import { Select } from "@/app/components/select";
import { addSongSchema } from "@/app/songsets/validations/songSetValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AddSongFormSchema, initialSongValue } from "../clientPage";
import toast from "react-hot-toast";

type AddSongFormProps = {
  songSet: SongSet;
  handleAddSongFormSubmit: ({ }: AddSongFormSchema, songSetId: number) => Promise<number | boolean>;
  addSongToSongSetState: (song: Song) => void;
  song: AddSongFormSchema;
  updateSongState: (song: AddSongFormSchema) => void;
}

type fields = "name" | "anime" | "artist" | "name" | "type"


export function AddSongForm({ handleAddSongFormSubmit, updateSongState, song, addSongToSongSetState, songSet }: AddSongFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<AddSongFormSchema>({
    resolver: zodResolver(addSongSchema)
  });


  function onAddSongInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key: fields = e.target.name as fields
    setValue(key, e.target.value)
    updateSongState({
      ...song,
      [key]: e.target.value
    })
  }

  async function onSubmitHandleAddSong(data: AddSongFormSchema) {
    try {
      data.id = song.id
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
        initialSongValue.type = data.type
        updateSongState(initialSongValue)
        toast.success("Song added successfully")
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  function clearSong(){
    updateSongState(initialSongValue)
  }
  
  useEffect(() => {
    setValue("anime", song.anime)
    setValue("artist", song.artist)
    setValue("name", song.name)
    setValue("link", song.link)
    setValue("type", song.type)
  }, [song])

  return (
    <form onSubmit={handleSubmit(onSubmitHandleAddSong)} className="formAddSong">
      <Input
        displayName="Anime"
        placeholder="Mawaru Penguindrum..."
        errorMessage={errors.anime?.message}
        {...register("anime")}
        defaultValue={song.anime}
        value={song.anime}
        onChange={onAddSongInputChange}
      />
      <Input
        displayName="Artist"
        placeholder="Triple H..."
        errorMessage={errors.artist?.message}
        {...register("artist")}
        defaultValue={song.artist}
        value={song.artist}
        onChange={onAddSongInputChange}
      />
      <Input
        displayName="Name"
        placeholder="DEAR FUTURE feat. Yui Horie..."
        errorMessage={errors.name?.message}
        {...register("name")}
        defaultValue={song.name}
        value={song.name}
        onChange={onAddSongInputChange}
      />
      <Input
        displayName="Embed Link"
        placeholder="https://drive.goog..."
        errorMessage={errors.link?.message}
        {...register("link")}
        defaultValue={song.link}
        value={song.link}
        onChange={onAddSongInputChange}
      />
      <Select
        displayName="Type"
        {...register("type")}
      >
        <option value="OPENING">Opening</option>
        <option value="ENDING">Ending</option>
        <option value="INSERT_SONG">Insert Song</option>
      </Select>
      <div className="buttons">
        {
          song.id !== 0 &&
          <Button
            name="Clear"
            className="clearButton"
            type="button"
            onClick={clearSong}
          />
        }
        <Button
          name="Add song"
          type="submit"
        />
      </div>
    </form>
  )
}