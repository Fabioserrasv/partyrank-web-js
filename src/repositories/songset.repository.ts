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
    generateDescriptionObject: generateJson ? await generateDescriptionObject(data) : undefined,
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
    items: []
  }
  const times = data.songs.length

  for (let i = 0; i < times; i++) {
    let song: Song = data.songs[i]
    let filteredScores = song.scores;

    if(data.pickSystem == SongSetPickSystem.PICKED_BY_PARTICIPANTS) {
      filteredScores = filteredScores.filter(score => score.user!.id != song.pickedById)
    }

    let scores: ScoreNote[] = filteredScores.map(score => {
      return {
        id_user: score.user?.id ? score.user.id : -1,
        value: score.value
      }
    })

    let sum = filteredScores.map(score => score.value)
    let average = (sum.reduce((a, b) => a + b, 0) / sum.length)
    song.meanScore = average;

    song.scores.map(score =>  {
      if(!finalResult.participants.some(participant => participant.id == score.user?.id)) {
        finalResult.participants.push({
          id: score.user?.id!,
          name: score.user?.username!
        })
      }
    })

    // Encontrar melhores e piores notas
    const maxScore = Math.max(...filteredScores.map(s => s.value))
    const minScore = Math.min(...filteredScores.map(s => s.value))
    
    const bestScores = filteredScores
      .filter(score => score.value === maxScore)
      .map(score => ({
        nome: score.user?.username || 'Desconhecido',
        nota: score.value
      }))
    
    const worstScores = filteredScores
      .filter(score => score.value === minScore)
      .map(score => ({
        nome: score.user?.username || 'Desconhecido',
        nota: score.value
      }))

    finalResult.items.push({
      [`id_${song.id}`]: {
        type: song.type,
        anime: song.anime,
        cover: `${song.id}.jpg`,
        song: `${song.artist} - ${song.name}`,
        average: average,
        scores: scores,
        bestScores: bestScores,
        worstScores: worstScores
      }
    })
  }
  
  finalResult.items = finalResult.items.sort((a, b) => {
    const aKey = Object.keys(a)[0];
    const bKey = Object.keys(b)[0];
    return  a[aKey].average - b[bKey].average;
  });

  return finalResult
}

/*
  Outputs the object of JSON template (:JsonToGenerateVideo) for generating the video
*/
async function generateVideoObject(data: any, timeVideoPerClip: number = 15) {
  const finalResult: JsonToGenerateVideo[] = []
  let songs: Song[] = data.songs

  const times = songs.length

  //Mean score defined on generateImageObjectConverter
  songs = songs.sort((a: Song, b: Song) => a.meanScore! - b.meanScore!)

  for (let i = 0; i < times; i++) {
    let song: Song = songs[i]

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

    if(title == ''){
      title = `${song.id}.mp4`;
    }

    let imageFile = `${song.id}.png`;

    finalResult.push({
      image_path: "/content/drive/MyDrive/images_party_rank/" + imageFile,
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

async function generateDescriptionObject(data: any) {
  let finalResult: string = 'Stats: \n'

  const userStats: { [key: string]: { username: string, scores: number[], greenCount: number, redCount: number } } = {}

  data.songs.forEach((song: any) => {
    let filteredScores = song.scores;

    if(data.pickSystem == SongSetPickSystem.PICKED_BY_PARTICIPANTS) {
      filteredScores = filteredScores.filter((score: any) => score.user!.id != song.pickedById)
    }

    const maxScore = Math.max(...filteredScores.map((s: any) => s.value))
    const minScore = Math.min(...filteredScores.map((s: any) => s.value))

    filteredScores.forEach((score: any) => {
      const userId = score.user?.id
      const username = score.user?.username || 'Unknown'
      const scoreValue = score.value

      if (!userStats[userId]) {
        userStats[userId] = {
          username: username,
          scores: [],
          greenCount: 0,
          redCount: 0
        }
      }

      userStats[userId].scores.push(scoreValue)

      if (scoreValue === maxScore) {
        userStats[userId].greenCount++
      }
      
      if (scoreValue === minScore) {
        userStats[userId].redCount++
      }
    })
  })

  const userStatsArray = Object.values(userStats).map(stats => {
    const average = stats.scores.reduce((a, b) => a + b, 0) / stats.scores.length
    return {
      username: stats.username,
      average: average,
      greenCount: stats.greenCount,
      redCount: stats.redCount
    }
  }).sort((a, b) => b.average - a.average) 

  userStatsArray.forEach(user => {
    finalResult += `${user.username} (${user.average.toFixed(2)}) - Green: ${user.greenCount}, Red: ${user.redCount}\n`
  })

  finalResult += `\nSongs Used: \n\n`

  const times = data.songs.length
  for (let i = 0; i < times; i++) {
    let song: Song = data.songs[i]
    finalResult += `${song.anime} - ${song.name} by ${song.artist} \n`
  }

  return finalResult
}