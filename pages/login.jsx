import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import { useStore } from '../data/store';
import { useLogin } from '../hooks/auth';
import { COLORS } from '../aesthetics/aesthetics';

import LoadingScreen from '../components/LoadingScreen';
import PageWrapper from '../components/PageWrapper';
import { AuthWrapper, SplashTitle, Subtitle, Super, Tonic, AuthForm, Input, AltOptionsWrapper } from '../components/AuthPageComponents';
import { CallToAction, MainCallToAction } from '../components/CallToActionComponents';

const Login = () => {
  const router = useRouter();
  const { user } = useStore.getState()
  const { mutate, data, isLoading, isError, isIdle, error } = useLogin();

  const [unameOrEmail, setUnameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  //* if user is logged in, redirect to projects
  useEffect(() => {
    if (user) {
      router.push('/projects')
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()

    // LOGIN
    mutate({
      user: {
        unameOrEmail: unameOrEmail,
        password: password,
      }
    });
  };

  return (
    <PageWrapper className='login-page-wrapper'>
      {(!isIdle && !isError) && <LoadingScreen />}
      {(isIdle || isError) && (
        <AuthWrapper className='login-wrapper'>
          <SplashTitle>SuperTonic</SplashTitle>
          <Subtitle>
            the 
            <Super>super</Super> 
            <Tonic>tonic</Tonic> 
            for your next album workflow
          </Subtitle>

          <AuthForm onSubmit={handleSubmit}>
            <Input
              placeholder="username or email"
              type="text"
              name="username"
              value={unameOrEmail}
              onChange={e => setUnameOrEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <AltOptionsWrapper>
              <Link href='/signup'>
                <CallToAction 
                  initColor={COLORS.lavender}
                  hoverColor={COLORS.skyblue}
                >Sign Up</CallToAction>
              </Link>
              <Link href='/forgot_password'>
                <CallToAction
                  initColor={COLORS.lavender}
                  hoverColor={COLORS.flamingo}
                >Forgot Password?</CallToAction>
              </Link>
            </AltOptionsWrapper>

            <MainCallToAction 
              className='main-cta-button'
              placeholder="submit" 
              type="submit"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </MainCallToAction>
            
            {isError && <ErrorMsg>Error logging in :/</ErrorMsg>}
          </AuthForm>
        </AuthWrapper>
      )}
    </PageWrapper>
  );
}

const ErrorMsg = styled.span`
  color: red;
`;

export default Login;