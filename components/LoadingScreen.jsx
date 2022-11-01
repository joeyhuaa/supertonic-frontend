import React from 'react'
import styled from 'styled-components'

export default function LoadingScreen() {
  return (
    <Loading />
  )
}

const Loading = styled.div`
  position: absolute;
  top: calc(50% - 4em);
  left: calc(50% - 4em);
  width: 6em;
  height: 6em;
  border: 9px solid whitesmoke;
  border-left: 1.1em solid whitesmoke;
  border-radius: 50%;
  animation: loadspinner 1.1s infinite linear;

  @keyframes loadspinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;