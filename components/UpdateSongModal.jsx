import React, { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners'

import { useStore } from '../data/store'
import { useUpdateSong } from '../hooks/song'

import Modal from '../molecules/Modal'

export default function UpdateSongModal() {
  const [newFile, setNewFile] = useState(null)
  const { mutate, isLoading, isSuccess, isError } = useUpdateSong()
  const { songToUpdate, currProject, currBranch, closeModal } = useStore.getState()

  useEffect(() => {
    if (isSuccess || isError) closeModal()
  }, [isSuccess, isError])

  async function handleUpdateSong() {
    //* formdata
    let formdata = new FormData()
    formdata.append('files[]', newFile)
    formdata.append('projectId', currProject.id)
    formdata.append('songId', songToUpdate.id)
    formdata.append('branchName', currBranch)

    //* mutate
    mutate(formdata)
  }

  return (
    <Modal 
      modalId='update-song-modal'
      title={`Update Song`}
      showClose={!isLoading}
      body={
        <>
          <p>Choose a file to replace "{songToUpdate?.name}"</p>
          <input 
            type='file' 
            accept='.mp3, .wav'
            onChange={e => setNewFile( Array.from(e.target.files)[0] )} 
          />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {isLoading ? (
              <ClipLoader color='white' />
            ) : (
              <button
                className='oval-btn submit-btn grow'
                onClick={handleUpdateSong}
              >Update Song</button>
            )}
          </div>
        </>
      }
    />
  )
}