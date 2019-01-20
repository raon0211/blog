import * as React from 'react';
import { Helmet } from 'react-helmet';
import { withRouteData } from 'react-static';
import ArticleItem from '../components/ArticleItem';
import Section from '../components/Section';
import { Heading, Paragraph, Title } from '../style/components';

interface Props {
  title: string;
  articles: {
    [key: string]: Array<{
      id: string;
      title: string;
      date: Date;
    }>;
  };
  count: number;
}

function Articles({ title, articles, count }: Props) {
  const sortedArticles = articles;

  return (
    <Section>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Title>{title}</Title>
      <Paragraph>현재 {count}개의 글이 있습니다.</Paragraph>
      {Object.keys(sortedArticles).map(firstLetter => {
        const articles = sortedArticles[firstLetter];

        return (
          <React.Fragment key={firstLetter}>
            <Heading>{firstLetter}</Heading>
            {articles.map(article => (
              <ArticleItem key={article.id} article={article} />
            ))}
          </React.Fragment>
        );
      })}
    </Section>
  );
}

interface RouteData {
  title: string;
  content: {
    [key: string]: Array<{
      id: string;
      title: string;
      date: Date;
    }>;
  };
  count: number;
}

export default withRouteData(({ title, content, count }: RouteData) => {
  return <Articles title={title} articles={content} count={count} />;
});
