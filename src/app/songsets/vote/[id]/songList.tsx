'use client'
import { Table, TableRow } from "@/components/table"

type SongListProps = {
  songs: Song[];
  onSongSelect: (song: Song) => void;
  getSessionDataSong: (song: Song) => { score: number | string; timeStamp: number | string; new: boolean };
}

export function SongList({ songs, onSongSelect, getSessionDataSong }: SongListProps) {
  return (
    <div className='list'>
      <Table>
        {
          songs ? songs.map((song) => {
            const userDataForSong = getSessionDataSong(song);

            return (
              <TableRow key={song.id} onClick={() => { onSongSelect(song) }}>
                <div className='info'>
                  <span>{`${song.artist} - ${song.name}`}</span>
                  <small>{song.anime}</small>
                  <div className='extraInfo'>
                    <span>{`Score: ${userDataForSong.score}`}</span>
                    {/* <span>{`Time Suggested: ${userDataForSong.timeStamp}`}</span> */}
                  </div>
                </div>
              </TableRow>
            )
          }) : <div>No songs found</div>
        }
      </Table>
    </div>
  );
}
