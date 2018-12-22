import * as React from 'react';
import { Margins } from '../style/constants';

interface Props {
  children: React.ReactNode;
}

export default function Section({ children }: Props) {
  return (
    <section css={[Margins.vertical.medium, Margins.horizontal.regular]}>
      {children}
    </section>
  );
}
