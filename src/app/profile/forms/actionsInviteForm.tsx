'use client'
import toast from "react-hot-toast";
import { Check, X } from "lucide-react"

type ActionsInviteProps = {
  invite: UserOn;
  userId: number;
  handleAnswerInvite: (songSetId: number, userId: number, accept: boolean) => Promise<Boolean>
  removeInvite: (invite: UserOn) => void
}

export function ActionsInvite({ invite, handleAnswerInvite, userId, removeInvite }: ActionsInviteProps) {

  async function onAnswerInvite(songSetId: number, accept: boolean) {
    try {
      const response = await handleAnswerInvite(
        songSetId,
        userId,
        accept
      );

      const verb = accept ? "Accepted" : "Declined";
      removeInvite(invite)

      toast.success(`Invite ${verb} successfully!`)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!")
    }
  }

  return (
    <div className='actions'>
      <Check onClick={() => { onAnswerInvite(invite.songSet.id, true) }} />
      <X onClick={() => { onAnswerInvite(invite.songSet.id, false) }} className="icon" />
    </div>
  )
}