'use client';
import './home-song-set-table.scss';
import { useState } from 'react';
import { handleGetAllSongSets, handleJoinPublicSongSet } from '@/handlers/songset.handlers';
import { Input } from '@/components/input';
import { Button } from '@/components/button/Button';
import { Search } from 'lucide-react';
import { TablePaginated } from '../table-paginated/TablePaginated';

type HomeSongSetTableProps = {
  initialSets: SongSet[];
  user: User;
}


export function HomeSongSetTable({ initialSets, user }: HomeSongSetTableProps) {
  const [sets, setSets] = useState<SongSet[]>(initialSets)
  const [filterQuery, setFilterQuery] = useState<string>('')

  async function onSubmitFilter() {
    const filteredSets = await handleGetAllSongSets(filterQuery);
    setSets(filteredSets)
  }

  return (
    <div className="main-table">
      <div className="filters">
        <form action={onSubmitFilter}>
          <Input
            displayName=""
            name="name"
            className="nameFilter"
            autoComplete="off"
            placeholder="Mawaru Penguindrum..."
            value={filterQuery}
            onChange={(e) => { setFilterQuery(e.target.value) }}
          />
          <Button>
            <Search />
          </Button>
        </form>
        {/* <Link href={`/songsets/create/0`}>
        </Link> */}
      </div>
      <TablePaginated
        sets={sets}
        itemsPerPage={20}
        user={user}
      />
    </div>
  )
}