import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import axios from 'axios'
import shallow from 'zustand/shallow'

import { useStore } from "../data/store";

//login 
export function useLogin() {
  const router = useRouter();
  const { setUser, setSongPlaying } = useStore.getState();

  return useMutation(
    ['login'],
    async (data) => {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, data, { withCredentials: true });
      return res.data;
    },
    {
      onError: (error) => {
        console.log('useLogin error',error)
        return error;
      },
      onSuccess: (data) => {
        setUser(data.user);
        setSongPlaying(false);

        // take user to projects page
        router.push('/projects');
      }
    }
  )
}

//logout
export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { clearAll } = useStore(state => ({ clearAll: state.clearAll }), shallow)

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
        clearAll(); //! not sure why isSongPlaying is still true sometimes...
      },
      onSuccess: () => {
        queryClient.clear() //clear memory
        console.log('logged out!');
      }
    }
  )
}

//signup for new account
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