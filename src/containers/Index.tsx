import * as React from 'react';
import { withRouteData } from 'react-static';
import { Article } from './Article';
import { Heading } from '../style/components';
import { Margins } from '../style/constants';
import Markdown from '../components/Markdown';
import Section from '../components/Section';

interface Props {
  content: Article;
}

function Index({ content }: Props) {
  return (
    <Section>
      <Markdown html={content.html} />
    </Section>
  );
}

interface RouteData {
  article: Article;
}

export default withRouteData(({ article }: RouteData) => {
  return <Index content={article} />;
});
