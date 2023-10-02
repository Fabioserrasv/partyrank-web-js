'use client'
import { Button } from "@/components/button/Button";
import { Select } from "@/components/select";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { songSetUpdateSchema } from "@/app/songsets/validations/songSetValidations";
import { handleUpdateSongSet } from "@/handlers/songset.handlers";
import { Dispatch, SetStateAction } from "react";

type SongSetOptionsFormProps = {
  songSet: SongSet;
  setSongSet: Dispatch<SetStateAction<SongSet>>
}

const typeOptions = [{ value: "PRIVATE", display: "Private" }, { value: "PUBLIC", display: "Public" }]
const statusOptions = [
  { value: "RECRUITING", display: "Recruiting" },
  { value: "ON_GOING", display: "On Going" },
  { value: "PROCESSING", display: "Processing" },
  { value: "FINISHED", display: "Finished" },
  { value: "PAUSED", display: "Paused" }
]
const scoreSystemOptions = [
  { value: "SCORING", display: "Scoring (Sum of Scores)" },
  { value: "SCORING_AVERAGE", display: "Scoring (Average)" },
  { value: "RANKING", display: "Ranking" }
]

type fields = "type" | "status"

export function SongSetOptionsForm({setSongSet, songSet}: SongSetOptionsFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SongSetPostData>({
    resolver: zodResolver(songSetUpdateSchema)
  });

  async function onSubmitUpdate(data: SongSetPostData){
    try {
      data.name = songSet.name;
      const newSet = await handleUpdateSongSet(data, songSet.id)

      setSongSet(newSet)
      toast.success("SongSet updated successfully")
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const key: fields = e.target.name as fields

    setValue(key, e.target.value as (SongSetType | SongSetStatus ))
    setSongSet({
      ...songSet,
      [key]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitUpdate)}>
      <div className="selectOptionsSongSet">
        <Select
          displayName="Type"
          options={typeOptions}
          {...register("type")}
          value={songSet.type}
          onChange={onInputChange}
          >
        </Select>

        <Select
          displayName="Status"
          options={statusOptions}
          {...register("status")}
          value={songSet.status}
          onChange={onInputChange}
        >
        </Select>

        <Select
          displayName="Score System"
          options={scoreSystemOptions}
          {...register("scoreSystem")}
          value={songSet.scoreSystem}
          onChange={onInputChange}
        >
        </Select>

        <Button
          name="Submit"
        />
      </div>
    </form>
  )
}