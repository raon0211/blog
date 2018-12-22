import * as React from 'react';
import { withRouteData } from 'react-static';
import { Article } from './Article';
import { Heading, Subheading, Link } from '../style/components';
import { Margins, Typography, Flex } from '../style/constants';
import Markdown from '../components/Markdown';
import Section from '../components/Section';
import { format } from 'date-fns';

interface Props {
  content: Article;
  recentArticles: Article[];
}

function Index({ content, recentArticles }: Props) {
  return (
    <>
      <Section>
        <Markdown html={content.html} />
      </Section>
      <Section>
        <Heading>최근 업데이트</Heading>
        {recentArticles.map(article => (
          <div
            key={article.id}
            css={[
              Margins.vertical.small,
              Flex.horizontal,
              Flex.spaceBetweenItems,
              Flex.alignItemsToCenter,
            ]}
          >
            <Link href={`/article/${article.id}`}>{article.id}</Link>{' '}
            <span css={Typography.secondaryText}>
              ({format(article.date, 'YYYY. M. D.')})
            </span>
          </div>
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
