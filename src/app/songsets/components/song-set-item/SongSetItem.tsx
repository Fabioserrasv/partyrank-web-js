'use client'
import React from 'react'
import './song-set-item.scss';
import { convertSongSetScoreSystemToString, convertSongSetTypeToString } from '@/repositories/songset.repository'
import { AlignEndHorizontal, Calendar, FolderEdit, Lock, Music, Play, User } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import { getUserImageUrlPathFromUsername, normalizeUsername } from '@/lib/utils';

type SongSetItemProps = {
  songSet: SongSet,
  onJoinPublicSongSet: (songSet: SongSet) => Promise<void>
}

export function SongSetItem({ songSet, onJoinPublicSongSet }: SongSetItemProps) {
  return (
    <div className='songitem'>
      <span className='title'>{songSet.name}</span>
      <div className='songinfo'>
        <div className='extraInfo'>
          <span>
            <Music />
            Songs: {songSet.songs?.length}
          </span>

          <span>
            <Lock />
            {convertSongSetTypeToString(songSet.type)}
          </span>
          <span>
            <AlignEndHorizontal />
            {convertSongSetScoreSystemToString(songSet.scoreSystem)}
          </span>

        </div>
      </div>
      <div className='img'>
        <span>Participants:</span>
        <div>
        <img src={getUserImageUrlPathFromUsername(songSet.user?.username!)} alt="Participant image" title={songSet.user?.username} />
        {

          songSet.usersOn?.map(userOn => {
            const user = userOn.user
            return(
              <img key={user.id} src={getUserImageUrlPathFromUsername(user.username)} alt="Participant image" title={user.username} />
            )
          })
        }
        </div>        
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
        </div>
        <div className='actions'>
          {/* {
          songSet.type == "PUBLIC" &&
          <DoorClosed onClick={() => { onJoinPublicSongSet(songSet) }} />
        } */}
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
