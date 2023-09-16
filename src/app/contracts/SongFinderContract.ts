interface SongFinderContract {
  search:(query: string) => Promise<SongWeb[]>;
  searchBySongSetId:(songSetId: number) => Promise<SongWeb[]>;
}