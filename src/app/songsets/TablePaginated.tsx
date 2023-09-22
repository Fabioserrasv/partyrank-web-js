import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Table, TableRow } from '../components/table';
import { Calendar, FolderEdit, Music, Play, User } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';

// Example items, to simulate fetching from another resources.
type PaginatedItemsProps = { itemsPerPage: number; sets: SongSet[] }

type handlePageClickProps = {
  selected: number;
}

export function TablePaginated({ itemsPerPage, sets }: PaginatedItemsProps) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = sets.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sets.length / itemsPerPage);


  const handlePageClick = ({ selected }: handlePageClickProps) => {
    const newOffset = (selected * itemsPerPage) % sets.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Table>
        {currentItems ? currentItems.map((s) => {
          return (
            <TableRow key={s.id}>
              <div className='info'>
                <span>{s.name}</span>
                <div className='extraInfo'>
                  <span>
                    <Music />
                    Songs: {s.songs?.length}
                  </span>
                  <span>
                    <User />
                    {s.user?.username}
                  </span>
                  <span>
                    <Calendar />
                    {moment(s.createdAt).format('DD/MM/YYYY')}
                  </span>
                </div>
              </div>
              <div className='actions'>
                <FolderEdit />
                <Link href={`/songsets/vote/${s.id}`}>
                  <Play />
                </Link>
              </div>
            </TableRow>
          )
        }) : <></>}
      </Table>
      <ReactPaginate
        className='pagination'
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  )
}