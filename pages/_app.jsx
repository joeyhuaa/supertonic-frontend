import '../styles/globals.css'
import '../styles/index.scss'
import { THEME } from '../aesthetics/aesthetics'

import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Head from 'next/head'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'

import MusicPlayer from '../components/MusicPlayer'

import { useStore } from '../data/store'
import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  }
})

function MyApp({ Component, pageProps }) {
  const { user, currSong, setCurrProject, setCurrSong, setSongPlaying, closeModal } = useStore(state => ({
    user: state.user, 
    currSong: state.currSong,
    setCurrProject: state.setCurrProject,
    setCurrSong: state.setCurrSong,
    setSongPlaying: state.setSongPlaying,
    closeModal: state.closeModal
  }), shallow);

  const theme = THEME[user?.theme] || THEME['nocturne']; // todo - fix theme not loading correctly on first load

  const router = useRouter();

  //* when app loads, make sure song is not playing
  useEffect(() => {
    setSongPlaying(false);
  }, [])

  //* whenever the song changes, play iit
  useEffect(() => {
    setSongPlaying(true);
  }, [currSong])

  //* clear currProject if non-project link is clicked
  useEffect(() => {
    //! console.log('router.query',router.query)
    if (!router.query.projectsSlug) {
      setCurrProject(null); // global state
      closeModal();
    }
  }, [router.query])

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Head>
        <title>SuperTonic</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
          integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
          crossOrigin="anonymous"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
        <MusicPlayer />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

// todo - refactor this, some of it is not working
const GlobalStyle = createGlobalStyle`
  html {
    background-image: ${props => `linear-gradient(to bottom, ${props.theme?.color2}, ${props.theme?.color3} 25%)`};
    font-family: 'Graphik', sans-serif;
    font-weight: bold;
  }
  body {
    background-image: ${props => `linear-gradient(to bottom, ${props.theme?.color2}, ${props.theme?.color3} 25%)`};
  }
`;

const MainContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  background-image: ${props => `linear-gradient(to bottom, ${THEME[props.theme]?.color2}, ${THEME[props.theme]?.color3} 25%)`};
`;

export default MyApp
