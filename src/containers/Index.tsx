import OpenGraphs from 'components/OpenGraphs';
import * as React from 'react';
import { Head, withRouteData } from 'react-static';
import { InternalLink } from 'style/components/internalLink';
import ArticleItem from '../components/ArticleItem';
import Markdown from '../components/Markdown';
import Section from '../components/Section';
import { ArticleEntity } from '../models/Article';
import { Heading, Title } from '../style/components';
import { ButtonStyles } from '../style/components/button';
import { Margins } from '../style/constants';

const siteDescription =
  '웹 생태계와 함수형 프로그래밍을 사랑하는 개발자의 글 묶음';

interface Props {
  content: ArticleEntity;
  recentArticles: ArticleEntity[];
}

function Index({ content, recentArticles }: Props) {
  return (
    <>
      <Head>
        <meta name="description" content={siteDescription} />

        <OpenGraphs
          title="Sojin Park"
          type="article"
          url="https://sojin.io"
          description={siteDescription}
        />
        <title>Sojin Park</title>
      </Head>
      <Section>
        <Title>반가워요</Title>
        <Markdown html={content.html} />
        <div css={[Margins.top.xLarge]}>
          <InternalLink css={ButtonStyles.primary} href="/about">
            소개 보기 &rarr;
          </InternalLink>
          <InternalLink css={ButtonStyles.secondary} href="/blog">
            끄적끄적 &rarr;
          </InternalLink>
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
