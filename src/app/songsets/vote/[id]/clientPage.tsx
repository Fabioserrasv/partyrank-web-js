'use client'
import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/input"
import { Table, TableRow } from "@/app/components/table"
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { scoreVoteSchema } from "../../validations/scoreValidation";

type VoteClientPageProps = {
  user: User;
  set: SongSet;
  handleVoteForm: ({ }: FormVote) => Promise<number | boolean>;
}

export type FormVote = {
  id?: number | string;
  score: number | string;
  timeStamp: number | string;
}

export function ClientPage({ user, set, handleVoteForm }: VoteClientPageProps) {
  if (!set.songs) {
    const route = useRouter()
    route.push("/songsets")
    return;
  }

  const [selectedSong, setSelectedSong] = useState<Song>(set?.songs[0]);
  const [songUserData, setSongUserData] = useState<FormVote>({ score: 0, timeStamp: 0 })
  const [songs, setSongs] = useState<Song[]>(set.songs)
  const [average, setAverage] = useState<number>(0)
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormVote>({
    resolver: zodResolver(scoreVoteSchema)
  });


  function getSessionDataSong(song: Song) {
    const data = song.scores.filter((score) => score.user?.id === user.id)[0]

    if (data !== undefined) {
      return ({ score: data.value, timeStamp: data.videoTimeStamp });
    }

    return ({ score: 0, timeStamp: 0 });
  }

  function setSessionDataSong(song: Song, scoreId: number, { score, timeStamp }: FormVote) {
    let newScore = true;
    const updatedSongs = songs.map((songOld) => {
      if (songOld.id === song.id) {
        songOld.scores = songOld.scores.map((scoreOld) => {
          if (scoreOld.userId == user.id) {
            scoreOld.value = Number(score)
            scoreOld.videoTimeStamp = Number(timeStamp)
            newScore = false
          }
          return scoreOld
        })

        if (newScore) {
          songOld.scores.push({
            id: scoreId,
            songId: song.id,
            userId: user.id,
            user: user,
            valid: 1,
            value: Number(score),
            videoTimeStamp: Number(timeStamp)
          })
        }
      }
      return songOld
    })
    setSongs(updatedSongs)
  }

  useEffect(() => {
    let userAllScores: number[] = []
    songs.map((s) => {
      s.scores.map((sc) => {
        if (sc.user?.id == user.id) {
          userAllScores.push(sc.value)
        }
      })
    })
    setAverage(Number((userAllScores.reduce((a, b) => a + b, 0) / userAllScores.length).toFixed(2)))
  }, [songs])

  useEffect(() => {
    const userDataForSong = getSessionDataSong(selectedSong);
    setSongUserData({ score: userDataForSong.score, timeStamp: userDataForSong.timeStamp })
  }, [selectedSong])

  async function handleFormSubmit(data: FormVote) {
    try {
      data.id = selectedSong.id
      const id = await handleVoteForm(data)

      if (id) {
        setSessionDataSong(selectedSong, id as number, {
          score: data.score,
          timeStamp: data.timeStamp
        })
        
        let nextIndex = songs.indexOf(selectedSong) + 1

        if (nextIndex <= (songs.length - 1)) {
          setSelectedSong(songs[nextIndex])
        }else{
          setSelectedSong(songs[0])
        }
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  // REMEMBER VALIDATE INPUTS
  let f = (a: string | number) => {
    if (a == '') a = 0
    let n = parseFloat(a as string)
    if (isNaN(n)) return NaN;
    if (n < 0) return 0
    if (n > 10) return f(n / 10)
    return n
  }

  function onScoreInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = parseFloat(e.target.value)
    value = Number.isNaN(value) ? 0 : value
    e.target.value = String(f(value).toFixed(2))
    setSongUserData({ ...songUserData, score: Number(e.target.value) })
  }

  function onTimeStampInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = parseFloat(e.target.value)
    value = Number.isNaN(value) ? 0 : value
    setSongUserData({ ...songUserData, timeStamp: Number(value) })
  }

  watch('id')

  return (
    <>
      <div className="video">
        <iframe src={selectedSong.link}></iframe>
      </div>

      <div className="left">
        <span>{`${selectedSong.artist} - ${selectedSong.name}`}</span>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className='inputsvote'>
            <Input
              displayName='Score'
              errorMessage={errors.score?.message}
              {...register('score')}
              defaultValue={songUserData.score}
              value={songUserData.score}
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

      <div className="aside">
        <h2>{`${set.name} - Average: ${average}`}</h2>
        <div className='list'>
          <Table>
            {
              songs ? songs.map((song) => {
                const userDataForSong = getSessionDataSong(song);

                return (
                  <TableRow key={song.id} onClick={() => { setSelectedSong(song) }}>
                    <div className='info'>
                      <span>{`${song.artist} - ${song.name}`}</span>
                      <small>{song.anime}</small>
                      <div className='extraInfo'>
                        <span>{`Score: ${userDataForSong.score}`}</span>
                        <span>{`Time Suggested: ${userDataForSong.timeStamp}`}</span>
                      </div>
                    </div>
                  </TableRow>
                )
              }) : <div>No songs found</div>
            }
          </Table>
        </div>
      </div>
    </>
  )
}