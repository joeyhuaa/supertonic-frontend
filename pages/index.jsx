import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import shallow from 'zustand/shallow'
import axios from 'axios';
import Link from 'next/link'

import { useStateCallback } from '../hooks/app';
import { useStore } from '../data/store';

import PageWrapper from '../components/PageWrapper';

/**
 * TODOs - 
 * * 1. redirect user to /projects after logging in
 * * 2. check if user is logged in when loading the app (check for cookie), and if so, skip the home screen and take them in to /projects
 */

// ! why does user sometimes disappear from the store after logging in??? leading to error loading projects...

export default function Home() {
  const router = useRouter();
  const { user, setUser } = useStore(state => ({
    user: state.user,
    setUser: state.setUser,
  }), shallow);

  // useEffect(() => {
  //   loginStatus();
  // }, [])

  useEffect(() => {
    // todo - display LoadingScreen so the homepage doesn't flash
    if (user) {
      console.log('user session still alive, redirecting...');
      router.push('/projects')
    } 
  }, [])

  async function loginStatus () {
    const res = await axios.get('http://localhost:4000/logged_in', { withCredentials: true });
    const { user } = res.data;
    if (user) {
      //* put user in store
      setUser(user);
    }
    console.log(res.data);
  }

  return (
    <PageWrapper>
      <h1>Welcome to SuperTonic</h1>
      <Link href='/login'>Log In</Link>
      <Link href='/signup'>Sign Up</Link>
    </PageWrapper>
  )
}
