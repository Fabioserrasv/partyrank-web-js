'use client'
import { Button } from '@/components/button/Button';
import { Input } from '@/components/input';
import { LoadingComponent } from '@/components/loading-component';
import { Textarea } from '@/components/textarea'
import { handleGetSongSet } from '@/handlers/songset.handlers';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type ResultTabProps = {
  songSetId: number;
}

type JsonResult = {
  video: string;
  images: string;
  description: string;
}

export default function ResultTab({ songSetId }: ResultTabProps) {
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const [jsonsResult, setJsonsResult] = useState<JsonResult>({
    video: '',
    images: '',
    description: ''
  });
  const [timeVideoPerClip, setTimeVideoPerClip] = useState<number>(15);
  async function getSongSetWithJson() {
    try {
      setIsLoadind(true);
      const response = await handleGetSongSet(songSetId, true, timeVideoPerClip);
      let videoJson = '';

      videoJson = JSON.stringify(response?.generateVideoObject, undefined, 2)

      // response?.generateVideoObject?.map((v) => {
      //   videoJson += JSON.stringify(v, undefined, 2)
      // })

      let imageJson = JSON.stringify(response?.generateImageObject, undefined, 2)


      let descriptionJson = response?.generateDescriptionObject

      setJsonsResult({
        description: descriptionJson || '',
        video: videoJson,
        images: imageJson
      })
    } catch (error) {
      toast.error("Something went wrong!")
    } finally {
      setIsLoadind(false);
    }
  }

  return (
    <div className='divResult'>
      <div className="textAreasJson">
        <Textarea
          displayName="JSON Images"
          name="jsonimages"
          content={jsonsResult.images}
          className="textImage"
        />

        <Textarea
          displayName="JSON Video"
          name="jsonvideo"
          content={jsonsResult.video}
          className="textVideo">
        </Textarea>

        <Textarea
          displayName="Video Description"
          name="jsondescription"
          content={jsonsResult.description}
          className="textDesc">
        </Textarea>
        <Input
          displayName="Time Video Per Clip"
          name="timeVideoPerClip"
          value={timeVideoPerClip}
          onChange={e => setTimeVideoPerClip(Number(e.target.value))}
        />
      </div>
      {
        !isLoading ?
          <Button
            name="Generate Json"
            className="generateButton"
            onClick={getSongSetWithJson}
          /> : <LoadingComponent />
      }
    </div>
  )
}