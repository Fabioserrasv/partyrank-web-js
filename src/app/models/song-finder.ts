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
  }
}