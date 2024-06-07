'use client'
import React, { useEffect, useState } from 'react'
import './song-set-item.scss';
import { convertSongSetScoreSystemToString, convertSongSetTypeToString } from '@/repositories/songset.repository'
import { AlignEndHorizontal, Calendar, DoorClosed, FolderEdit, Lock, Music, Play, Unlock, User } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import { getUserImageUrlPathFromUsername, normalizeUsername } from '@/lib/utils';
import { handleGetCoverImageFromAnilistUrl } from '@/handlers/anilist-api.handlers';

type SongSetItemProps = {
  songSet: SongSet,
  onJoinPublicSongSet: (songSet: SongSet) => Promise<void>
}

export function SongSetItem({ songSet, onJoinPublicSongSet }: SongSetItemProps) {

  const [coverImage, setCoverImage] = useState<string>("");

  function getCoverImageFromAnilist(link: string) {
    return handleGetCoverImageFromAnilistUrl(link)
      .then(coverImageUrl => {
        return coverImageUrl || '';
      })
      .catch(error => {
        return '';
      });
  }

  useEffect(() => {
    getCoverImageFromAnilist(songSet.anilistLink)
      .then(imageUrl => {
        setCoverImage(imageUrl);
      })
      .catch(error => {
        setCoverImage('');
      });
  }, [songSet]);

  return (
    <div className='songitem'>
      <span className='title'>{songSet.name}</span>
      <div className='songinfo'>
        <div className='extraInfo'>
          <span>
            <Music />
            Songs: {songSet.songs?.length}
          </span>

          {/* <span>
            <Lock />
            {convertSongSetTypeToString(songSet.type)}
          </span> */}
          <span>
            <AlignEndHorizontal />
            {convertSongSetScoreSystemToString(songSet.scoreSystem)}
          </span>
          <div className='participants'>
            <span>Participants:</span>
            <div>
              <img src={getUserImageUrlPathFromUsername(songSet.user?.username!)} alt="Participant image" title={songSet.user?.username} />
              {

                songSet.usersOn?.map(userOn => {
                  const user = userOn.user
                  return (
                    <img key={user.id} src={getUserImageUrlPathFromUsername(user.username)} alt="Participant image" title={user.username} />
                  )
                })
              }
            </div>
          </div>
        </div>

      </div>
      <div className='img'>
        {
          coverImage != '' ?
          <img src={coverImage} alt="" /> :
          <div>
            <span>No image</span>
          </div>
        }
      </div>
      <div className='footer'>
        <div className='creatorInfo'>
          <span>
            <User />
            {songSet.user?.username}
          </span>
          <span>
            <Calendar />
            {moment(songSet.createdAt).format('DD/MM/YYYY')}
          </span>
          {
            songSet.type == "PUBLIC" &&
            <Unlock />
          }
          {
            songSet.type == "PRIVATE" &&
            <Lock />
          }
        </div>
        <div className='actions'>
          <Link href={`/songsets/create/${songSet.id}`}>
            <FolderEdit />
          </Link>
          <Link href={`/songsets/vote/${songSet.id}`}>
            <Play />
          </Link>
        </div>
      </div>
    </div>
  )
}
