import React from 'react'
import styled from 'styled-components'

import { COLORS, THEME } from '../aesthetics/aesthetics'

import { useStore } from '../data/store'
import { useLogout } from '../hooks/auth'
import { useChangeTheme } from '../hooks/app'

import Page from '../components/Page'
import { CallToAction } from '../components/CallToActionComponents'

export default function Settings() {
  const { user } = useStore.getState()
  const theme = THEME[user?.theme] // typeof theme = object

  const setTheme = useChangeTheme()
  const logout = useLogout()

  let changeTheme = (newTheme) => {
    setTheme.mutate({ 
      userId: user.id,
      theme: newTheme 
    })
  }

  return (
    <Page>
      <SettingsWrapper>
        {theme && 
          <>
            <h1>Settings</h1>
            <br/>
            <OptionHeading>Theme</OptionHeading>
            <select 
              onChange={e => changeTheme(e.target.value)}
              defaultValue={user?.theme}
            >
              {Object.keys(THEME).map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <br/>
            <CallToAction
              onClick={() => logout.mutate()}
              initColor={COLORS.flamingo}
              hoverColor={COLORS.skyblue}
            >Sign Out</CallToAction>
          </>
        }
      </SettingsWrapper>
    </Page>
  )
}

const SettingsWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const OptionHeading = styled.h6`
  margin-bottom: 5px;
`;