'use client'
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { LoadingComponent } from "@/components/loading-component";
import { createSongSetSchema } from "@/app/songsets/validations/songSetValidations";
import { handleCreateSongSetFormSubmit, handleDeleteSongSet } from "@/handlers/songset.handlers";
import { tabs } from "@/components/songset-tabs";
import { useRouter } from "next/navigation";
import ActionModal from "@/components/action-modal";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const { push, refresh } = useRouter();

  function updateSetSongSet(name: string, anilistLink: string, id: number) {
    setSongSet({
      ...songSet,
      name: name,
      anilistLink: anilistLink,
      user: user,
      id: Number(id)
    })
  }

  async function onSubmitDeleteSongSet() {
    try {
      setIsLoadind(true);
      if (await handleDeleteSongSet(songSet.id)) {
        toast.success("Song Set deleted successfully");
        refresh();
        push(`/songsets`);
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoadind(false);
    }
  }

  async function onSubmitHandleCreateSongSet(data: SongSetPostData) {
    try {
      setIsLoadind(true);
      data.id = songSet.id;
      const id = await handleCreateSongSetFormSubmit(data)

      const newOrUp = data.id == 0 ? "created" : "updated";

      if (data.id == 0) {
        setTab("songs");
      }

      if (id) {
        updateSetSongSet(songSet.name, songSet.anilistLink, Number(id));
        toast.success(`Song set ${newOrUp} successfully`)
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoadind(false);
    }
  }

  function onNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateSetSongSet(e.target.value, songSet.anilistLink, songSet.id)
  }

  function onAnilistLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateSetSongSet(songSet.name, e.target.value, songSet.id)
  }

  return (
    <form onSubmit={handleSubmit(onSubmitHandleCreateSongSet)} className="formSongSet">
      {isLoading && <LoadingComponent />}
      {
        deleteModalOpen &&
        <ActionModal
          title="Are you sure you want to delete this song set?"
          firstButton={
            {
              description: "Yes",
              color: "#4bf313",
              func: () => { onSubmitDeleteSongSet() }
            }
          }
          secondButton={
            {
              description: "No",
              color: "#f31818",
              func: () => { setDeleteModalOpen(false) }
            }
          }
          closeModal={() => { setDeleteModalOpen(false) }}
          className=""
        />
      }

      <Input
        displayName="Name"
        placeholder="All Mawaru Penguindrum songs..."
        errorMessage={errors.name?.message}
        {...register("name")}
        defaultValue={songSet.name}
        value={songSet.name}
        onChange={onNameInputChange}
      />
      <Input
        displayName="Anilist link"
        placeholder="https://anilist.co/anime/10721/Mawaru-Penguindrum/"
        errorMessage={errors.anilistLink?.message}
        {...register("anilistLink")}
        defaultValue={songSet.anilistLink}
        value={songSet.anilistLink}
        onChange={onAnilistLinkChange}
      />
      <div className="botoes">
        {
          (songSet.user?.id == user.id && songSet.id != 0) &&
          <Button
            name="Delete Song Set"
            type="button"
            className="deletebutton"
            onClick={() => { setDeleteModalOpen(true) }}
          />
        }
        <Button
          name={buttonName}
          className="submitbutton"
          type="submit"
        />
      </div>
    </form>
  )
}