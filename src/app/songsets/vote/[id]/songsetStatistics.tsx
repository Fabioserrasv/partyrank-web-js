'use client'

type SongsetStatisticsProps = {
  setName: string;
  average: number;
}

export function SongsetStatistics({ setName, average }: SongsetStatisticsProps) {
  return (
    <div className="top-list">
      <h2>{`${setName} | Score: ${average ? average : 0}`}</h2>
    </div>
  );
}
