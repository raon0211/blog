import * as React from 'react';
import { withRouteData } from 'react-static';
import { Heading, Subheading, Link } from '../style/components';
import { Margins, Typography, Flex } from '../style/constants';
import Markdown from '../components/Markdown';
import Section from '../components/Section';
import { format } from 'date-fns';
import ArticleItem from '../components/ArticleItem';
import { Article } from '../models/Article';
import { Helmet } from 'react-helmet';

interface Props {
  content: Article;
  recentArticles: Article[];
}

function Index({ content, recentArticles }: Props) {
  return (
    <>
      <Helmet>
        <title>Sojin Park</title>
      </Helmet>
      <Section>
        <Markdown html={content.html} />
      </Section>
      <Section>
        <Heading>최근 업데이트</Heading>
        {recentArticles.map(article => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </Section>
    </>
  );
}

interface RouteData {
  content: Article;
  recentArticles: Article[];
}

export default withRouteData(({ content, recentArticles }: RouteData) => {
  return <Index content={content} recentArticles={recentArticles} />;
});
