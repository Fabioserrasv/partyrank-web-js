'use client';
import './home-song-set-table.scss';
import { useEffect, useState } from 'react';
import { handleGetAllSongSets, handleGetHomeSongSets, handleJoinPublicSongSet } from '@/handlers/songset.handlers';
import { Input } from '@/components/input';
import { Button } from '@/components/button/Button';
import { Search } from 'lucide-react';
import { TablePaginated } from '../table-paginated/TablePaginated';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast';
import { Select } from '@/components/select';
import { FiltersQuerySongSet } from '@/models/song-sets';

const statusOptions = [
  { value: null, display: "Select Status" },
  { value: "RECRUITING", display: "Recruiting" },
  { value: "ON_GOING", display: "On Going" },
  { value: "PROCESSING", display: "Processing" },
  { value: "FINISHED", display: "Finished" },
  { value: "PAUSED", display: "Paused" }
]

const systemTypeOptions = [
  { value: "SCORING", display: "Scoring (Sum of Scores)" },
  { value: "SCORING_AVERAGE", display: "Scoring (Average)" },
  { value: "RANKING", display: "Ranking" }
]

type HomeSongSetTableProps = {
  initialSets: SongSet[];
  user: User;
  pageType: 'home' | 'private';
}

export function HomeSongSetTable({ initialSets, user, pageType }: HomeSongSetTableProps) {
  const [sets, setSets] = useState<SongSet[]>(initialSets)
  const [filterQuery, setFilterQuery] = useState<FiltersQuerySongSet>({})

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const error = searchParams.get('error');

    // Removendo os query params da URL
    if (error === 'not_allowed') {
      toast.error("You don't have permission to vote on this songset");
      router.replace('/songsets', { scroll: false });
    }
  }, [router, pathname, searchParams]);

  async function onSubmitFilter() {
    let filteredSets
    if(pageType == 'home'){
      filteredSets = await handleGetHomeSongSets(filterQuery, user.id);
    }else{
      filteredSets = await handleGetAllSongSets(filterQuery, user.id);
    }
    console.log(filteredSets)
    setSets(filteredSets)
  }

  return (
    <div className="main-table">
      {
        pageType == 'home' &&
        <>
          <span className='title-search-public'>Search Public Song Sets</span>
        </>
      }
      <div className="filters">
        <form action={onSubmitFilter}>
          <Input
            displayName=""
            name="name"
            className="nameFilter"
            autoComplete="off"
            placeholder="Song set title..."
            value={filterQuery.name}
            onChange={(e) => { setFilterQuery({ ...filterQuery, name: e.target.value }) }}
          />
          <Input
            displayName=""
            name="creatorName"
            className="creatorNameFilter"
            autoComplete="off"
            placeholder="Creator name..."
            value={filterQuery.creatorName}
            onChange={(e) => { setFilterQuery({ ...filterQuery, creatorName: e.target.value }) }}
          />
          <Select
            displayName=""
            name="status"
            className="statusFilter"
            autoComplete="off"
            placeholder="Status..."
            options={statusOptions}
            value={filterQuery.status}
            onChange={(e) => { setFilterQuery({ ...filterQuery, status: e.target.value as SongSetStatus }) }}
          />
          <Select
            displayName=""
            name="systemType"
            className="systemTypeFilter"
            autoComplete="off"
            placeholder="System type..."
            options={systemTypeOptions}
            value={filterQuery.systemType}
            onChange={(e) => { setFilterQuery({ ...filterQuery, systemType: e.target.value as SongSetScoreSystemType }) }}
          />
          {/* <Input
            displayName=""
            name="minSongs"
            className="minSongsFilter"
            autoComplete="off"
            placeholder="Min songs..."
            value={filterQuery.minSongs}
            onChange={(e) => { setFilterQuery({ ...filterQuery, minSongs: parseInt(e.target.value) }) }}
          />
          <Input
            displayName=""
            name="maxSongs"
            className="maxSongsFilter"
            autoComplete="off"
            placeholder="Max songs..."
            value={filterQuery.maxSongs}
            onChange={(e) => { setFilterQuery({ ...filterQuery, maxSongs: parseInt(e.target.value) }) }}
          /> */}
          <Button>
            <Search />
          </Button>
        </form>
        {/* <Link href={`/songsets/create/0`}>
        </Link> */}
      </div>
      <TablePaginated
        sets={sets}
        itemsPerPage={8}
        user={user}
        pageType={pageType}
      />
    </div>
  )
}