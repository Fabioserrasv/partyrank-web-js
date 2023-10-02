'use client'

import { Button } from "@/components/button/Button"
import { LoadingComponent } from "@/components/loading-component"
import Modal from "@/components/modal"
import { Textarea } from "@/components/textarea"
import { handleGetSongSet } from "@/handlers/songset.handlers"
import { Dispatch, SetStateAction, useState } from "react"
import toast from "react-hot-toast"

type JsonViewModalProps = {
  songSetId: number;
  closeModal: Dispatch<SetStateAction<boolean>>
}

type JsonResult = {
  video: string;
  images: string;
  description: string;
}

export function JsonViewModal({ songSetId, closeModal }: JsonViewModalProps) {
  const [isLoading, setIsLoadind] = useState<boolean>(false);
  const [jsonsResult, setJsonsResult] = useState<JsonResult>({
    video: '',
    images: '',
    description: ''
  });

  async function getSongSetWithJson() {
    try {
      setIsLoadind(true);
      const response = await handleGetSongSet(songSetId, true);
      let videoJson = '';
      
      
      response?.generateVideoObject?.map((v) => {
        videoJson += JSON.stringify(v, undefined, 2)
      })
      
      let imageJson = JSON.stringify(response?.generateImageObject, undefined, 2)
      
      setJsonsResult({
        description: '',
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
    <Modal
      title="Results"
      className="modalResult lg"
      closeModal={closeModal}
    >
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
      </div>
      {
          !isLoading ?
          <Button
            name="Generate Json"
            className="generateButton"
            onClick={getSongSetWithJson}
          /> : <LoadingComponent />
      }
    </Modal>
  )
}