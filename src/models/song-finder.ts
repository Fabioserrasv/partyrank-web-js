type SongWeb = {
  title: string;
  artist: string;
  anime: string;
  type: string;
  coverImageUrl?: string;
  year?: string | number;
  video?: {
    id: string | number;
    basename?: string;
    link: string;
    wgetCommand?: string;
  }
}

type AnimeThemesResponse = {
  sequence: string | null;
  slug: string | null;
  type: string;
  anime: {
    name: string;
    season: string;
    slug: string;
    year: number;
    images: Array<{
      facet: string
      link: string;
    }> | null;
  }
  animethemeentries: Array<{
    version: string | null;
    videos: Array<{
      id: string | number;
      basename?: string;
      tags: string | null;
      link: string;
    }> | null;
  }>
  song: {
    title: string;
    artists: Array<{
      id: string | number;
      name: string;
      slug: string;
    }> | null;
  }
}

type AnimeThemesApiResponse = {
  animethemes: AnimeThemesResponse[];
}

type AnisongApiResponse = {
  data: AnisongResponse[]
}

type AnisongResponse = {
  annId: number;
  annSongId: number;
  animeENName: string;
  animeJPName: string;
  animeAltName?: string;
  animeVintage: string;
  animeType: string;
  songType: string;
  songName: string;
  songArtist: string;
  songDifficulty: number;
  songCategory: string;
  HQ: string;
  MQ?: string;
  audio: string;
  artists: Array<{
    id: number;
    names: string[];
    line_up_id: number;
    groups?: Array<{
      id: number;
      names: string[];
    }
    >
  }>
}

type SongFinderAction = {
  query: string;
  serviceName: string;
  songName?: string;
  artistName?: string;
  songSetId?: number;
}