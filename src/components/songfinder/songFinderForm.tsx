'use client'
import { Button } from "@/components/button/Button";
import Input  from "@/components/input";
import Select from "@/components/select";
import { songFinderSchema } from "@/app/songsets/validations/songSetValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { LoadingComponent } from "@/components/loading-component";
import { handleSongFinderFormSubmit } from "@/handlers/songfinder.handlers";
import './songfindercomponent.scss';

type SongFinderFormProps = {
  populateTableSongsWeb?: (songs: SongWeb[]) => void;
}

export function SongFinderForm({ populateTableSongsWeb }: SongFinderFormProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<SongFinderAction>({
    resolver: zodResolver(songFinderSchema)
  });
  const [isLoading, setIsLoadind] = useState<boolean>(false);

  async function onSubmitSongFinderForm(data: SongFinderAction) {
    try {
      setIsLoadind(true);
      const songs = await handleSongFinderFormSubmit(data);

      if( populateTableSongsWeb){
        populateTableSongsWeb(songs);
      }
      
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setIsLoadind(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitSongFinderForm)} className="formSongFinder">
      {isLoading && <LoadingComponent />}
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