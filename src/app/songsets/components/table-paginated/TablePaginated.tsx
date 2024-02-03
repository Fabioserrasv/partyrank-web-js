'use client'
import './table-paginated.scss';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handleJoinPublicSongSet } from '@/handlers/songset.handlers';
import { SongSetItem } from '../song-set-item/SongSetItem';


type PaginatedItemsProps = {
  itemsPerPage: number;
  sets: SongSet[];
  user: User;
}

type handlePageClickProps = {
  selected: number;
}

export function TablePaginated({ itemsPerPage, sets, user }: PaginatedItemsProps) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = sets.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(sets.length / itemsPerPage);
  const { push } = useRouter();
  const handlePageClick = ({ selected }: handlePageClickProps) => {
    const newOffset = (selected * itemsPerPage) % sets.length;
    setItemOffset(newOffset);
  };

  async function onJoinPublicSongSet(songSet: SongSet) {
    try {
      const response = await handleJoinPublicSongSet(songSet.id, user.id)
      if (response) {
        toast.success("Joined song set successfully!")
        push(`/songsets/create/${songSet.id}`)
      }
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }

  return (
    <>
      <div className='home-table'>
        {currentItems && currentItems.length > 0 ? currentItems.map((item) => {
          return (
            // <TableRow>
              <SongSetItem
                key={item.id} 
                songSet={item}
                onJoinPublicSongSet={onJoinPublicSongSet}
              />
            // </TableRow>
          )
        }) : <div>No Songs Set Found</div>}
      </div>
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