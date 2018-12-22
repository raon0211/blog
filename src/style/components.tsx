import * as React from 'react';
import { Typography } from './constants';

interface Props {
  children: React.ReactNode;
}

export function Heading({ children }: Props) {
  return <h1 css={Typography.title}>{children}</h1>;
}

export function Paragraph({ children }: Props) {
  return <p css={Typography.text}>{children}</p>;
}
