import * as React from 'react';
import { Margins, Typography, Paddings } from '../style/constants';
import {
  headingCss,
  paragraphCss,
  linkCss,
  subheadingCss,
} from '../style/components';
import Prism from 'prismjs';

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
          '& a': linkCss,
          '& ul, & ol': [Paddings.left.large],
          '& > p + ul': [Margins.vertical.medium],
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
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}
