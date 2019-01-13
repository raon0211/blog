import * as React from 'react';
import { withRouteData, prefetch } from 'react-static';
import { Heading, Title, Meta } from '../style/components';
import Section from '../components/Section';
import Markdown from '../components/Markdown';
import { Margins, Typography } from '../style/constants';
import { ArticleEntity } from '../models/Article';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';

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
