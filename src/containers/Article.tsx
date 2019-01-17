import { format } from 'date-fns';
import unescape from 'lodash/unescape';
import * as React from 'react';
import { Head, prefetch, withRouteData } from 'react-static';
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

    const pageDescription = unescape(html.replace(/<.+?>/g, '').trim())
      .replace(/\n/g, '')
      .slice(0, 200);

    return (
      <Section>
        <Head>
          <title>{title} - Sojin Park</title>
          <meta property="og:title" content={id} />
          <meta property="og:type" content="article" />
          <meta
            property="og:url"
            content={buildAbsoluteUrl({ articleId: article.id })}
          />
          <meta property="og:description" content={pageDescription} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content={id} />
          <meta name="twitter:description" content={pageDescription} />
          <meta name="twitter:creator" content="@chaevit" />
          {article.date !== undefined ? (
            <meta
              property="og:updated_time"
              content={article.date.toString()}
            />
          ) : null}
        </Head>
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
