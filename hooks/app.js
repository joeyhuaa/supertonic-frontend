import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useStore } from '../data/store'

export function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // mutable ref to store current callback

  const setStateCallback = useCallback((state, cb) => {
    cbRef.current = cb; // store passed callback to ref
    setState(state);
  }, []);

  useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}

export function useTheme() {
  return useQuery(
    ['theme'],
    async () => {
      let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/theme`)
      let { theme } = await res.json()
      return theme
    }
  )
}

export function useChangeTheme() {
  const queryClient = useQueryClient();
  const { setUser } = useStore.getState();

  return useMutation(
    data => axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/user/change_theme`, data).then(res => res.data),
    {
      onMutate: async ({ theme }) => {
        await queryClient.cancelQueries('theme')
        const prevTheme = queryClient.getQueryData('theme')
        queryClient.setQueryData('theme', theme)
        return { prevTheme }
      },
      onSettled: (user) => {
        console.log(`changed theme to ${user.theme}`);
        setUser(user);
      }
    }
  )
}