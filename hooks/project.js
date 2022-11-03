import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useStore } from '../data/store'
import { useRouter } from 'next/router';

export function useProjects() {
  const { user, setCurrProjects } = useStore.getState();

  return useQuery(
    ['projects'],
    async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, { params: { userId: user.id } });
      return res.data;
    },
    {
      onSuccess: (data) => {
        console.log('projects:', data);
        // setCurrProjects(data);
      }
    }
  )
}

export function useProject(projectId, isShared) {
  const { user, setCurrProject } = useStore.getState()

  return useQuery(
    ['projects', projectId],
    async () => {
      //! const url = isShared ? `${process.env.NEXT_PUBLIC_API_URL}/api/shared/projects/${projectId}` : `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${projectId}`
      const res = await axios.post(url, { userId: user.id });
      return res.data;
    },
    {
      enabled: projectId !== null, // boolean
      onSuccess: data => {
        console.log(data);
        setCurrProject(data);
      }
    }
  )
}

export function useChangeProjectName() {
  const queryClient = useQueryClient()
  const { setCurrProject } = useStore.getState()

  return useMutation(
    data => axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${data.id}/change_name`, data),
    {
      onMutate: async projToBeUpdated => {
        await queryClient.cancelQueries('projects')
        let oldProj = queryClient.getQueryData(['projects', projToBeUpdated.id])

        // optimistic update project view
        queryClient.setQueryData(['projects', projToBeUpdated.id], old => ({
          ...old,
          name: projToBeUpdated.name
        }))

        // optimistic update LeftSidebar
        queryClient.setQueryData('projects', old => {
          let proj = old.find(p => p.id === projToBeUpdated.id)
          proj.name = projToBeUpdated.name
          return old;
        })

        return { oldProj }
      },
      onSettled: ({ data }) => {
        queryClient.invalidateQueries('projects') 
        queryClient.invalidateQueries(['projects', data.id])
        setCurrProject(data) // update state
      }
    }
  )
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  const { user } = useStore.getState()

  return useMutation(
    data => axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/new`, {...data, userId: user.id}),
    {
      onMutate: async newProject => {
        console.log(newProject)
        await queryClient.cancelQueries('projects')
        const prevProjects = queryClient.getQueryData('projects')
        queryClient.setQueryData('projects', old => [newProject, ...old])
        return { prevProjects }
      },
      onSettled: ({ data }) => {
        queryClient.invalidateQueries('projects')

        //* SETTING PROJECT IN CACHE AFTER CREATING IT
        queryClient.setQueryData(['projects', data.projId], data)
      }
    }
  )
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    project => axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${project.id}/destroy`, project).then(res => res.data),
    {
      onMutate: async project => {
        router.push('/projects');
        await queryClient.cancelQueries('projects')
        const prevProjects = queryClient.getQueryData('projects')
        queryClient.setQueryData('projects', old => old.filter(proj => proj.id != project.id))
        return { prevProjects }
      },
      onSuccess: () => {
        queryClient.invalidateQueries('projects') // refetch projects
      }
    }
  )
}

export function useCreateBranch() {
  const queryClient = useQueryClient()
  const { setCurrProject } = useStore.getState()

  return useMutation(
    (data) => axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${data.projId}/newbranch`, data),
    {
      onSettled: ({ data }) => {
        queryClient.invalidateQueries(['projects', data.id])
        setCurrProject(data) // update state
      }
    }
  )
}