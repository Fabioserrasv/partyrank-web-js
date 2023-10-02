import axios from "axios"
import { convertDbSongToModel } from "./song.repository"

/*
  Convert relation of User x SongSet to Model defined on src/models
*/
function convertDbUsersOn(data: any): UserOn {
  return {
    songSet: data,
    accepted: data.accepted,
    user: data.user
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
export async function convertDbSetToModel(data: any, generateJson: boolean = false): Promise<SongSet> {
  return {
    id: data.id,
    name: data.name,
    user: data.user,
    type: data.type,
    status: data.status,
    songs: data.songs !== undefined && data.songs.length > 0 ? data.songs.map(convertDbSongToModel) : [],
    usersOn: data.users !== undefined && data.users.length > 0 ? data.users.map(convertDbUsersOn) : [],
    scoreSystem: data.scoreSystem,
    generateImageObject: generateJson ? generateImageObjectConverter(data) : undefined,
    generateVideoObject: generateJson ? await generateVideoObject(data) : undefined,
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
    let notes: ScoreNote[] = song.scores.map(score => {
      return {
        participant: score.user?.username ? score.user.username : "Username not found",
        value: score.value
      }
    })

    let sum = song.scores.map(score => score.value)
    let average = (sum.reduce((a, b) => a + b, 0) / sum.length)

    song.scores.map(score => finalResult.participants.push(String(score.user?.username)))
    finalResult.participants = finalResult.participants.filter((x, y, z) => z.indexOf(x) == y)

    finalResult.series.push({
      type: song.type,
      anime: song.anime,
      cover: "",
      song: `${song.artist} - ${song.name}`,
      average: average,
      scores: notes
    })
  }

  return finalResult
}

/*
  Outputs the object of JSON template (:JsonToGenerateVideo) for generating the video
*/
async function generateVideoObject(data: any) {
  const finalResult: JsonToGenerateVideo[] = []
  const times = data.songs.length

  for (let i = 0; i < times; i++) {
    let song: Song = data.songs[i]

    let sum = song.scores.map(score => score.videoTimeStamp)
    let time = Math.floor(sum.reduce((a, b) => a + b, 0) / sum.length)

    const DEFAULT_PER_CLIP_TIME = 20 // NEED TO CHANGE THIS TO CHANGEABLE VALUE 

    let title = await getVideoTitleFromGoogleDriveLink(song.link)

    finalResult.push({
      image_path: "/content/drive/MyDrive/images_party_rank/" + String(i + 1) + ".png",
      video_path: "/content/drive/MyDrive/videos_party_rank/" + title,
      cut_time: [time, time + DEFAULT_PER_CLIP_TIME]
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
        throw error
      })
  }
  return result
}