import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import lodash from 'lodash'

export function useSong(songId) {
  return useQuery(
    ['song', songId],
    async () => {
      let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/songs/${songId}`);
      return res.data;
    }
  )
}

export function useCreateSongs() {
  const queryClient = useQueryClient();

  return useMutation(
    data => axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${data.projectId}/add_songs`, data),
    {
      onSuccess: ({ data }) => {
        queryClient.invalidateQueries('projects')
        queryClient.setQueryData(['projects', { id: data.projId }], data)
      }
    }
  )
}

export function useDeleteSong() {
  const queryClient = useQueryClient()

  return useMutation(
    data => axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${data.projectId}/delete_song`, data),
    {
      onMutate: ({ songId, projectId, branchName }) => {
        let songIdToRemove = songId

        // optimistic update, remove song from project
        queryClient.setQueryData(['projects', projectId], old => {
          // clone the branches
          let branches = lodash.cloneDeep(old.branches)

          // find the branch
          let branch = branches.find(branch => branch.name === branchName)

          // find index of song to delete
          let songIndex = branch.songs.findIndex(song => song.id == songIdToRemove)

          // delete the song from the branch
          branch.songs.splice(songIndex, 1)

          // return
          return {
            ...old,
            branches: branches
          }
        })
      },
      onSettled: (data) => {
        queryClient.invalidateQueries(['projects', data.id])
      }
    }
  )
}

export function useUpdateSong() {
  const queryClient = useQueryClient()
  return useMutation(
    data => axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${data.projectId}/replace_song`, data),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('projects')
        queryClient.setQueryData(['projects', { id: data.id }], data)
      }
    }
  )
}