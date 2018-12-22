import * as React from 'react';
import { Margins, Typography, Paddings } from '../style/constants';
import { headingCss, paragraphCss } from '../style/components';

interface Props {
  className?: string;
  html: string;
}

export default function Markdown({ className, html }: Props) {
  return (
    <article
      className={className}
      css={{
        '& h1': headingCss,
        '& p': paragraphCss,
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
