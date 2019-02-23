import { navigate } from '@reach/router';
import Prism from 'prismjs';
import React from 'react';
import { documentCss } from '../style/components';

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
        css={documentCss}
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
