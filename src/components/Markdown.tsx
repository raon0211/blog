import * as React from 'react';
import { Margins, Typography, Paddings, Colors } from '../style/constants';
import {
  headingCss,
  paragraphCss,
  linkCss,
  subheadingCss,
} from '../style/components';
import Prism from 'prismjs';
import css from '@emotion/css';

interface Props {
  className?: string;
  html: string;
}

export default class Markdown extends React.PureComponent<Props> {
  public componentDidMount() {
    Prism.highlightAll();
  }

  public render() {
    const { className, html } = this.props;

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
          '& p': paragraphCss,
          '& > p + p': Margins.top.medium,
          '& a': css`
            font-weight: 700;
            color: ${Colors.accent};
            text-decoration: none;
            &::after {
              content: ' ';
              display: inline-block;
              width: 10px;
              height: 9px;
              background: url(https://static.sojin.io/icons/link.svg);
              margin: 0 3px;
            }
          `,

          '& ul, & ol': [Paddings.left.large],
          '& > p + ul, & > p + ol': [Margins.vertical.medium],
          '& ul > li': [
            Margins.vertical.xSmall,
            Typography.text,
            {
              listStyleType: 'disc',
            },
          ],
          '& ol > li': [
            Margins.vertical.xSmall,
            Typography.text,
            {
              listStyleType: 'decimal',
            },
          ],
          '& p > img': [
            {
              maxWidth: '100%',
              margin: '0 auto',
              display: 'block',
              border: '1px solid #f0f0f0',
            },
          ],
          '& > blockquote': [
            Margins.vertical.xLarge,
            Paddings.left.medium,
            {
              borderLeft: '3px solid #e0e0e0',
            },
          ],
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}
