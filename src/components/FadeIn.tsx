import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import posed from 'react-pose';

interface Props {
  children: React.ReactNode;
}

function FadeInOut({ children }: Props) {
  return <Container>{children}</Container>;
}

export default React.memo(FadeInOut);

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Animation = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
});

const Container = styled(Animation)`
  opacity: 0;
  animation: ${fadeInAnimation} 0.2s ease forwards;
  animation-delay: 0.2s;
`;
