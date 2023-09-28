import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/input";
import { Select } from "@/app/components/select";
import { songFinderSchema } from "@/app/songsets/validations/songSetValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type SongFinderModalFormProps = {
  handleSongFinderFormSubmit: (data: SongFinderAction) => Promise<SongWeb[]>;
  populateTableSongsWeb: (songs: SongWeb[]) => void;
}

export function SongFinderModalForm({ handleSongFinderFormSubmit, populateTableSongsWeb }: SongFinderModalFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SongFinderAction>({
    resolver: zodResolver(songFinderSchema)
  });

  async function onSubmitSongFinderForm(data: SongFinderAction){
    try {
      const songs = await handleSongFinderFormSubmit(data);

      populateTableSongsWeb(songs);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitSongFinderForm)} className="formSongFinder">
      <div className="inputsSongFinder">
        <Input
          displayName="Anime"
          placeholder="FLCL..."
          {...register('query')}
          errorMessage={errors.query?.message}
          />
        <Input
          displayName="Song"
          placeholder="Ride on shooting star..."
          {...register('songName')}
          errorMessage={errors.songName?.message}
          />
        <Input
          displayName="Artist"
          placeholder="the pillows..."
          {...register('artistName')}
          errorMessage={errors.artistName?.message}
          />
        <Select
          displayName="Service"
          {...register('serviceName')}
          errorMessage={errors.serviceName?.message}
        >
          <option value="anisongdb">Anisong DB</option>
          <option value="animethemes">Animethemes</option>
        </Select>
        <Button type="submit">
          <Search className="iconSearch" />
        </Button>
      </div>
    </form>
  );
}