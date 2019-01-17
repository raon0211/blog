import { format } from 'date-fns';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { prefetch, withRouteData } from 'react-static';
import Markdown from '../components/Markdown';
import Section from '../components/Section';
import { ArticleEntity } from '../models/Article';
import { Meta, Title } from '../style/components';
import { buildAbsoluteUrl } from '../utils';

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
          <title>{title} - Sojin Park</title>
          <meta property="og:title" content={id} />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={buildAbsoluteUrl({ articleId: article.id })}
          />
          <meta
            property="og:description"
            content={markdown.replace(/^---(.|\n)+?---/g, '').slice(0, 50)}
          />
          {article.date !== undefined ? (
            <meta
              property="og:updated_time"
              content={article.date.toString()}
            />
          ) : null}
        </Helmet>
        <Title>
          {title}
          {article.date !== undefined ? (
            <Meta>{format(article.date, 'YYYY. M. D.')}</Meta>
          ) : null}
        </Title>

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
