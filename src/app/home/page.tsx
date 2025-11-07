import { getServerSession } from 'next-auth';
import { HomeSongSetTable } from '../songsets/components/home-song-set-table';
import { HomeClientPage } from './clientPage';
import './home.scss';
import { options } from '../api/auth/[...nextauth]/options';
import { getAllSongSetsHomePage } from '@/actions/songset.actions';

// export const dynamic = 'force-dynamic';

export default async function Home() {
  const session = await getServerSession(options);
  const user = session?.user!
  let resultSongSets = await getAllSongSetsHomePage({
    name: "",
    creatorName: "",
    filters: {
      offset: 0,
      limit: 8
    }
  }, user?.id);
  let sets = resultSongSets.sets;
  let count = resultSongSets.count;

  return (
    <div className='homePage'>
      <HomeSongSetTable
        user={user}
        initialSets={sets}
        initialTotalSets={count}
        pageType='home'
      />
    </div>
  )
}
