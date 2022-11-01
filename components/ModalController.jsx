import React from 'react'
import shallow from 'zustand/shallow'

import { useStore } from '../data/store'

import AddSongsModal from './AddSongsModal'
import UpdateSongModal from './UpdateSongModal'
import ShareProjectModal from './ShareProjectModal'

export default function ModalController() {
  const modalName = useStore(state => state.modalName, shallow)

  switch(modalName) {
    case 'add-songs':
      return <AddSongsModal />
    case 'update-song':
      return <UpdateSongModal />
    case 'share-project':
      return <ShareProjectModal />
    default:
      return null
  }
}