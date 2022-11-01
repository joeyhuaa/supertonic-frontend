import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { useSignup } from '../hooks/auth';
import { COLORS } from '../aesthetics/aesthetics';

import LoadingScreen from '../components/LoadingScreen';
import PageWrapper from '../components/PageWrapper';
import { AuthWrapper, SplashTitle, Subtitle, Super, Tonic, AuthForm, Input, AltOptionsWrapper } from '../components/AuthPageComponents';
import { CallToAction, MainCallToAction } from '../components/CallToActionComponents';

const Signup = () => {
  const { mutate, isLoading, isError, isSuccess, isIdle, status } = useSignup();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('signup status', status)
  }, [status])

  const handleSubmit = (event) => {
    event.preventDefault()

    // SIGNUP
    mutate({
      user: {
        username: username,
        email: email,
        password: password,
      }
    });
  };

  return (
    <PageWrapper className='signup-page-wrapper'>
      {/* {(!isIdle && !isError) && <LoadingScreen />} */}
      {isLoading && <LoadingScreen />}
      {(isIdle || isError) && (
        <AuthWrapper className='signup-wrapper'>
          <SplashTitle>SuperTonic</SplashTitle>
          <Subtitle>
            the 
            <Super>super</Super> 
            <Tonic>tonic</Tonic> 
            for your next album workflow
          </Subtitle>

          <AuthForm onSubmit={handleSubmit}>
            <Input
              placeholder="email"
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              placeholder="username"
              type="text"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <AltOptionsWrapper>
              <Link href='/login'>
                <CallToAction 
                  initColor={COLORS.lavender}
                  hoverColor={COLORS.skyblue}
                >Login</CallToAction>
              </Link>
            </AltOptionsWrapper>

            <MainCallToAction 
              className='main-cta-button'
              placeholder="submit" 
              type="submit"
            >Sign Up</MainCallToAction>

            {isError && <ErrorMsg>Error signing up :/</ErrorMsg>}
          </AuthForm>
        </AuthWrapper>
      )}
    </PageWrapper>
  );
}

const ErrorMsg = styled.span`
  color: red;
`;

export default Signup;