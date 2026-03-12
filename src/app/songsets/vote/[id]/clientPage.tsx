"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { handleScoreFormSubmit } from "@/handlers/score.handlers";
import { VideoPlayer } from "./videoPlayer";
import { VoteSong, FormVote, ScoreVoteForm } from "./voteSong";
import { SongList } from "./songList";
import { SongsetStatistics } from "./songsetStatistics";

type VoteClientPageProps = {
  user: User;
  set: SongSet;
};

export function VoteClientPage({ user, set }: VoteClientPageProps) {
  const router = useRouter();
  const [selectedSong, setSelectedSong] = useState<Song>(set?.songs[0]);
  const [songUserData, setSongUserData] = useState<FormVote>({
    score: 0,
    timeStamp: 0,
  });
  const [songs, setSongs] = useState<Song[]>(set.songs);
  const [average, setAverage] = useState<number>(0);
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false);
  const [score, setScore] = useState<string>("0");

  async function handleFormSubmit(data: ScoreVoteForm) {
    try {
      const vote: FormVote = { ...data, id: selectedSong.id };
      const id = await handleScoreFormSubmit(vote);

      if (id) {
        setSessionDataSong(selectedSong, id as number, {
          score: data.score,
          timeStamp: data.timeStamp,
        });

        let nextIndex = songs.indexOf(selectedSong) + 1;

        if (nextIndex <= songs.length - 1) {
          setSelectedSong(songs[nextIndex]);
        } else {
          setSelectedSong(songs[0]);
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }

  const getSessionDataSong = useCallback(
    (song: Song) => {
      const data = song.scores.filter((score) => score.user?.id === user.id)[0];
      if (data !== undefined) {
        return {
          score: data.value,
          timeStamp: data.videoTimeStamp,
          new: false,
        };
      }
      return { score: 0, timeStamp: 0, new: true };
    },
    [user.id],
  );

  function setSessionDataSong(
    song: Song,
    scoreId: number,
    { score, timeStamp }: FormVote,
  ) {
    let newScore = true;
    const updatedSongs = songs.map((songOld) => {
      if (songOld.id === song.id) {
        songOld.scores = songOld.scores.map((scoreOld) => {
          if (scoreOld.user?.id == user.id && songOld.id === song.id) {
            scoreOld.value = Number(score);
            scoreOld.videoTimeStamp = Number(timeStamp);
            newScore = false;
          }
          return scoreOld;
        });

        if (newScore) {
          songOld.scores.push({
            id: scoreId,
            songId: song.id,
            userId: user.id,
            user: user,
            valid: 1,
            value: Number(score),
            videoTimeStamp: Number(timeStamp),
          });
        }
      }
      return songOld;
    });
    setSongs(updatedSongs);
  }

  function onScoreInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let stringValue = e.target.value;
    let value = parseFloat(e.target.value);
    if (value > 10 && stringValue[0] == "1") {
      value = 10;
      stringValue = "10.00";
    } else if (value > 10) {
      return;
    }

    setScore(stringValue);
    setSongUserData({ ...songUserData, score: Number(value) });
  }

  function onTimeStampInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = parseFloat(e.target.value);
    value = Number.isNaN(value) ? 0 : value;
    setSongUserData({ ...songUserData, timeStamp: Number(value) });
  }

  function getScoreOfSong(
    scores: number[],
    scoreSystem: SongSetScoreSystemType,
  ) {
    const sum = Number(scores.reduce((a, b) => a + b, 0));
    if (scoreSystem == "SCORING_AVERAGE") {
      return Number((sum / scores.length).toFixed(2));
    } else if (scoreSystem == "SCORING") {
      return sum;
    } else {
      // TO DO RANKING
      return sum;
    }
  }

  const calculateUserAverageScore = useCallback(() => {
    let userAllScores: number[] = [];
    songs.map((s) => {
      s.scores.map((sc) => {
        if (sc.user?.id === user.id) {
          userAllScores.push(sc.value);
        }
      });
    });
    return getScoreOfSong(userAllScores, set.scoreSystem);
  }, [songs, user.id, set.scoreSystem]);

  useEffect(() => {
    setAverage(calculateUserAverageScore());
  }, [songs, user.id, set.scoreSystem, calculateUserAverageScore]);

  useEffect(() => {
    const userDataForSong = getSessionDataSong(selectedSong);

    if (userDataForSong.new) {
      setScore("");
      setSongUserData({ score: 0, timeStamp: 0 });
      return;
    }

    if (userDataForSong.score == 10) {
      setScore("10.00");
    } else if (String(userDataForSong.score).length == 3) {
      setScore(String(userDataForSong.score) + "0");
    } else if (String(userDataForSong.score).length == 1) {
      setScore(String(userDataForSong.score) + "00");
    } else {
      setScore(String(userDataForSong.score));
    }

    setSongUserData({
      score: userDataForSong.score,
      timeStamp: userDataForSong.timeStamp || 0,
    });
  }, [selectedSong, getSessionDataSong]);

  useEffect(() => {
    const hasNoSongs = !set.songs || set.songs.length === 0;
    if (hasNoSongs) {
      toast.error("No songs found");
      router.push("/songsets");
    }
  }, [set.songs, router]);

  useEffect(() => {
    document
      .querySelector(".votePage")
      ?.classList.toggle("not-theater", isTheaterMode);
  }, [isTheaterMode, songs]);

  if (!set.songs || set.songs.length === 0) {
    return null;
  }

  return (
    <div className={`votePage`}>
      <VideoPlayer
        selectedSong={selectedSong}
        isTheaterMode={isTheaterMode}
        onToggleTheaterMode={() => setIsTheaterMode(!isTheaterMode)}
      />

      <VoteSong
        selectedSong={selectedSong}
        songUserData={songUserData}
        score={score}
        onScoreInputChange={onScoreInputChange}
        onTimeStampInputChange={onTimeStampInputChange}
        onFormSubmit={handleFormSubmit}
      />

      <div className="aside">
        <SongsetStatistics setName={set.name} average={average} />
        <SongList
          songs={songs}
          onSongSelect={setSelectedSong}
          getSessionDataSong={getSessionDataSong}
        />
      </div>
    </div>
  );
}
