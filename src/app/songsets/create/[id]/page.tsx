import './createSongSet.scss';
import { ClientCreateSongPage } from "./clientPage";
import { handleAnswerInvite, handleCreateSongSetFormSubmit, handleGetSongSet, handleInviteUser, handleUpdateSongSet } from "@/handlers/songset.handlers";
import { handleAddSongFormSubmit, handleDeleteSong } from "@/handlers/song.handlers";
import { handleSongFinderFormSubmit } from '@/handlers/songfinder.handlers';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

type CreateSongSetProps = {
  params: {
    id: number;
  }
}

export default async function CreateSongSet({ params }: CreateSongSetProps) {
  const dbSongSet = await handleGetSongSet(params.id);
  const session = await getServerSession(options)
  const user = session?.user!
  
  return (
    <div className="createSongSetPage">
        <ClientCreateSongPage
          dbSet={dbSongSet}
          user={user}
          handleCreateFormSubmit={handleCreateSongSetFormSubmit}
          handleAddSongFormSubmit={handleAddSongFormSubmit}
          handleDeleteSong={handleDeleteSong}
          handleSongFinderFormSubmit={handleSongFinderFormSubmit}
          handleGetSongSet={handleGetSongSet}
          handleInviteUser={handleInviteUser}
          handleUpdateSongSet={handleUpdateSongSet}
          handleAnswerInvite={handleAnswerInvite}
        />
    </div>
  )
}