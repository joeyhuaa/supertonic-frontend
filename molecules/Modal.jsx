import React, { useEffect } from 'react'
import { useStore } from '../data/store'

import { BsX } from 'react-icons/bs'

import IconClickable from './IconClickable'

export default function Modal({
  modalId,
  title,
  body,
  showClose = true,
}) {
  const { closeModal } = useStore.getState()

  useEffect(() => {
    return () => closeModal()
  }, [])

  return (
    <section id={modalId} className='Modal'>
      <div 
        id='top'
        style={{
          position: 'relative',
          width: '100%',
        }}
      >
        {showClose && 
          <IconClickable
            handleClick={closeModal}
            icon={<BsX size={20} />}
            className='top-right-n-8'
          />
        }
        <h5 style={{ marginBottom: '20px' }}>{title}</h5>
      </div>
      {body}
    </section>
  )
}