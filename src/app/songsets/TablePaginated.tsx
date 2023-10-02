'use client'
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Table, TableRow } from '@/components/table';
import { AlignEndHorizontal, Calendar, DoorClosed, FolderEdit, Lock, Music, Play, User } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import { convertSongSetScoreSystemToString, convertSongSetTypeToString } from '@/repositories/songset.repository';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handleJoinPublicSongSet } from '@/handlers/songset.handlers';

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
      <Table>
        {currentItems && currentItems.length > 0 ? currentItems.map((item) => {
          return (
            <TableRow key={item.id}>
              <div className='info'>
                <span>{item.name}</span>
                <div className='extraInfo'>
                  <span>
                    <Music />
                    Songs: {item.songs?.length}
                  </span>
                  <span>
                    <User />
                    {item.user?.username}
                  </span>
                  <span>
                    <Lock />
                    {convertSongSetTypeToString(item.type)}
                  </span>
                  <span>
                    <AlignEndHorizontal />
                    {convertSongSetScoreSystemToString(item.scoreSystem)}
                  </span>
                  <span>
                    <Calendar />
                    {moment(item.createdAt).format('DD/MM/YYYY')}
                  </span>
                </div>
              </div>
              <div className='actions'>
                {/* {
                  item.type == "PUBLIC" &&
                  <DoorClosed onClick={() => { onJoinPublicSongSet(item) }} />
                } */}
                <Link href={`/songsets/create/${item.id}`}>
                  <FolderEdit />
                </Link>
                <Link href={`/songsets/vote/${item.id}`}>
                  <Play />
                </Link>
              </div>
            </TableRow>
          )
        }) : <div>No Songs Set Found</div>}
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