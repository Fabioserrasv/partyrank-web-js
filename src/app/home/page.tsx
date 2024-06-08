import { getServerSession } from 'next-auth';
import { HomeSongSetTable } from '../songsets/components/home-song-set-table';
import { HomeClientPage } from './clientPage';
import './home.scss';
import { options } from '../api/auth/[...nextauth]/options';
import { getAllSongSetsHomePage } from '@/actions/songset.actions';

export default async function Home() {
  const session = await getServerSession(options);
  const user = session?.user!
  let sets = await getAllSongSetsHomePage("", user?.id);


  return (
    <div className='homePage'>
      <HomeSongSetTable
        user={user}
        initialSets={sets}
        pageType='home'
      />
    </div>
  )
}
