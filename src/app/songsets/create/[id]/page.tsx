import { Input } from "@/app/components/input";
import './createSongSet.scss';
import { Button } from "@/app/components/button/Button";
import { ClientCreateSongPage } from "./clientPage";
import { getSongSet, handleCreateSongSetFormSubmit } from "@/repositories/songset.repository";
import { handleAddSongFormSubmit, handleDeleteSong } from "@/repositories/song.repository";


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