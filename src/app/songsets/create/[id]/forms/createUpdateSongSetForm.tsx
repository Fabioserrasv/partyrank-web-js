'use client'
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { LoadingComponent } from "@/components/loading-component";
import { createSongSetSchema } from "@/app/songsets/validations/songSetValidations";
import { handleCreateSongSetFormSubmit } from "@/handlers/songset.handlers";
import { tabs } from "@/components/songset-tabs";

type createUpdateSongSetFormProps = {
  songSet: SongSet;
  user: User;
  setSongSet: Dispatch<SetStateAction<SongSet>>;
  setTab: Dispatch<SetStateAction<tabs>>;
  buttonName: string;
}

export function CreateUpdateSongSetForm({ songSet, user, setTab, setSongSet, buttonName }: createUpdateSongSetFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SongSetPostData>({
    resolver: zodResolver(createSongSetSchema)
  });
  const [isLoading, setIsLoadind] = useState<boolean>(false);

  function updateSetSongSet(name: string, id: number) {
    setSongSet({
      ...songSet,
      name: name,
      user: user,
      id: Number(id)
    })
  }

  async function onSubmitHandleCreateSongSet(data: SongSetPostData) {
    try {
      setIsLoadind(true);
      data.id = songSet.id;
      const id = await handleCreateSongSetFormSubmit(data)

      const newOrUp = data.id == 0 ? "created" : "updated";
      
      if(data.id == 0){
        setTab("songs");
      }

      if (id) {
        updateSetSongSet(songSet.name, Number(id))
        toast.success(`Song set ${newOrUp} successfully`)
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoadind(false);
    }
  }

  function onNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateSetSongSet(e.target.value, songSet.id)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandleCreateSongSet)} className="formSongSet">
      {isLoading && <LoadingComponent />}
      <Input
        displayName="Name"
        placeholder="All Mawaru Penguindrum songs..."
        errorMessage={errors.name?.message}
        {...register("name")}
        defaultValue={songSet.name}
        value={songSet.name}
        onChange={onNameInputChange}
      />
      <Button
        name={buttonName}
        type="submit"
      />
    </form>
  )
}