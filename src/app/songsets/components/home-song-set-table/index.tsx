'use client';
import './home-song-set-table.scss';
import { useEffect, useState } from 'react';
import { handleGetAllSongSets, handleGetHomeSongSets, handleJoinPublicSongSet } from '@/handlers/songset.handlers';
import { Input } from '@/components/input';
import { Button } from '@/components/button/Button';
import { Filter, Search } from 'lucide-react';
import { TablePaginated } from '../table-paginated/TablePaginated';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast';
import { Select } from '@/components/select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Collapse from 'react-bootstrap/Collapse';
import { TablePaginatedList } from '../table-paginated-list/TablePaginatedList';

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
  initialTotalSets: number;
  user: User;
  pageType: 'home' | 'private';
}

export function HomeSongSetTable({ initialSets, user, pageType, initialTotalSets }: HomeSongSetTableProps) {
  const [sets, setSets] = useState<SongSet[]>(initialSets)
  const [filterQuery, setFilterQuery] = useState<FiltersQuerySongSet>({
    name: "",
    offset: 0,
    limit: 8
  })
  const [openFilters, setOpenFilters] = useState(false);
  const [totalSets, setTotalSets] = useState(initialTotalSets);

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
    let count
    if (pageType == 'home') {
      dbSongSets = await handleGetHomeSongSets(filterQuery, user.id);
    } else {
      dbSongSets = await handleGetAllSongSets(filterQuery, user.id);
    }
    count = dbSongSets.count;
    filteredSets = dbSongSets.sets;

    setSets(filteredSets)
    setTotalSets(count)
  }

  function onChangeFilter(filterQuery: FiltersQuerySongSet) {
    setFilterQuery(filterQuery)
    // onSubmitFilter()
  }

  return (
    <Container className="main-table">
      <div className='d-flex align-items-center p-2'>
        <div className='d-flex w-100' style={{ minHeight: '40px', maxHeight: '40px' }}>
          <Collapse className='collapse-filters' in={openFilters} dimension="width">
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
          </Collapse>
        </div>
        <Filter
          onClick={() => setOpenFilters(!openFilters)}
          aria-controls="example-collapse-text"
          aria-expanded={openFilters}
          className='pointer margin-filter'
          size={30}
        />
      </div>
      <TablePaginatedList
        sets={sets}
        initialTotalSets={totalSets}
        itemsPerPage={8}
        user={user}
        pageType={pageType}
        initialFilterQuery={filterQuery}
        onChangeFilter={onChangeFilter}
      />
    </Container>
  )
}