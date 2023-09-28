interface SongFinderContract {
  folderName: string;
  search:(query: string) => Promise<SongWeb[]>;
  searchBySongSetId:(songSetId: number) => Promise<SongWeb[]>;
}