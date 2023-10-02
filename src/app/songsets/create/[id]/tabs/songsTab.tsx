import { Table, TableRow } from "@/app/components/table";
import { reverseArray } from "@/lib/utils";
import { Globe, Mic2, Monitor, X } from "lucide-react";

type SongsTabProps = {
  isSetCreator: boolean;
  songs: Song[];
  onSongClick: (song: Song) => void
  onDeleteSong: (id: number) => Promise<void>
}

const formattedTypes = {
  "OPENING": "Opening",
  "ENDING": "Ending",
  "INSERT_SONG": "Insert Song"
}

export function SongsTab({ onDeleteSong, onSongClick, songs, isSetCreator }: SongsTabProps) {
  return (
    <div className="songsDiv">
      <Table>
        {
          reverseArray(songs).map(song => {
            return (
              <TableRow key={song.id}>
                <div className='info' onClick={() => { onSongClick(song) }}>
                  <span>{`${song.artist} - ${song.name}`}</span>
                  <div className="extraInfo">
                    <span>
                      <Monitor />
                      {song.anime}
                    </span>
                    <span>
                      <Mic2 />
                      {formattedTypes[song.type]}
                    </span>
                    <span>
                      <Globe />
                      {song.link}
                    </span>
                  </div>
                </div>
                {
                  isSetCreator &&
                  <div className='actions'>
                    <X className="icon" onClick={() => { onDeleteSong(song.id) }} />
                  </div>
                }
              </TableRow>
            )
          })
        }
      </Table>
    </div>
  )
}