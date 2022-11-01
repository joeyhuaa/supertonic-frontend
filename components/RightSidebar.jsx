import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MdSettings } from 'react-icons/md'
import { BsX } from 'react-icons/bs'

import { THEME, COLORS } from '../aesthetics/aesthetics'
import Context from './Context'

import IconClickable from '../molecules/IconClickable'
import Clickable from '../molecules/Clickable'

import { useStore } from '../data/store'
import { 
  useProjects, 
  useCreateProject, 
  useDeleteProject 
} from '../hooks/project'

export default function RightSidebar() {
  const router = useRouter();

  const { user } = useStore.getState();

  return (
    <SidebarWrapper id='rightsidebar'>
      <div id='top'>
        <span>Edit History</span>
      </div>
    </SidebarWrapper>
  )
}

const SidebarWrapper = styled.section`
  background-color: ${props => props.theme.color1};
`;