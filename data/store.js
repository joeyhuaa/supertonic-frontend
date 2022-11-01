import create from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(persist(
  (set, get) => ({
    user: null,
    projects: null,
    currProject: null,
    currBranch: null,
    currSong: null,
    isSongPlaying: false,
    modalName: null,
    songsToUpload: [],
    songToUpdate: [],
    setUser: (user) => set({ user: user }),
    setCurrProjects: (projects) => set({ projects: projects }),
    setCurrProject: (project) => set({ currProject: project }),
    setCurrBranch: (branch) => set({ currBranch: branch }),
    setCurrSong: (song) => set({ currSong: song }),
    setSongPlaying: (isPlaying) => set({ isSongPlaying: isPlaying }),
    setSongsToUpload: (songs) => set({ songsToUpload: songs }),
    setSongToUpdate: (song) => set({ songToUpdate: song }),
    openModal: (modalName) => set({ modalName: modalName }),
    closeModal: () => set({ modalName: null }),
    playPause: () => set(prev => ({ isSongPlaying: !prev.isSongPlaying })),
  }),
  {
    name: 'supertonic-store'
  }
  // todo - blacklist isSongPlaying, and potentially other states?
))