import styled from 'styled-components'
import { COLORS } from '../aesthetics/aesthetics';

export const AuthWrapper = styled.div`
  height: 400px;
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const AuthForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
  width: 100%;
`;

export const SplashTitle = styled.em`
  font-size: 60px;
  font-weight: bold;
  color: ${COLORS.lavender};
  text-shadow: 3px 3px 15px ${COLORS.lightPurple};
`;

export const Subtitle = styled.p`
  font-size: 14px;
  margin-top: 10px;
`;

export const Super = styled.em`
  color: ${COLORS.skyblue};
  margin-left: 5px;
`;

export const Tonic = styled.em`
  color: ${COLORS.flamingo};
  font-weight: bold;
  margin-right: 5px;
  margin-left: 3px;
`;

export const Input = styled.input`
  width: 85%;
  height: 30px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${COLORS.babyblue};
`;

export const AltOptionsWrapper = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  width: 85%;
  margin-bottom: 30px;
  margin-top: 5px;
`;