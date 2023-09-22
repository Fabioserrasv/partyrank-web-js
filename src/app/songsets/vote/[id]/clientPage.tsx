'use client'
import { Button } from "@/app/components/button/Button";
import { Input } from "@/app/components/input"
import { Table, TableRow } from "@/app/components/table"
import { useEffect, useState } from "react";
import { redirect } from 'next/navigation';
import { useRouter } from "next/router";

type VoteClientPageProps = {
  user: User;
  set: SongSet;
  handleVoteForm: ({ }: FormData) => Promise<number | boolean>;
}

type FormVote = {
  score: number;
  timeStamp: number;
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
      if(songOld.id === song.id){
        songOld.scores = songOld.scores.map((scoreOld) => {
          if(scoreOld.userId == user.id){
            scoreOld.value = score
            scoreOld.videoTimeStamp = timeStamp
            newScore = false
          }
          return scoreOld
        })

        if (newScore){
          songOld.scores.push({
            id: scoreId,
            songId: song.id,
            userId: user.id,
            user: user,
            valid: 1,
            value: score,
            videoTimeStamp: timeStamp
          })
        }
      }
      return songOld
    })
    setSongs(updatedSongs)
  }

  useEffect(() => {
    const userDataForSong = getSessionDataSong(selectedSong);
    setSongUserData({ score: userDataForSong.score, timeStamp: userDataForSong.timeStamp })
  }, [selectedSong])

  async function handleFormSubmit(formData: FormData) {
    const id = await handleVoteForm(formData)

    if (id && songs) {
      let nextIndex = songs?.indexOf(selectedSong) + 1
      setSessionDataSong(selectedSong, id as number, { 
        score: Number(formData.get('score')),
        timeStamp: Number(formData.get('time'))
      })

      if (nextIndex <= songs.length) {
        setSelectedSong(songs[nextIndex])
      }
    }
  }

  // REMEMBER VALIDATE INPUTS

  return (
    <>
      <div className="video">
        <iframe src={selectedSong.link}></iframe>
      </div>

      <div className="left">
        <span>{`${selectedSong.artist} - ${selectedSong.name}`}</span>
        <form action={handleFormSubmit}>
          <div className='inputsvote'>
            <input type="hidden" name="id" value={selectedSong.id} />
            <Input
              displayName='Score'
              name='score'
              defaultValue={songUserData.score}
              value={songUserData.score}
              onChange={(e) => {setSongUserData({...songUserData, score: Number(e.target.value)})}}
              />
            <Input
              displayName='Time suggested'
              name='time'
              defaultValue={songUserData.timeStamp}
              value={songUserData.timeStamp}
              onChange={(e) => {setSongUserData({...songUserData, timeStamp: Number(e.target.value)})}}
            />
            <Button
              name='Send'
            />
          </div>
        </form>
      </div>

      <div className="aside">
        <h2>{set.name}</h2>
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