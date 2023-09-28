import { getMostPossibleSong } from "@/repositories/songfinder.repository";
import { SongSetService } from "@/services/songset.service";
import axios from "axios";

const apiUrl = process.env.ANISONGDB_API_URL as string + "/search_request"

type AnisongDBRequest = {
  anime_search_filter?: {
    search: string;
    partial_match: boolean
  };
  song_name_search_filter?: {
    search: string;
    partial_match: boolean;
  };
  artist_search_filter?: {
    search: string;
    partial_match: boolean;
    group_granularity: number;
    max_other_artist: number
  }
}

export class AnisongDBService implements SongFinderContract {
  folderName: string;

  constructor(folderName: string) {
    this.folderName = folderName;
  }

  webDataToSongWebModel = (data: AnisongResponse): SongWeb => {
    const artist = data.artists !== null && data.artists.length > 0 ? data.artists[0].names[0] : '';
    const coverImageUrl = ""
    const videoId = data.annId !== null ? data.annId : ""
    const videoBasename = data.songName ? data.songName.replaceAll(" ", "_") : ""
    const videoLink = data.HQ !== null ? data.HQ : ""
    const downloadCmd = '!wget ' + videoLink + " -O /content/drive/MyDrive/" + this.folderName + "/" + videoBasename + ' --header="User-Agent: Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11"';

    return {
      title: data.songName,
      artist: artist,
      anime: data.animeJPName,
      coverImageUrl: coverImageUrl,
      year: data.animeVintage,
      type: String(data.songType),
      video: {
        id: videoId,
        basename: videoBasename,
        link: videoLink,
        wgetCommand: downloadCmd
      }
    }
  }

  async search(query: string, songName?: string, artist?: string): Promise<SongWeb[]> {
    try {
      let searchParams: AnisongDBRequest = {}

      if (query != '') {
        searchParams['anime_search_filter'] = {
          "search": query,
          "partial_match": true
        }
      }

      if (songName) {
        searchParams['song_name_search_filter'] = {
          "search": songName,
          "partial_match": true
        }
      }

      if (artist) {
        searchParams['artist_search_filter'] = {
          "search": artist,
          "partial_match": true,
          "group_granularity": 0,
          "max_other_artist": 99
        }
      }

      let result: SongWeb[] = []
      await axios.post(apiUrl, JSON.stringify(searchParams), { headers: { 'Content-Type': 'application/json' } })
        .then((response) => {
          let apiResponse: AnisongApiResponse = response
          const songs = apiResponse.data

          result = songs.map(this.webDataToSongWebModel)
        })
        .catch(function (error) {
          throw error
        })

      return result

    } catch (error) {
      throw error;
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

        let possibilities = await this.search(songDb.anime, songDb.name, songDb.artist)
        // console.log(possibilities)
        let mostPossibleMatch = getMostPossibleSong(possibilities, songDb)

        if (mostPossibleMatch) {
          finalResult.push(mostPossibleMatch)
        }
      }
    }
    return finalResult
  }
}