'use client'
import { Check, X } from "lucide-react";
import { InviteUserForm } from "../forms/inviteUserForm";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SongSetOptionsForm } from "../forms/songSetOptionsForm";
import toast from "react-hot-toast";
import { handleAnswerInvite } from "@/handlers/songset.handlers";
import Table from 'react-bootstrap/Table';
import { useTheme } from '@/context/ThemeContext';
import ConfirmDeleteModal from '@/components/confirm-delete-modal';

type UsersTabProps = {
  songSet: SongSet | null;
  setSongSet: Dispatch<SetStateAction<SongSet>>
}

export function UsersTab({ songSet, setSongSet }: UsersTabProps) {
  const { isDarkMode } = useTheme();
  const [invites, setInvites] = useState<UserOn[]>(songSet && songSet.usersOn ? [...songSet.usersOn, {songSet: songSet, user: songSet.user!, accepted: true, imageUrl: (songSet.user ? songSet.user.imageUrl : undefined)}] : []);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [userIdToRemove, setUserIdToRemove] = useState<number | null>(null);
  
  if (!songSet) return

  function addInvite(invite: UserOn) {
    const newInvites = [...invites, invite]

    setInvites(newInvites)
  }

  function removeInvite(userId: number) {
    const newInvites = invites.filter(inviteOld => inviteOld.user.id !== userId);

    setInvites(newInvites)
  }

  function openDeleteModal(userId: number) {
    setUserIdToRemove(userId);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
    setUserIdToRemove(null);
  }

  async function onRemoveInvite(userId: number) {
    try {
      const response = await handleAnswerInvite(songSet?.id!, userId, false);
      if (response) {
        removeInvite(userId)
        toast.success("User removed successfully")
      }
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }

  async function handleConfirmDelete() {
    if (userIdToRemove !== null) {
      await onRemoveInvite(userIdToRemove);
      closeDeleteModal();
    }
  }

  function countScores(userId: number) {
    let scores = 0

    if (!songSet) return 0

    if (!songSet.songs) return 0

    if(songSet.songs == undefined) return 0

    songSet.songs.forEach(song => {
      if(song.scores == undefined || song.scores.length == 0) return;
      song.scores.forEach(score => {
        if (score.user?.id == userId) {
          scores++
        }
      })
    })

    return scores
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


      <div className="users-table-container w-100 h-100 mt-3">

        <Table className="w-100" striped variant={isDarkMode ? 'dark' : 'light'}>
          <tbody>
            {
              invites && invites.length > 0 ? invites.map((invite) => {
                return (
                  <tr key={invite.user.id} >
                    <td>
                      <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex flex-column'>
                          <span>{invite.user.username}</span>
                          <div className="d-flex gap-3 mt-1">
                            <span className='d-flex align-items-center gap-1'>
                              id: {invite.user.id}
                            </span>
                            <span className='d-flex align-items-center gap-1'>
                              <Check size={16} />
                              {invite.accepted ? 'Accepted' : 'Pending'}
                            </span>
                            <span className='d-flex align-items-center gap-1'>
                              <Check size={16} />
                              {countScores(invite.user.id)} scores
                            </span>
                          </div>
                        </div>
                        <X className="icon pointer" onClick={() => { openDeleteModal(invite.user.id) }} />
                      </div>
                    </td>
                  </tr>
                )
              }) : (
                <tr>
                  <td>No Users were Found</td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>

      {isDeleteModalOpen && userIdToRemove !== null && (
        <ConfirmDeleteModal
          title="Remove invite"
          message={`Are you sure you want to remove the user ${invites.find(inv => inv.user.id === userIdToRemove)?.user.username}?`}
          onConfirm={handleConfirmDelete}
          onCancel={closeDeleteModal}
        />
      )}
    </div>
  )
}