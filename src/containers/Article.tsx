import * as React from 'react';
import { withRouteData, prefetch } from 'react-static';
import { Heading, Title } from '../style/components';
import Section from '../components/Section';
import Markdown from '../components/Markdown';
import { Margins, Typography } from '../style/constants';
import { ArticleEntity } from '../models/Article';
import { Helmet } from 'react-helmet';

interface Props {
  article: ArticleEntity;
}

class Article extends React.PureComponent<Props> {
  public componentDidMount() {
    Promise.all(this.props.article.externalLinks.map(prefetch));
  }

  public render() {
    const { article } = this.props;
    const { id, title, category, html, markdown } = article;

    return (
      <Section>
        <Helmet>
          <title>{title}</title>
          <meta property="og:title" content={`${id} - Sojin Park`} />
          <meta property="og:description" content={markdown.slice(0, 50)} />
        </Helmet>
        <Title>{title}</Title>
        <Markdown html={html} />
      </Section>
    );
  }
}

interface RouteData {
  content: ArticleEntity;
}

export default withRouteData(({ content }: RouteData) => {
  return <Article article={content} />;
});
