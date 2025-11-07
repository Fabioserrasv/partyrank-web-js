'use client'
import './table-paginated-list.scss';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { handleJoinPublicSongSet } from '@/handlers/songset.handlers';
import { SongSetItem } from '../song-set-item/SongSetItem';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import Table from 'react-bootstrap/Table';
import { useTheme } from '@/context/ThemeContext';
import { AlignEndHorizontal, Calendar, DoorClosed, DoorOpen, FolderEdit, Play, User } from 'lucide-react';
import moment from 'moment';
import { handleGetCoverImageFromAnilistUrl } from '@/handlers/anilist-api.handlers';
import { handleAddImageAnimeFormSubmit, handleGetImageAnime } from '@/handlers/image.anime.handleres';
import Image from 'next/image';
import { convertSongSetScoreSystemToString } from '@/repositories/songset.repository';

type PaginatedItemsProps = {
  itemsPerPage: number;
  sets: SongSet[];
  user: User;
  pageType: 'home' | 'private';
}

type handlePageClickProps = {
  selected: number;
}

export function TablePaginatedList({ itemsPerPage, pageType, sets, user }: PaginatedItemsProps) {
  const { isDarkMode } = useTheme();
  const [itemOffset, setItemOffset] = useState(0);
  const [songSets, setSongSets] = useState<SongSet[]>(sets);
  const [currentItems, setCurrentItems] = useState<SongSet[]>(songSets.slice(itemOffset, (itemOffset + itemsPerPage)));
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

  function removeSetFromSongSets(songSet: SongSet) {
    const newSongSets = songSets.filter(s => s.id === songSet.id)
    setSongSets(newSongSets);
  }

  useEffect(() => {
    setSongSets(sets);
    const endOffset = itemOffset + itemsPerPage;
    songSets.forEach(async (songSet) => {
      songSet.coverImage = await getCoverImageFromAnilist(songSet.anilistLink);
    });
    setCurrentItems(songSets.slice(itemOffset, endOffset))
  }, [sets, songSets, itemOffset, itemsPerPage])

  async function getCoverImageFromAnilist(link: string): Promise<string> {
    return handleGetImageAnime(link).then((res) => {
      if (res != null) {
        return res.link;
      } else {
        return handleGetCoverImageFromAnilistUrl(link)
          .then(async (coverImageUrl) => {
            if (coverImageUrl != '') {
              await handleAddImageAnimeFormSubmit({
                anilistLink: link,
                link: coverImageUrl
              });
            }
            return coverImageUrl || '';
          })
          .catch(error => {
            console.log(error);
            return '';
          });
      }
    }).catch(error => {
      console.log(error);
      return '';
    });
  }

  return (
    <>
      <div className='home-table'>
        <Table className='table-home-song-sets' striped variant={isDarkMode ? 'dark' : 'light'}>
          <tbody>
            {currentItems && currentItems.length > 0 ? currentItems.map((songSet) => {
              return (
                <tr key={songSet.id}>
                  <td style={{ width: '40%' }}>
                    <div className='first-column d-flex align-items-center'>
                      {
                        songSet.coverImage ?
                          <Image width={47} height={70} src={songSet.coverImage} alt="" /> :
                          <Image width={47} height={70} src={'https://cdn.discordapp.com/attachments/1104912890802225204/1436151459858092163/image.png?ex=690e8fc6&is=690d3e46&hm=229674b3996937f0ceb1a63cab0271c44cfe7286e0a97d56b3ff4fda7eba4133&'} alt="" />
                      }
                      <div>
                        <span className='title'>{songSet.name}</span>
                        <span className='songs'>Songs: {songSet.songs?.length}</span>
                        {/* <span className='created-at'>
                          <Calendar size={16} />
                          {moment(songSet.createdAt).format('DD/MM/YYYY')}
                        </span> */}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center justify-content-center'>
                      <span>
                        <AlignEndHorizontal />
                        {convertSongSetScoreSystemToString(songSet.scoreSystem)}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex align-items-center'>
                      <span>
                        <User />
                        {songSet.user?.username}
                      </span>
                    </div>
                  </td>
                  <td>
                    {
                      pageType == 'private' ?
                        <>
                          <Link href={`/songsets/create/${songSet.id}`}>
                            <FolderEdit />
                          </Link>
                          <Link href={`/songsets/vote/${songSet.id}`}>
                            <Play />
                          </Link>
                        </>
                        :
                        <div className='icon-button d-flex align-items-center justify-content-center'>
                          <DoorClosed className='closed' onClick={() => { onJoinPublicSongSet(songSet) }} />
                          <DoorOpen className='open' onClick={() => { onJoinPublicSongSet(songSet) }} />
                        </div>
                    }
                  </td>
                  {/* <td>{item.createdAt}</td> */}
                  {/* <SongSetItem
                  
                  songSet={item}
                  onJoinPublicSongSet={onJoinPublicSongSet}
                  pageType={pageType}
                /> */}
                </tr>
              )
            }) : <div>No Songs Set Found</div>}
          </tbody>
        </Table>
      </div>
      <div className='d-flex justify-content-center'>
        <Pagination>
          {Array.from({ length: pageCount }, (_, index) => (
            <Pagination.Item key={index} active={index === itemOffset / itemsPerPage} onClick={() => handlePageClick({ selected: index })}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>

      </div>
      {/* <ReactPaginate
        className='pagination'
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      /> */}
    </>
  )
}