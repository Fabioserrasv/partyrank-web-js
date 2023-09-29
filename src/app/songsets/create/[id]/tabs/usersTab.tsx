'use client'
import { Table, TableRow } from "@/app/components/table";
import { Check, Globe, X } from "lucide-react";
import { InviteUserForm } from "../forms/inviteUserForm";
import { useState } from "react";

type UsersTabProps = {
  songSet: SongSet | null;
  handleInviteUser: (songSetId: number, username: string) => Promise<Boolean>
}

export function UsersTab({ songSet, handleInviteUser }: UsersTabProps) {
  if (!songSet) return
  const [invites, setInvites] = useState<UserOn[]>(songSet.usersOn || []);

  function addInvite(invite: UserOn){
    const newInvites = [...invites, invite]
    
    setInvites(newInvites)
  }

  function removeInvite(invite: UserOn){
    const newInvites = invites.filter(inviteOld => inviteOld !== invite);
    
    setInvites(newInvites)
  }

  return (
    <div className="usersDiv">

      <InviteUserForm
        songSetId={songSet.id}
        handleInviteUser={handleInviteUser}
        addInvite={addInvite}
      />

      <Table>
        {
          invites ? invites.map((invite) => {
            return (
              <TableRow>
                <div className='info'>
                  <span>{invite.user.username}</span>
                  <div className="extraInfo">
                    {/* <span>
                      <Globe />
                      {invite.user.animeList}
                    </span> */}
                    <span>
                      <Check />
                      {invite.accepted ? 'Accepted' : 'Pending'}
                    </span>
                  </div>
                </div>
                <div className='actions'>
                  <X className="icon" />
                </div>
              </TableRow>
            )
          }) : <>No Users were Found</>
        }


      </Table>
    </div>
  )
}