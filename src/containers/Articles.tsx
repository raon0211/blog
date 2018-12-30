import * as React from 'react';
import { withRouteData } from 'react-static';
import { Heading, Title, Subheading, Paragraph } from '../style/components';
import Section from '../components/Section';
import Markdown from '../components/Markdown';
import { Margins, Typography } from '../style/constants';
import { ArticleEntity } from '../models/Article';
import { disassemble } from 'hangul-js';
import ArticleItem from '../components/ArticleItem';
import { Helmet } from 'react-helmet';

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
              <ArticleItem
                key={article.id}
                article={article}
                shouldShowDate={false}
              />
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
