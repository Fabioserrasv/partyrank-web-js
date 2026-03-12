'use client'
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { scoreVoteSchema } from "@/app/songsets/validations/songSetValidations";
import { withMask } from 'use-mask-input';
import { useEffect } from "react";
import { z } from "zod";

export type FormVote = {
  id?: number | string;
  score: number;
  timeStamp: number;
}

export type ScoreVoteForm = z.infer<typeof scoreVoteSchema>;

type ScoreVoteFields = {
  score: string;
  timeStamp: string;
};

type VoteSongProps = {
  selectedSong: Song;
  songUserData: FormVote;
  score: string;
  onScoreInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeStampInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (data: ScoreVoteForm) => Promise<void>;
}

export function VoteSong({
  selectedSong,
  songUserData,
  score,
  onScoreInputChange,
  onTimeStampInputChange,
  onFormSubmit
}: VoteSongProps) {
  
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ScoreVoteFields, any, ScoreVoteForm>({
    resolver: zodResolver(scoreVoteSchema)
  });


  useEffect(() => {
    setValue('score', String(songUserData.score));
    setValue('timeStamp', String(songUserData.timeStamp || 0));
  }, [songUserData, setValue])
  
  return (
    <div className="left">
      <span>{`${selectedSong.artist} - ${selectedSong.name}`}</span>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className='inputsvote'>
          <Input
            displayName='Score'
            errorMessage={errors.score?.message}
            {...register('score')}
            defaultValue={score}
            value={score}
            ref={withMask(['9.99', '99.99'], {max: 10.00, allowMinus: false, clearMaskOnLostFocus: true, showMaskOnFocus: false})}
            onChange={onScoreInputChange}
          />
          <Input
            displayName='Time suggested'
            errorMessage={errors.timeStamp?.message}
            {...register('timeStamp')}
            defaultValue={songUserData.timeStamp}
            value={songUserData.timeStamp}
            onChange={onTimeStampInputChange}
          />
          <Button
            name='Send'
            type="submit"
          />
        </div>
      </form>
    </div>
  );
}
