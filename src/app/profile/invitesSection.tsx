'use client'
import { User } from "lucide-react"
import { Table, TableRow } from "@/components/table"
import { ActionsInvite } from "./forms/actionsInviteForm"
import { useState } from "react"

type InvitesSectionProps = {
  dbUser: User;
}

export function InvitesSection({ dbUser }: InvitesSectionProps) {
  const [invites, setInvites] = useState<UserOn[]>(dbUser.invites?.filter(invite => !invite.accepted) ?? []);

  function removeInvite(invite: UserOn){
    const newInvites = invites.filter(inviteOld => inviteOld !== invite);
    
    setInvites(newInvites)
  }
  
  return (
    <div className="songSetsInviteDiv">
      <h2>Invites</h2>
      <Table>
        {
          (invites.length > 0) &&
          invites.map((invite) => {
            return (
              <TableRow key={invite.songSet.id}>
                <div className='info'>
                  <span>{invite.songSet.name}</span>
                  <div className="extraInfo">
                    <span>
                      <User />
                      {invite.songSet.user?.username}
                    </span>
                  </div>
                </div>
                <ActionsInvite
                  invite={invite}
                  userId={dbUser.id}
                  removeInvite={removeInvite}
                />
              </TableRow>
            )
          })
        }
      </Table>
    </div>
  )
}