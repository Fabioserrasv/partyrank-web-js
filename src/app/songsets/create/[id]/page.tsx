import './createSongSet.scss';
import { ClientCreateSongPage } from "./clientPage";
import { handleCreateSongSetFormSubmit } from "@/handlers/songset.handlers";
import { handleAddSongFormSubmit, handleDeleteSong } from "@/handlers/song.handlers";
import { getSongSet } from "@/actions/songset.actions";

type CreateSongSetProps = {
  params: {
    id: number;
  }
}

export default async function CreateSongSet({params} : CreateSongSetProps){
  const dbSongSet = await getSongSet(params.id);

  return(
    <div className="createSongSetPage">
      <ClientCreateSongPage
        dbSet={dbSongSet}
        handleCreateFormSubmit={handleCreateSongSetFormSubmit}
        handleAddSongFormSubmit={handleAddSongFormSubmit}
        handleDeleteSong={handleDeleteSong}
      />
    </div>
  )
}