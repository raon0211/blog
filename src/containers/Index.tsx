import * as React from 'react';
import { withRouteData } from 'react-static';
import { Heading, Subheading, Link, Title } from '../style/components';
import { Margins, Typography, Flex } from '../style/constants';
import Markdown from '../components/Markdown';
import Section from '../components/Section';
import { format } from 'date-fns';
import ArticleItem from '../components/ArticleItem';
import { ArticleEntity } from '../models/Article';
import { Helmet } from 'react-helmet';
import Button, { ButtonStyles } from '../style/components/button';

interface Props {
  content: ArticleEntity;
  recentArticles: ArticleEntity[];
}

function Index({ content, recentArticles }: Props) {
  return (
    <>
      <Helmet>
        <title>Sojin Park</title>
      </Helmet>
      <Section>
        <Title>반가워요</Title>
        <Markdown html={content.html} />
        <div css={[Margins.top.xLarge]}>
          <Link css={ButtonStyles.primary} href="/about">
            소개 보기 &rarr;
          </Link>
          <Link css={ButtonStyles.secondary} href="/blog">
            끄적끄적 &rarr;
          </Link>
        </div>
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
  content: ArticleEntity;
  recentArticles: ArticleEntity[];
}

export default withRouteData(({ content, recentArticles }: RouteData) => {
  return <Index content={content} recentArticles={recentArticles} />;
});
