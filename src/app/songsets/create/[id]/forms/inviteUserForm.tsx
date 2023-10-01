'use client'
import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/input";
import { LoadingComponent } from "@/app/components/loading-component";
import { inviteUserSchema } from "@/app/songsets/validations/songSetValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type InviteUserSchema = {
  username: string;
}

type InviteUserFormProps = {
  songSetId: number;
  handleInviteUser: (songSetId: number, username: string) => Promise<Boolean>
  addInvite: (invite: UserOn) => void
}

export function InviteUserForm({ songSetId, handleInviteUser, addInvite }: InviteUserFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<InviteUserSchema>({
    resolver: zodResolver(inviteUserSchema)
  });
  const [isLoading, setIsLoadind] = useState<boolean>(false);

  async function onSubmitInvite(data: InviteUserSchema) {
    try {
      setIsLoadind(true);
      const response = await handleInviteUser(songSetId, data.username)

      if (response) {
        toast.success("User invited successfully!")
        addInvite({
          accepted: false,
          songSet: {
            id: songSetId,
            name: ""
          },
          user: {
            id: 0,
            animeList: "",
            username: data.username
          }
        })
        return;
      }

      toast.error("User is not accepting invitation or does not exist.")
    } catch (error) {
      toast.error("User is not accepting invitation or does not exist.")
    } finally {
      setIsLoadind(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitInvite)}>
      {isLoading && <LoadingComponent />}
      <div className="inviteDiv">
        <Input
          displayName="User"
          placeholder="Invite user..."
          {...register('username')}
          errorMessage={errors.username?.message}
        />
        <Button
          name="Invite"
        />
      </div>
    </form>
  )
}