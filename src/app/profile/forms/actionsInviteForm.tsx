'use client'
import toast from "react-hot-toast";
import { Check, X } from "lucide-react"
import { useState } from "react";
import { LoadingComponent } from "@/components/loading-component";
import { handleAnswerInvite } from "@/handlers/songset.handlers";

type ActionsInviteProps = {
  invite: UserOn;
  userId: number;
  removeInvite: (invite: UserOn) => void
}

export function ActionsInvite({ invite, userId, removeInvite }: ActionsInviteProps) {
  const [isLoading, setIsLoadind] = useState<boolean>(false);

  async function onAnswerInvite(songSetId: number, accept: boolean) {
    try {
      setIsLoadind(true);
      const response = await handleAnswerInvite(
        songSetId,
        userId,
        accept
      );

      const verb = accept ? "Accepted" : "Declined";
      removeInvite(invite)

      toast.success(`Invite ${verb} successfully!`)
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setIsLoadind(false);
    }
  }

  return (
    <div className='actions'>
      {isLoading && <LoadingComponent />}
      <Check onClick={() => { onAnswerInvite(invite.songSet.id, true) }} />
      <X onClick={() => { onAnswerInvite(invite.songSet.id, false) }} className="icon" />
    </div>
  )
}