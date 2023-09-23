'use client'
import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSongSetSchema } from "../../../validations/songSetValidations";
import { CreateForm } from "../clientPage";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type createUpdateSongSetFormProps = {
  songSet: SongSet;
  updateSetSongSet: (name:string, id: number) => void;
  handleCreateFormSubmit: ({ }: CreateForm) => Promise<number | boolean>;
  buttonName: string;
}

export function CreateUpdateSongSetForm({ songSet, handleCreateFormSubmit, updateSetSongSet, buttonName }: createUpdateSongSetFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CreateForm>({
    resolver: zodResolver(createSongSetSchema)
  });

  async function onSubmitHandleCreateSongSet(data: CreateForm) {
    try {
      const id = await handleCreateFormSubmit(data)
      if (id) {
        updateSetSongSet(songSet.name, Number(id))
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  function onNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateSetSongSet(e.target.value, songSet.id)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmitHandleCreateSongSet)}>
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