import React, { useEffect } from 'react'
import { ClipLoader } from 'react-spinners'
import { useStore } from '../data/store'
import Modal from '../molecules/Modal'
import { useInviteUser } from '../hooks/project'

const ShareProjectModal = () => {
  const { currProject } = useStore.getState()
  const inviteUser = useInviteUser()

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

  return (
    <Modal 
      modalId='share-project-modal'
      title={`Share "${currProject?.name}"`}
      body={
        <>
          <form
            id='share-form'
            style={{ marginBottom: '15px' }}
            onSubmit={e => {
              e.preventDefault()
              inviteUser.mutate({ projId: currProject.id, newUserEmail: 'joeyhua17@gmail.com'})
            }}
          >
            <input 
              style={{ width: '100%' }}
              placeholder="Enter someone's username or email"
            />
          </form>
          <h6>People with access:</h6>
          <div>
            <div>
              <ul>
                <li>{currProject?.owner?.username} (owner)</li>
                {currProject?.shared_users?.map(user => (
                  <li>
                    <span>{user.username} | </span>
                    <span>{user.email ?? 'no email'}</span>
                  </li>
                ))}
              </ul>
            </div>
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