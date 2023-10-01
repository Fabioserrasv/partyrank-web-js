import { handleSongFinderFormSubmit } from '@/handlers/songfinder.handlers'
import { SongFinderClientPage } from './clientPage'
import './songfinder.scss'

export default function SongFinder() {
  return (
    <div className="songFinderPage">
      <SongFinderClientPage
        handleSongFinderFormSubmit={handleSongFinderFormSubmit}
      />
    </div>
  )
}