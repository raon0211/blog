import { navigate } from '@reach/router';
import Prism from 'prismjs';
import * as React from 'react';
import { headingCss, paragraphCss, subheadingCss } from '../style/components';
import { Margins, Paddings, Typography } from '../style/constants';

interface Props {
  className?: string;
  html: string;
}

export default class Markdown extends React.PureComponent<Props> {
  public articleRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    Prism.highlightAll();

    this.enableInternalNavigationInMarkdown();
  }

  public render() {
    const { className, html } = this.props;

    return (
      <article
        ref={this.articleRef}
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
          '& ul, & ol': [Paddings.left.large],
          '& > p + ul, & > p + ol': [Margins.vertical.medium],
          '& ul > li': [
            Margins.vertical.xxSmall,
            Typography.text,
            {
              listStyleType: 'disc',
            },
          ],
          '& ol > li': [
            Margins.vertical.xxSmall,
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
            Paddings.left.regular,
            {
              borderLeft: '3px solid #e0e0e0',
            },
          ],
          '& a[href^=\\/]': Typography.internalLink,
          '& a:not([href^=\\/])': Typography.externalLink,
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  private enableInternalNavigationInMarkdown = () => {
    const articleEl = this.articleRef.current;

    if (articleEl === null) {
      return;
    }

    articleEl.querySelectorAll('a.internal, a[href^=\\/]').forEach(anchor => {
      anchor.addEventListener('click', this.handleInternalAnchorClick);
    });
  };

  private handleInternalAnchorClick = (event: Event) => {
    event.preventDefault();

    const anchorEl = event.target! as HTMLAnchorElement;
    const link = anchorEl.getAttribute('href')!;

    navigate(link);
  };
}
