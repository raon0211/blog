import React from 'react';
import { Margins } from '../style/constants';

interface Props {
  element?: 'section' | 'article';
  children: React.ReactNode;
}

export default function Section({
  element: Element = 'section',
  children,
}: Props) {
  return (
    <Element css={[Margins.horizontal.large, Margins.bottom.xxLarge]}>
      {children}
    </Element>
  );
}
