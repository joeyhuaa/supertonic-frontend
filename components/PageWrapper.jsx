import React from 'react';
import styled from "styled-components";

const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default React.memo(PageWrapper);
