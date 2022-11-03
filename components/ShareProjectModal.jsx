import React, { useEffect } from 'react'

import { ClipLoader } from 'react-spinners'

import { useStore } from '../data/store'

import Modal from '../molecules/Modal'

const ShareProjectModal = () => {
  const { currProject } = useStore.getState()

  /**
   * * generate a shareable link, copy it to clipboard
   * * show a confirmation modal on screen
   */
  async function copyLinkToClipboard() {
    // todo - move this somewhere... do some environment detection to make dynamic
    const baseURL = 'http://localhost:3000/'
    const link = `${baseURL}shared${window.location.pathname}`

    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(link);
    } else {
      return document.execCommand('copy', true, link); // for IE
    }
  }

  function onSubmit() {

  }

  return (
    <Modal 
      modalId='share-project-modal'
      title={`Share "${currProject?.name}"`}
      body={
        <>
          <form
            id='share-form'
            style={{ marginBottom: '15px' }}
            onSubmit={onSubmit}
          >
            <input 
              style={{ width: '100%' }}
              placeholder="Enter someone's username or email"
            />
          </form>
          <h6>People with access</h6>
          <div>
            {currProject?.users?.map(user => (
              <div>
                <span>{user.name}</span>
                <span>{user.email}</span>
              </div>
            ))}
          </div>
          <div>
            <button 
              className='round-btn submit-btn grow'
              onClick={copyLinkToClipboard}
            >Copy Link</button>
          </div>
        </>
      }
    />
  )
}

export default ShareProjectModal