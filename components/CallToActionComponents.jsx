import styled from 'styled-components'
import { COLORS } from '../aesthetics/aesthetics';

export const CallToAction = styled.span`
  color: ${props => props.initColor};
  cursor: pointer;

  transition: .5s;
  :hover {
    color: ${props => props.hoverColor};
  }
`;

export const MainCallToAction = styled.button`
  width: 85%;
  height: 40px;
  background-color: ${COLORS.skyblue};

  transition: .2s;
  :hover {
    background-color: ${COLORS.lightPurple};
    box-shadow: 0 0 6px 3px ${COLORS.lavender};
  }
  :active {
    background-color: ${COLORS.midLightPurple};
  }
`;