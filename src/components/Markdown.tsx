import * as React from 'react';
import { Margins, Typography, Paddings } from '../style/constants';
import {
  headingCss,
  paragraphCss,
  linkCss,
  subheadingCss,
} from '../style/components';

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
        '& h2': subheadingCss,
        '& h1 + h2': Margins.top.large,
        '& h3': [
          Typography.text,
          Margins.top.medium,
          Margins.bottom.small,
          { fontWeight: 700 },
        ],
        '& p + p': paragraphCss,
        '& a': linkCss,
        '& ul': [Paddings.left.large],
        '& > p + ul': [Margins.vertical.medium],
        '& li': [
          Margins.vertical.xSmall,
          Typography.text,
          {
            listStyleType: 'disc',
          },
        ],
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
