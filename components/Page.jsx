import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow';
import styled from 'styled-components';

import { ScaleLoader } from 'react-spinners';

import ModalController from './ModalController';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import MusicPlayer from './MusicPlayer';
import Overlay from './Overlay';

import { useStore } from '../data/store';

const Test = React.memo(() => {
  let currProject = useStore(state => state.currProject)
  console.log('Test')
  return (
    <h1>Test</h1>
  )
}, true)

export default function Page({ children }) {
  const router = useRouter();
  const { user, modalName } = useStore(state => ({
    user: state.user,
    modalName: state.modalName
  }), shallow);

  useEffect(() => {
    if (!user) {
      console.log('redirecting to login page...');
      router.push('/login')
    }
  }, [])

  return (
    <Wrapper>
      {/* <Test /> */}
      {modalName && <Overlay />}
      <ModalController />
      {!router.pathname.includes('shared') && <LeftSidebar />}
      {children}
      {router.pathname.includes('projects') && <RightSidebar />}
      <MusicPlayer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;