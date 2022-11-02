import React, { useEffect } from 'react'

import { ClipLoader } from 'react-spinners'

import { useStore } from '../data/store'
import { useCreateSongs } from '../hooks/song'

import Modal from '../molecules/Modal'

const AddSongsModal = () => {
  const { mutate, isLoading, isSuccess, error } = useCreateSongs()
  const { 
    songsToUpload,
    currProject,
    currBranch,
    closeModal, 
  } = useStore.getState()

  useEffect(() => {
    if (isSuccess) closeModal()
  }, [isSuccess])

  let handleAddSongs = () => {
    // set up formdata
    let formdata = new FormData()
    formdata.append('projectId', currProject.id)
    formdata.append('branchName', currBranch)
    songsToUpload.forEach(song => formdata.append('files[]', song))

    // mutate
    mutate(formdata)
  }

  return (
    <Modal 
      modalId='add-songs-modal'
      title={`Add Songs (${songsToUpload.length})`}
      showClose={!isLoading}
      body={
        <>
          <div 
            id='file-list' 
            style={{
              marginBottom: '15px',
              overflow: 'auto'
            }}
          >
            {songsToUpload.map(file => (
              <div>
                {file.name}
              </div>
            ))}
          </div>

          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {isLoading ? (
              <ClipLoader color='white' />
            ) : (
              <button
                className='oval-btn submit-btn grow'
                onClick={handleAddSongs}
              >Add Songs</button>
            )}
          </div>
        </>
      }
    />
  )
}

export default AddSongsModal