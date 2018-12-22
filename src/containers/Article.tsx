import * as React from 'react';
import { withRouteData } from 'react-static';
import { Heading, Title } from '../style/components';
import Section from '../components/Section';
import Markdown from '../components/Markdown';
import { Margins, Typography } from '../style/constants';
import { Article } from '../models/Article';

interface Props {
  article: Article;
}

function Article({ article }: Props) {
  const { id, category, html } = article;

  return (
    <Section>
      <Title>{id}</Title>
      <Markdown html={html} />
    </Section>
  );
}

interface RouteData {
  content: Article;
}

export default withRouteData(({ content }: RouteData) => {
  return <Article article={content} />;
});
