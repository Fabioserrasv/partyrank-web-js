'use client'
import { Table, TableRow } from "@/components/table";
import { Check, Globe, X } from "lucide-react";
import { InviteUserForm } from "../forms/inviteUserForm";
import { Dispatch, SetStateAction, useState } from "react";
import { SongSetOptionsForm } from "../forms/songSetOptionsForm";
import toast from "react-hot-toast";
import { handleAnswerInvite } from "@/handlers/songset.handlers";

type UsersTabProps = {
  songSet: SongSet | null;
  setSongSet: Dispatch<SetStateAction<SongSet>>
}

export function UsersTab({ songSet, setSongSet }: UsersTabProps) {
  if (!songSet) return
  const [invites, setInvites] = useState<UserOn[]>(songSet.usersOn || []);

  function addInvite(invite: UserOn) {
    const newInvites = [...invites, invite]

    setInvites(newInvites)
  }

  function removeInvite(userId: number) {
    const newInvites = invites.filter(inviteOld => inviteOld.user.id !== userId);

    setInvites(newInvites)
  }

  async function onRemoveInvite(userId: number) {
    try {
      const response = await handleAnswerInvite(songSet?.id!, userId, false);
      if(response){
        removeInvite(userId)
        toast.success("User removed successfully")
      }
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }


  return (
    <div className="usersDiv">

      <div className="songsetoptionsforms">
        <InviteUserForm
          songSetId={songSet.id}
          addInvite={addInvite}
        />

        <SongSetOptionsForm
          songSet={songSet}
          setSongSet={setSongSet}
        />

      </div>

      <Table>
        {
          invites ? invites.map((invite) => {
            return (
              <TableRow>
                <div className='info'>
                  <span>{invite.user.username}</span>
                  <div className="extraInfo">
                    <span>
                      <Check />
                      {invite.accepted ? 'Accepted' : 'Pending'}
                    </span>
                  </div>
                </div>
                <div className='actions'>
                  <X className="icon" onClick={() => { onRemoveInvite(invite.user.id) }} />
                </div>
              </TableRow>
            )
          }) : <>No Users were Found</>
        }


      </Table>
    </div>
  )
}