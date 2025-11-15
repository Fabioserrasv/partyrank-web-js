'use client'
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input"
import { Select } from "@/components/select";
import { addSongSchema } from "@/app/songsets/validations/songSetValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AddSongFormSchema, initialSongValue } from "../clientPage";
import toast from "react-hot-toast";
import { LoadingComponent } from "@/components/loading-component";
import { handleAddSongFormSubmit } from "@/handlers/song.handlers";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

type AddSongFormProps = {
  songSet: SongSet;
  addSongToSongSetState: (song: Song) => void;
  song: AddSongFormSchema;
  user: User;
  updateSongState: Dispatch<SetStateAction<AddSongFormSchema>>;
  isSetCreator: boolean;
}

type fields = "name" | "anime" | "artist" | "name" | "type"

export function AddSongForm({ updateSongState, song, addSongToSongSetState, songSet, isSetCreator, user }: AddSongFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<AddSongFormSchema>({
    resolver: zodResolver(addSongSchema)
  });
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const [usersOn, setUsersOn] = useState<UserOn[]>([]);

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
      setIsLoadind(true);
      data.id = song.id

      if (data.pickedById) {
        data.pickedBy = songSet.usersOn?.find(user => user.user.id === Number(data.pickedById))?.user
      }

      const id = await handleAddSongFormSubmit(data, songSet.id)
      if (id) {
        addSongToSongSetState({
          id: Number(id),
          anime: data.anime,
          artist: data.artist,
          link: data.link,
          name: data.name,
          imageUrl: data.imageUrl,
          type: data.type,
          pickedBy: data.pickedBy,
          scores: [],
          songSet: songSet
        })
        initialSongValue.type = data.type
        updateSongState(initialSongValue)
        toast.success("Song added successfully")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoadind(false);
    }
  }

  function clearSong() {
    updateSongState(initialSongValue)
  }

  useEffect(() => {
    setValue("anime", song.anime)
    setValue("artist", song.artist)
    setValue("name", song.name)
    setValue("link", song.link)
    setValue("type", song.type)
    setValue("imageUrl", song.imageUrl)

    if (songSet.pickSystem == 'PICKED_BY_PARTICIPANTS') {
      if (!isSetCreator) {
        setUsersOn(songSet.usersOn?.filter(userOn => userOn.user.id == user.id) || [])
      } else {
        const uOn = songSet.usersOn;
        uOn?.push({
          songSet: songSet,
          user: songSet.user!,
          accepted: true,
          imageUrl: songSet.user!.imageUrl
        })
        setUsersOn(uOn || [])
      }
    }
  }, [song, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmitHandleAddSong)} className="formAddSong">
      {isLoading && <LoadingComponent />}
      <Input
        required={true}
        displayName="Anime"
        placeholder="Mawaru Penguindrum..."
        errorMessage={errors.anime?.message}
        {...register("anime")}
        defaultValue={song.anime}
        value={song.anime}
        onChange={onAddSongInputChange}
      />
      <Input
        required={true}
        displayName="Artist"
        placeholder="Triple H..."
        errorMessage={errors.artist?.message}
        {...register("artist")}
        defaultValue={song.artist}
        value={song.artist}
        onChange={onAddSongInputChange}
      />
      <Input
        required={true}
        displayName="Name"
        placeholder="DEAR FUTURE feat. Yui Horie..."
        errorMessage={errors.name?.message}
        {...register("name")}
        defaultValue={song.name}
        value={song.name}
        onChange={onAddSongInputChange}
      />
      <Row>
        <Col md={6}>
          <Input
            required={true}
            displayName="Embed Link"
            placeholder="https://drive.goog..."
            errorMessage={errors.link?.message}
            {...register("link")}
            defaultValue={song.link}
            value={song.link}
            onChange={onAddSongInputChange}
          /></Col>
        <Col md={6}>
          <Input
            required={false}
            displayName="Image URL"
            placeholder="https://example.com/image.jpg"
            errorMessage={errors.imageUrl?.message}
            {...register("imageUrl")}
            defaultValue={song.imageUrl}
            value={song.imageUrl}
            onChange={onAddSongInputChange}
          /></Col>
      </Row>
      <Row className="d-flex row-type-user">
        <Select
          required={true}
          displayName="Type"
          {...register("type")}
        >
          <option value="OPENING">Opening</option>
          <option value="ENDING">Ending</option>
          <option value="INSERT_SONG">Insert Song</option>
        </Select>
        {songSet.pickSystem === "PICKED_BY_PARTICIPANTS" && (
          <Select
            required={true}
            displayName="Picked By"
            errorMessage={errors.pickedById?.message}
            options={usersOn.map(user => ({ value: (user.user.id), display: user.user.username })) || []}
            {...register("pickedById")}
            defaultValue={song.pickedById}
            value={song.pickedById}
          ></Select>
        )}
      </Row>
      <div className="buttons">
        {
          song.id !== 0 &&
          <Button
            name="Clear"
            className="clearButton mt-4"
            type="button"
            onClick={clearSong}
          />
        }
        <Button
          className="mt-4"
          name={song.id == 0 ? "Add" : "Update"}
          type="submit"
        />
      </div>
    </form>
  )
}