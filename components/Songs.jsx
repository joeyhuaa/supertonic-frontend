import React, { useEffect } from 'react'
import shallow from 'zustand/shallow'
import { useStore } from '../data/store'

import Clickable from '../molecules/Clickable'
import IconClickable from '../molecules/IconClickable'
import FancyFileInput from '../molecules/FancyFileInput'
import DropdownMenu from '../molecules/DropdownMenu'

import { 
  useCreateSongs, 
  useDeleteSong, 
  useUpdateSong 
} from '../hooks/song'

import { FaPlay, FaPause } from 'react-icons/fa'
import { GiMusicalNotes } from 'react-icons/gi'
import { IoIosOptions } from 'react-icons/io' 

import { ScaleLoader } from 'react-spinners'

import * as moment from 'moment'
import 'moment-duration-format'

function Song({ song }) {
  const { 
    currSong, 
    setCurrSong, 
    isSongPlaying, 
    setSongPlaying,
    playPause, 
    setSongToUpdate, 
    openModal, 
    currBranch,
  } = useStore(state => ({
    currSong: state.currSong,
    setCurrSong: state.setCurrSong,
    isSongPlaying: state.isSongPlaying,
    setSongPlaying: state.setSongPlaying,
    playPause: state.playPause,
    setSongToUpdate: state.setSongToUpdate,
    openModal: state.openModal,
    currBranch: state.currBranch,
  }), shallow)

  const deleteSong = useDeleteSong()

  function handleOpenUpdateSongModal() {
    setSongToUpdate(song) //update store with the song we need to update
    openModal('update-song')
  }

  function destroy() { 
    deleteSong.mutate({ 
      songId: song.id, 
      projectId: song.project_id,
      branchName: currBranch,
    })
  }

  function toggleSong(song) {
    if (currSong) {
      if (song.id === currSong?.id) {
        playPause()
      } else {
        playPause()
        setCurrSong(song)
        // todo - make this a cb AFTER currSong is set - playPause()
      }
    } else {
      setCurrSong(song)
      playPause()
    }
  }

  return (
    <Clickable className='song'>
      <IconClickable
        className='clickable play song-item'
        handleClick={() => toggleSong(song)}
        icon={
          isSongPlaying && currSong?.id === song.id ? (
            <FaPause className='grow' />
          ) : (
            <FaPlay className='grow' />
          )
        }
      />
      <span className='name ellipse song-item'>
        {song.name}
      </span>
      <span className='time song-item'>
        {moment.duration(song.duration, 'seconds').format('m:ss')}
      </span>
      <span className='date song-item'>
        {moment(new Date(song.created_at)).format('MM/DD/YYYY')}
      </span>
      <DropdownMenu 
        icon={<IoIosOptions />}
        items={
          [
            {
              label: 'Change File',
              onClick: handleOpenUpdateSongModal
            },
            {
              label: 'Delete',
              onClick: destroy 
            }
          ]
        }
      />
    </Clickable>
  )
}

export default function Songs({ project, branchName }) {
  const { isLoading, error } = useCreateSongs()

  const songs = project.songs
  const branch = project.branches.find(b => b.name === branchName)

  if (songs.length === 0) {
    return (
      <div id='empty-songs'>
        {isLoading && <ScaleLoader color='whitesmoke' />}
        {!isLoading && 
          <FancyFileInput
            icon={<GiMusicalNotes size={50} />}
            accept='.mp3, .wav'
            label='Add Music'
            onChange={() => console.log('changing songs')}
            multiple
          />
        }
      </div>
    )
  }
  
  return (
    <div id='songs' className='fade-bottom'>
      {branch?.songs?.map(song => 
        <div key={song.id}>
          <Song song={song} />
        </div>
      )}
    </div>
  )
}