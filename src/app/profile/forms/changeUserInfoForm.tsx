'use client'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeUserInfoSchema } from "./validations/profileValidations";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ChangeAnimeListFormProps = {
  user: User;
  handleUpdateUserInfoForm: (data: ChangeUserInfoFormSchema, id: number) => Promise<boolean>
}

export type ChangeUserInfoFormSchema = {
  username: string;
  animelist: string;
}

type fields = "username" | "animelist"

export function ChangeUserInfoForm({ handleUpdateUserInfoForm, user }: ChangeAnimeListFormProps) {
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ChangeUserInfoFormSchema>({
    resolver: zodResolver(changeUserInfoSchema)
  });
  const [userInput, setUserInput] = useState<ChangeUserInfoFormSchema>({username: user.username, animelist: user.animeList})
  
  const { data: session, update } = useSession();

  const route = useRouter();

  if (!session) return;
  
  async function onSubmitFormUserInfo(data: ChangeUserInfoFormSchema) {
    try {

      const response = await handleUpdateUserInfoForm({
        animelist: data.animelist,
        username: data.username
      }, user.id)
      
      if (response) {
        await update({
          ...session,
          user: {
            ...session?.user,
            animeList: data.animelist,
            username: data.username
          }
        })
        toast.success("User info updated successfully")
        route.refresh()
      }

    } catch (error) {
      console.log(error)
      toast.error("Username already in use")
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key: fields = e.target.name as fields
    setValue(key, e.target.value)
    setUserInput({
      ...userInput,
      [key]: e.target.value
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmitFormUserInfo)} className="formAnimeList">
      <div className="inputs">
        <Input
          displayName="Username"
          placeholder="xxSuperNarutoxx"
          {...register("username")}
          value={userInput.username}
          onChange={onInputChange}
        />
        <Input
          displayName="Anime List Link"
          placeholder="https://myanimelist.net/profile/elonmusk"
          {...register("animelist")}
          value={userInput.animelist}
          onChange={onInputChange}
        />
      </div>
      <Button
        name="Update"
        className="updateAnimeListButton"
      />
    </form>
  )
}