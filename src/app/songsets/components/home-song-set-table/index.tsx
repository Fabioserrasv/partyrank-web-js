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
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const statusOptions = [
  { value: "", display: "Select Status" },
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
    if (pageType == 'home') {
      filteredSets = await handleGetHomeSongSets(filterQuery, user.id);
    } else {
      filteredSets = await handleGetAllSongSets(filterQuery, user.id);
    }
    console.log(filteredSets)
    setSets(filteredSets)
  }

  return (
    <Container className="main-table">
      {
        pageType == 'home' &&
        <>
          <span className='title-search-public'>Search Public Song Sets</span>
        </>
      }
      <form action={onSubmitFilter}>
        <Row className="filters">
          <Col xs={12} md={3}>
            <Input
              displayName=""
              name="name"
              className="nameFilter"
              autoComplete="off"
              placeholder="Song set title..."
              value={filterQuery.name}
              onChange={(e) => { setFilterQuery({ ...filterQuery, name: e.target.value }) }}
            />
          </Col>
          <Col xs={12} md={3}>
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
          </Col>
          <Col xs={12} md={3}>
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
          </Col>
          <Col xs={12} md={1} className="center-div-flex mt-1">
            <Button>
              <Search />
            </Button>
          </Col>


          {/* <Link href={`/songsets/create/0`}>
        </Link> */}
        </Row>
      </form>

      <TablePaginated
        sets={sets}
        itemsPerPage={8}
        user={user}
        pageType={pageType}
      />
    </Container>
  )
}