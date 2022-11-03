import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useStore } from "../data/store";

export function useLogin() {
  const router = useRouter();
  const { setUser } = useStore.getState();

  return useMutation(
    ['login'],
    async (data) => {
      console.log(data);
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, data, { withCredentials: true });
      return res.data;
    },
    {
      onError: (error) => {
        console.log('useLogin error',error)
        return error;
      },
      onSuccess: (data) => {
        console.log('logged in!');
        console.log(data);
        setUser(data.user);

        // take user to projects page
        router.push('/projects');
      }
    }
  )
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setUser, setCurrSong } = useStore.getState();

  return useMutation(
    ['logout'],
    async () => {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/logout`, { withCredentials: true });
    },
    {
      onMutate: () => {
        console.log('logging out...');
        router.push('/login');

        // clear state
        setUser(null);
        setCurrSong(null);
      },
      onSuccess: () => {
        queryClient.clear() //clear memory
        console.log('logged out!');
      }
    }
  )
}

export function useSignup() {
  const router = useRouter();

  return useMutation(
    ['signup'],
    async (data) => {
      console.log(data)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, data, { withCredentials: true });
    },
    {
      onError: (error) => {
        return error
      },
      onSuccess: data => {
        console.log('signup success!');
        router.push('/login');
      }
    }
  )
}