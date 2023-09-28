import axios from "axios"

export function convertDbSongToModel(data: any): Song {
  return {
    id: data.id,
    songSet: data.songSet,
    anime: data.anime,
    artist: data.artist,
    name: data.name,
    link: data.link,
    type: data.type,
    scores: data.scores,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

export async function convertDbSetToModel(data: any, generateJson: boolean = false): Promise<SongSet> {
  return {
    id: data.id,
    name: data.name,
    user: data.user,
    songs: data.songs !== undefined && data.songs.length > 0 ? data.songs.map(convertDbSongToModel) : [],
    generateImageObject: generateJson ? generateImageObjectConverter(data) : undefined,
    generateVideoObject: generateJson ? await generateVideoObject(data) : undefined,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt
  }
}

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

async function getVideoTitleFromGoogleDriveLink(url: string) {
  let result = ''
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
  return result
}