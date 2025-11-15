import axios from "axios"
import { convertDbSongToModel } from "./song.repository"
import { SongSetPickSystem } from "@prisma/client"

/*
  Convert relation of User x SongSet to Model defined on src/models
*/
function convertDbUsersOn(data: any): UserOn {
  return {
    songSet: data,
    accepted: data.accepted,
    user: data.user,
    imageUrl: data.imageUrl
  }
}

/*
  Convert a songset type to string
*/
export function convertSongSetTypeToString(type: SongSetType): string {
  const convertedText = {
    "PRIVATE": "Private",
    "PUBLIC": "Public"
  }

  return convertedText[type]
}

export function filterOnlyUserOn(songSets: SongSet[], user: User) {

  let creator = songSets.filter(song => song.user?.id == user.id)
  let filtered = songSets.filter((songSet) => {
    let isOn = false
    songSet.usersOn?.map((relation) => {
      if (relation.user.id == user.id) {
        isOn = true;
      }
    })
    if (isOn) {
      return songSet
    }
  })

  return [...creator, ...filtered]
}

/*
  Convert a songset score system to string
*/
export function convertSongSetScoreSystemToString(type: SongSetScoreSystemType): string {
  const convertedText = {
    "RANKING": "Ranking",
    "SCORING": "Scoring",
    "SCORING_AVERAGE": "Scoring"
  }

  return convertedText[type]
}

/*
  Convert a songset from database to SongSet Model defined on src/models
*/
export async function convertDbSetToModel(data: any, generateJson: boolean = false, time: number = 15): Promise<SongSet> {
  return {
    id: data.id,
    name: data.name,
    anilistLink: data.anilistLink,
    user: data.user,
    type: data.type,
    status: data.status,
    songs: data.songs !== undefined && data.songs.length > 0 ? data.songs.map(convertDbSongToModel) : [],
    usersOn: data.users !== undefined && data.users.length > 0 ? data.users.map(convertDbUsersOn) : [],
    scoreSystem: data.scoreSystem,
    pickSystem: data.pickSystem,
    generateImageObject: generateJson ? generateImageObjectConverter(data) : undefined,
    generateVideoObject: generateJson ? await generateVideoObject(data, time) : undefined,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

/*
  Outputs the object of JSON template (:JsonToGenerateImages) for generating the images
*/
function generateImageObjectConverter(data: any) {
  let finalResult: JsonToGenerateImages = {
    title: data.name,
    participants: [],
    series: []
  }
  const times = data.songs.length

  for (let i = 0; i < times; i++) {
    let song: Song = data.songs[i]
    let filteredScores = song.scores;

    if(data.pickSystem == SongSetPickSystem.PICKED_BY_PARTICIPANTS) {
      filteredScores = filteredScores.filter(score => score.user.id != song.pickedById)
    }

    let scores: ScoreNote[] = filteredScores.map(score => {
      return {
        participant: score.user?.username ? score.user.username : "Username not found",
        value: score.value
      }
    })

    let sum = filteredScores.map(score => score.value)
    let average = (sum.reduce((a, b) => a + b, 0) / sum.length)

    song.scores.map(score =>  {
      if(!finalResult.participants.some(participant => participant.id == score.user?.id)) {
        finalResult.participants.push({
          id: score.user?.id!,
          nome: score.user?.username!
        })
      }
    })
    finalResult.series.push({
      type: song.type,
      anime: song.anime,
      cover: "",
      song: `${song.artist} - ${song.name}`,
      average: average,
      scores: scores
    })
  }

  return finalResult
}

/*
  Outputs the object of JSON template (:JsonToGenerateVideo) for generating the video
*/
async function generateVideoObject(data: any, timeVideoPerClip: number = 15) {
  const finalResult: JsonToGenerateVideo[] = []
  const times = data.songs.length

  for(let i = 0; i < times; i++) {
    let song: Song = data.songs[i]
    let sum = song.scores.map(score => score.value)
    let average = (sum.reduce((a, b) => a + b, 0) / song.scores.length)
    if(isNaN(average)){
      average = 0
    }
    song.meanScore = average
  }

  data.songs.sort((a: Song, b: Song) => a.meanScore! - b.meanScore!)

  for (let i = 0; i < times; i++) {
    let song: Song = data.songs[i]

    let sum = song.scores.map(score => score.videoTimeStamp)

    let time = Math.floor(sum.reduce((a, b) => a + b, 0) / sum.length)

    if(song.pickedBy) {
      time = song.scores.find(score => score.user?.id == song.pickedBy?.id)?.videoTimeStamp!
    }

    if(isNaN(time)){
      time = 1
    }

    // const DEFAULT_PER_CLIP_TIME = 20 // NEED TO CHANGE THIS TO CHANGEABLE VALUE 

    let title = await getVideoTitleFromGoogleDriveLink(song.link)

    finalResult.push({
      image_path: "/content/drive/MyDrive/images_party_rank/" + song.id + ".png",
      video_path: "/content/drive/MyDrive/videos_party_rank/" + title,
      cut_time: [time, time + timeVideoPerClip]
    })
  }

  return finalResult
}

/*
  Get title of the video from Google Drive link
*/
async function getVideoTitleFromGoogleDriveLink(url: string) {
  let result = ''
  if (url.includes("drive.google.com")) {
    await axios.get(url)
      .then((response) => {
        const page = response.data

        const titleRegex = /<title>(.*?)<\/title>/;
        const matches = page.match(titleRegex);

        if (matches && matches.length > 1) {
          result = matches[1].replace(' - Google Drive', '');
        }
      })
      .catch(function (error) {
        if(error.response.status == 404) {
          return null;
        }
        // throw error
      })
  }
  return result
}