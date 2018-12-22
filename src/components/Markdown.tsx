import * as React from 'react';
import { Margins, Typography, Paddings } from '../style/constants';

interface Props {
  className?: string;
  html: string;
}

export default function Markdown({ className, html }: Props) {
  return (
    <article
      className={className}
      css={{
        '& h1': [Margins.top.large, Margins.bottom.medium, Typography.title],
        '& p': [Margins.vertical.regular, Typography.text],
        '& a': [Typography.link],
        '& ul': [Margins.vertical.medium, Paddings.left.large],
        '& li': [
          Margins.vertical.regular,
          {
            listStyleType: 'disc',
          },
        ],
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
