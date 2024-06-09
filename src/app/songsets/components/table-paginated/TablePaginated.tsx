'use client'
import './table-paginated.scss';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handleJoinPublicSongSet } from '@/handlers/songset.handlers';
import { SongSetItem } from '../song-set-item/SongSetItem';


type PaginatedItemsProps = {
  itemsPerPage: number;
  sets: SongSet[];
  user: User;
  pageType: 'home' | 'private';
}

type handlePageClickProps = {
  selected: number;
}

export function TablePaginated({ itemsPerPage, pageType, sets, user }: PaginatedItemsProps) {
  const [itemOffset, setItemOffset] = useState(0);
  const [songSets, setSongSets ] = useState<SongSet[]>(sets);
  const [currentItems, setCurrentItems ] = useState<SongSet[]>(songSets.slice(itemOffset, (itemOffset + itemsPerPage)));
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
        removeSetFromSongSets(songSet)
        toast.success("Joined song set successfully!")
        push(`/songsets/create/${songSet.id}`)
      }
    } catch (error) {
      toast.error("Something went wrong!")
    }
  }

  function removeSetFromSongSets(songSet: SongSet){
    const newSongSets = songSets.filter(s => s.id === songSet.id)
    setSongSets(newSongSets); 
  }

  useEffect(() => {
    const endOffset =itemOffset + itemsPerPage;
    setCurrentItems(songSets.slice(itemOffset, endOffset))
  }, [songSets,itemOffset])

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
              pageType={pageType}
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