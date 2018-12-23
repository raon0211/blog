import * as React from 'react';
import { withRouteData } from 'react-static';
import { Heading, Title } from '../style/components';
import Section from '../components/Section';
import Markdown from '../components/Markdown';
import { Margins, Typography } from '../style/constants';
import { Article } from '../models/Article';
import { Helmet } from 'react-helmet';

interface Props {
  article: Article;
}

function Article({ article }: Props) {
  const { id, category, html, markdown } = article;

  return (
    <Section>
      <Helmet>
        <title>{id}</title>
        <meta property="og:title" content={`${id} - Sojin Park`} />
        <meta property="og:description" content={markdown.slice(0, 50)} />
      </Helmet>
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
