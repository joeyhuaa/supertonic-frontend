import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { BsChevronRight, BsChevronLeft } from 'react-icons/bs'

import { THEME, COLORS } from '../aesthetics/aesthetics'
import Context from './Context'

import IconClickable from '../molecules/IconClickable'
import Clickable from '../molecules/Clickable'

import { useStore } from '../data/store'

export default function RightSidebar() {
  const router = useRouter();
  const { user } = useStore.getState();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarWrapper id='rightsidebar' isOpen={isOpen}>
      <div id={isOpen ? 'top' : null} className='df'>
        {isOpen && <span>Edit History</span>}
        {isOpen && 
          <IconClickable 
            handleClick={() => setIsOpen(false)}
            icon={<BsChevronRight size={20} />}
            className='top-right-14'
          />
        }
        {!isOpen &&
          <IconClickable 
            handleClick={() => setIsOpen(true)}
            icon={<BsChevronLeft size={20} />}
            className='top-right-14'
          />
        }
      </div>
    </SidebarWrapper>
  )
}

const SidebarWrapper = styled.section`
  background-color: ${props => props.theme.color1};
  width: ${props => props.isOpen ? '300px' : '55px'};
`;