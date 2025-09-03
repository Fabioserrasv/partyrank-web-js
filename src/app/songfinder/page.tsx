import { handleSongFinderFormSubmit } from '@/handlers/songfinder.handlers'
import { SongFinderClientPage } from './clientPage'
import './songfinder.scss'
import { getAllServices } from '@/actions/song-service.actions'

export default async function SongFinder() {
  const services = await getAllServices();

  return (
    <div className="songFinderPage">
      <SongFinderClientPage services={services} />
    </div>
  )
}