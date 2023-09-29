import './createSongSet.scss';
import { ClientCreateSongPage } from "./clientPage";
import { handleCreateSongSetFormSubmit, handleGetSongSet } from "@/handlers/songset.handlers";
import { handleAddSongFormSubmit, handleDeleteSong } from "@/handlers/song.handlers";
import { handleSongFinderFormSubmit } from '@/handlers/songfinder.handlers';

type CreateSongSetProps = {
  params: {
    id: number;
  }
}

export default async function CreateSongSet({params} : CreateSongSetProps){
  const dbSongSet = await handleGetSongSet(params.id);

  return(
    <div className="createSongSetPage">
      <ClientCreateSongPage
        dbSet={dbSongSet}
        handleCreateFormSubmit={handleCreateSongSetFormSubmit}
        handleAddSongFormSubmit={handleAddSongFormSubmit}
        handleDeleteSong={handleDeleteSong}
        handleSongFinderFormSubmit={handleSongFinderFormSubmit}
        handleGetSongSet={handleGetSongSet}
      />
    </div>
  )
}