interface SongFinderContract {
  folderName: string;
  search:(query: string, songName?: string, artist?: string) => Promise<SongWeb[]>;
  searchBySongSetId:(songSetId: number) => Promise<SongWeb[]>;
}