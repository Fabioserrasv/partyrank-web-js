'use client';
import './home-song-set-table.scss';
import { useEffect, useState } from 'react';
import { handleGetAllSongSets, handleJoinPublicSongSet } from '@/handlers/songset.handlers';
import { Input } from '@/components/input';
import { Button } from '@/components/button/Button';
import { Search } from 'lucide-react';
import { TablePaginated } from '../table-paginated/TablePaginated';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast';
type HomeSongSetTableProps = {
  initialSets: SongSet[];
  user: User;
}


export function HomeSongSetTable({ initialSets, user }: HomeSongSetTableProps) {
  const [sets, setSets] = useState<SongSet[]>(initialSets)
  const [filterQuery, setFilterQuery] = useState<string>('')

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
    const filteredSets = await handleGetAllSongSets(filterQuery, user.id);
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
        itemsPerPage={8}
        user={user}
      />
    </div>
  )
}