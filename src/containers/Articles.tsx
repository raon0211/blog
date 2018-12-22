import * as React from 'react';
import { withRouteData } from 'react-static';
import { Heading, Title, Subheading, Paragraph } from '../style/components';
import Section from '../components/Section';
import Markdown from '../components/Markdown';
import { Margins, Typography } from '../style/constants';
import { Article } from '../models/Article';
import { disassemble } from 'hangul-js';
import ArticleItem from '../components/ArticleItem';

interface Props {
  articles: Article[];
}

function Articles({ articles }: Props) {
  const articlesByFirstLetter = articles
    .map(article => [article.id, article] as [string, Article])
    .sort(([xTitle], [yTitle]) => xTitle.localeCompare(yTitle))
    .reduce<{ [firstLetter: string]: Article[] }>(
      (sortingArticles, [title, article]) => {
        const firstLetter = disassemble(title)[0];

        if (sortingArticles[firstLetter] === undefined) {
          sortingArticles[firstLetter] = [article];
        } else {
          sortingArticles[firstLetter].push(article);
        }

        return sortingArticles;
      },
      {}
    );

  return (
    <Section>
      <Title>글뭉치</Title>
      <Paragraph>현재 {articles.length}개의 글이 있습니다.</Paragraph>
      {Object.keys(articlesByFirstLetter).map(firstLetter => {
        const articles = articlesByFirstLetter[firstLetter];

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
  content: Article[];
}

export default withRouteData(({ content }: RouteData) => {
  return <Articles articles={content} />;
});
