import axios from 'axios';
import { SongSetService } from '../../song-sets/songset.service';
import { getMostPossibleSong } from '../songfinder-repository';

const apiUrl = process.env.ANIMETHEMES_API_URL as string
const queryParamsUrl = "?include=animethemeentries.videos,anime.images,song.artists&fields[anime]=name,year&fields[animetheme]=type&fields[animethemeentry]=version&fields[video]=link,basename,id&fields[image]=facet,link&fields[song]=title&filter[has]=song&filter[song][title-like]=A%25&page[size]=100&page[number]=1&q=";

export class AnimeThemesService implements SongFinderContract {

  // private artistToString(artists: any[]): string {
  //   if (artists.length > 0) {
  //     if (artists[0].name !== undefined){
  //       return artists[0].name
  //     }
  //   }
  //   return ""
  // }

  private webDataToSongWebModel(data: any): SongWeb {
    return {
      title: data.song.title,
      artist: data.song.artists !== undefined && data.song.artists.length > 0 ? data.song.artists[0].name : "",
      anime: data.anime.name,
      coverImageUrl: data.anime.images!== undefined && data.anime.images.length > 0 ? data.anime.images[0].link : "",
      year: data.anime.year,
      type: data.type,
      video: {
        id: data.animethemeentries[0].videos[0].id,
        basename: data.animethemeentries[0].videos[0].basename,
        link: data.animethemeentries[0].videos[0].link
      }
    }

  }

  async search(query: string) {
    try {
      let result: SongWeb[] = []
      await axios.get(apiUrl + queryParamsUrl + query)
        .then((response) => {
          let themes = response.data.animethemes

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

  

  async searchBySongSetId(songSetId: number){
    const songSetService = new SongSetService;
    const songSet = await songSetService.get(songSetId);

    const finalResult: SongWeb[] = []

    if (songSet.songs && songSet.songs.length > 0){
      const times = songSet.songs.length
      for (let i = 0; i < times; i++) {
        let songDb = songSet.songs[i]

        let possibilities = await this.search(songDb.anime)
        let mostPossibleMatch = getMostPossibleSong(possibilities, songDb)
        
        if (mostPossibleMatch){
          finalResult.push(mostPossibleMatch)
        }
      }
    }
    return finalResult
  }
}