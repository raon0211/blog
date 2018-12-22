import * as React from 'react';
import { withRouteData } from 'react-static';
import { Heading } from '../style/components';
import Section from '../components/Section';
import Markdown from '../components/Markdown';

export interface Article {
  id: string;
  category: string[];
  html: string;
  date: Date;
}

interface Props {
  article: Article;
}

function Article({ article }: Props) {
  const { id, category, html } = article;

  return (
    <Section>
      <Heading>{id}</Heading>
      <Markdown html={html} />
    </Section>
  );
}

interface RouteData {
  article: Article;
}

export default withRouteData(({ article }: RouteData) => {
  return <Article article={article} />;
});
