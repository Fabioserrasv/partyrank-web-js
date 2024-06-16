'use client'
import { Button } from "@/components/button/Button";
import { Input } from "@/components/input"
import { Table, TableRow } from "@/components/table"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { maskValueToDecimal } from "@/lib/utils";
import toast from "react-hot-toast";
import { scoreVoteSchema } from "@/app/songsets/validations/songSetValidations";
import { handleScoreFormSubmit } from "@/handlers/score.handlers";

type VoteClientPageProps = {
  user: User;
  set: SongSet;
}

export type FormVote = {
  id?: number | string;
  score: number | string;
  timeStamp: number | string;
}

export function VoteClientPage({ user, set }: VoteClientPageProps) {
  const [selectedSong, setSelectedSong] = useState<Song>(set?.songs[0]);
  const [songUserData, setSongUserData] = useState<FormVote>({ score: 0, timeStamp: 0 })
  const [songs, setSongs] = useState<Song[]>(set.songs)
  const [average, setAverage] = useState<number>(0)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormVote>({
    resolver: zodResolver(scoreVoteSchema)
  });

  if (!set.songs || set.songs.length == 0) {
    toast.error("No songs found")
    const route = useRouter()
    route.push("/songsets")
    return;
  }

  async function handleFormSubmit(data: FormVote) {
    try {
      data.id = selectedSong.id
      const id = await handleScoreFormSubmit(data)

      if (id) {
        setSessionDataSong(selectedSong, id as number, {
          score: data.score,
          timeStamp: data.timeStamp
        })

        let nextIndex = songs.indexOf(selectedSong) + 1

        if (nextIndex <= (songs.length - 1)) {
          setSelectedSong(songs[nextIndex])
        } else {
          setSelectedSong(songs[0])
        }
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

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
          if (scoreOld.user?.id == user.id && songOld.id === song.id) {
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

  function onScoreInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = parseFloat(e.target.value)
    value = Number.isNaN(value) ? 0 : value
    e.target.value = String(maskValueToDecimal(value).toFixed(2))
    setSongUserData({ ...songUserData, score: Number(e.target.value) })
  }

  function onTimeStampInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = parseFloat(e.target.value)

    value = Number.isNaN(value) ? 0 : value
    setSongUserData({ ...songUserData, timeStamp: Number(value) })
  }

  function getScoreOfSong(scores: number[], scoreSystem: SongSetScoreSystemType) {
    const sum = Number(scores.reduce((a, b) => a + b, 0));
    if (scoreSystem == "SCORING_AVERAGE") {
      return Number((sum / scores.length).toFixed(2))
    } else if (scoreSystem == "SCORING") {
      return sum
    } else {
      // TO DO RANKING
      return sum
    }
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

    setAverage(getScoreOfSong(userAllScores, set.scoreSystem))
  }, [songs, user.id, set.scoreSystem]);

  useEffect(() => {
    const userDataForSong = getSessionDataSong(selectedSong);
    setSongUserData({ score: userDataForSong.score, timeStamp: userDataForSong.timeStamp })
  }, [selectedSong, getSessionDataSong])

  useEffect(() => {
    setValue('score', String(songUserData.score));
    setValue('timeStamp', String(songUserData.timeStamp));
  }, [songUserData])

  return (
    <>
      <div className="video">
        {/* {selectedSong?.link ? <iframe src={selectedSong.link}></iframe> : <div>Song Not Found</div>} */}
        {selectedSong?.link ? 
        <video src={selectedSong.link} width="320" height="240" controls></video>
        : <div>Song Not Found</div>}
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
        <h2>{`${set.name} | Score: ${average}`}</h2>
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