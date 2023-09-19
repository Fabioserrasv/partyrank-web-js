import axios from 'axios';
import { SongSetService } from '../../song-sets/songset.service';
import { generateSongFinderFolder, getMostPossibleSong } from '../songfinder.repository';

const apiUrl = process.env.ANIMETHEMES_API_URL as string
const queryParamsUrl = "?include=animethemeentries.videos,anime.images,song.artists&fields[anime]=name,year&fields[animetheme]=type&fields[animethemeentry]=version&fields[video]=link,basename,id&fields[image]=facet,link&fields[song]=title&filter[has]=song&filter[song][title-like]=A%25&page[size]=100&page[number]=1&q=";

export class AnimeThemesService implements SongFinderContract {
  folderName: string;

  constructor(folderName: string) {
    this.folderName = folderName;
  }

  webDataToSongWebModel = (data: AnimeThemesResponse): SongWeb => {
    const artist = data.song.artists !== null && data.song.artists.length > 0 ? data.song.artists[0].name : "";
    const coverImageUrl = data.anime.images !== null && data.anime.images.length > 0 ? data.anime.images[0].link : ""
    const videoId = data.animethemeentries !== null && data.animethemeentries.length > 0 && data.animethemeentries[0].videos ? data.animethemeentries[0].videos[0].id : ""
    const videoBasename = data.animethemeentries !== null && data.animethemeentries.length > 0 && data.animethemeentries[0].videos ? data.animethemeentries[0].videos[0].basename : ""
    const videoLink = data.animethemeentries !== null && data.animethemeentries.length > 0 && data.animethemeentries[0].videos ? data.animethemeentries[0].videos[0].link : ""
    const downloadCmd = '!wget ' + videoLink + " -O /content/drive/MyDrive/" + this.folderName + "/" + videoBasename + ' --header="User-Agent: Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11"';

    return {
      title: data.song.title,
      artist: artist,
      anime: data.anime.name,
      coverImageUrl: coverImageUrl,
      year: data.anime.year,
      type: data.type,
      video: {
        id: videoId,
        basename: videoBasename,
        link: videoLink,
        wgetCommand: downloadCmd
      }
    }
  }

  async search(query: string) {
    try {
      let result: SongWeb[] = []
      await axios.get(apiUrl + queryParamsUrl + query)
        .then((response) => {
          let data: AnimeThemesApiResponse = response.data
          let themes = data.animethemes

          result = themes.map(this.webDataToSongWebModel)
        })
        .catch(function (error) {
          throw error
        })

      return result
    } catch (error) {
      throw error
    }
  }

  async searchBySongSetId(songSetId: number) {
    const songSetService = new SongSetService;
    const songSet = await songSetService.get(songSetId, false);

    const finalResult: SongWeb[] = []

    if (songSet.songs && songSet.songs.length > 0) {
      const times = songSet.songs.length
      for (let i = 0; i < times; i++) {
        let songDb = songSet.songs[i]

        let possibilities = await this.search(songDb.anime)
        let mostPossibleMatch = getMostPossibleSong(possibilities, songDb)

        if (mostPossibleMatch) {
          finalResult.push(mostPossibleMatch)
        }
      }
    }
    return finalResult
  }
}