import React, { useState, useEffect, useRef } from 'react'
import shallow from 'zustand/shallow'
import styled from 'styled-components'
import { useStore } from '../data/store'

import moment from 'moment'
import { FaPlay, FaPause } from 'react-icons/fa'

// todo - figure out how to prevent re-rendering
function MusicPlayer() {
  const [currentTime, setCurrentTime] = useState(null) //! this is prob why this component is re-rendering despite React.memo
  const { currSong, setCurrSong, isSongPlaying, setSongPlaying, playPause, currProject } = useStore(state => ({
    currSong: state.currSong,
    setCurrSong: state.setCurrSong,
    isSongPlaying: state.isSongPlaying,
    setSongPlaying: state.setSongPlaying,
    playPause: state.playPause,
    currProject: state.currProject,
  }), shallow);
  const songs = currProject?.songs;

  useEffect(() => {
    console.log('MUSIC PLAYER RENDER')
  }, [])

  useEffect(() => {
    if (isSongPlaying) {
      music.current.play()  
    } else {
      music.current.pause()
    }
  }, [isSongPlaying])

  let music = useRef(null)
  let playhead = useRef(null)
  let timeline = useRef(null)
  let timelinePast = useRef(null)
  let pButton = useRef(null)

  let getCurrentTime = () => { if (music.current) return music.current.currentTime }

  let getDuration = () => { if (music.current) return music.current.duration }

  let getTimeLineWidth = () => timeline.current.offsetWidth

  let queueNextSong = () => {
      let nextSong = songs[Math.floor(Math.random() * songs.length)]
      if (nextSong.id === currSong.id) queueNextSong()
      else setCurrSong(nextSong)
      console.log('queued ' + nextSong.name)
  }

  let timeUpdate = () => {
    // update the timeline UI
    let playPercent = (music.current.currentTime / getDuration()) * getTimeLineWidth()
    playhead.current.style.marginLeft = playPercent + 'px'
    timelinePast.current.style.width = playPercent + 5 + 'px'

    // set state
    setCurrentTime( msString(getCurrentTime()) )
    if ( getCurrentTime() === getDuration() ) {
      setSongPlaying(false)
      queueNextSong()
    }
  }

  let timeLineClicked = (e) => {
    let timelineLeft = timeline.current.getBoundingClientRect().left
    let clickPercent = (e.clientX - timelineLeft) / getTimeLineWidth()
    music.current.currentTime = getDuration() * clickPercent
    setCurrentTime(msString(getCurrentTime()))
  }

  let msString = (seconds) => {
    let t = moment.duration(seconds * 1000);
    let m = t.minutes()
    let s = t.seconds() < 10 ? '0' + t.seconds() : t.seconds();
    if (Number.isNaN(m) || Number.isNaN(s)) return null;
    else return `${m}:${s}`
  };

  return (
    <Container id='player_container'>
      <audio
        id='music'
        ref={music}
        onTimeUpdate={timeUpdate}
        src={currSong ? currSong.url : null}
      />

      <span className='song_title'>
        {currSong ? currSong.name : null}
      </span>

      <div id='pButton' ref={pButton} onClick={() => playPause(currSong.id)}>
        {isSongPlaying ? (
          <FaPause color='white' className='grow' />
        ) : (
          <FaPlay color='white' className='grow' />
        )}
      </div>

      <span className='timestamp'>
        {music.current ? currentTime : `-:--`} {/* change to if currentSong, not if music.current */}
      </span>

      <div id='timeline' ref={timeline} onClick={e => timeLineClicked(e)}>
        <div id='timeline_past' ref={timelinePast} />
        <div id='playhead' ref={playhead} />
      </div>

      <span className='timestamp'>
        {music.current ? msString(getDuration()) : `-:--`}
      </span>
    </Container>
  )
}

const Container = styled.section`
  background-color: ${props => props.theme.color4};
`;

// export default React.memo(MusicPlayer);
export default MusicPlayer
