import { format } from 'date-fns';
import React from 'react';
import { prefetch, withRouteData } from 'react-static';
import Markdown from '../../components/Markdown';
import Section from '../../components/Section';
import { ArticleEntity } from '../../models/Article';
import { Title, metaCss } from '../../style/components';
import ArticleHead from './components/ArticleHead';
import ArticleMeta from './components/ArticleMeta';
import { Flipped } from 'react-flip-toolkit';
import styled from '@emotion/styled';
import FadeInOut from 'components/FadeIn';
import OpenGraphs from 'components/OpenGraphs';

interface Props {
  article: ArticleEntity;
}

class Article extends React.PureComponent<Props> {
  public componentDidMount() {
    Promise.all(this.props.article.externalLinks.map(prefetch));
  }

  public render() {
    const { article } = this.props;
    const { title, html, summary = '', url, date } = article;

    return (
      <Section element="article">
        <OpenGraphs
          title={title}
          description={summary}
          url={url}
          updatedDate={date}
        />
        <ArticleHead article={article} />
        <Title>
          <Flipped flipId={title}>
            <TitleContainer>{title}</TitleContainer>
          </Flipped>
          <Flipped flipId={article.summary}>
            <SummaryContainer>{article.summary}</SummaryContainer>
          </Flipped>
          <FadeInOut>
            <ArticleMeta
              value={article.date}
              formatter={date => format(date, 'YYYY. M. D.')}
            />
          </FadeInOut>
        </Title>
        <FadeInOut>
          <Markdown html={html} />
        </FadeInOut>
      </Section>
    );
  }
}

const TitleContainer = styled.div`
  display: inline-block;
`;

const SummaryContainer = styled.div`
  ${metaCss};
  font-size: 1.1rem;
`;

interface RouteData {
  content: ArticleEntity;
}

export default withRouteData(({ content }: RouteData) => {
  return <Article article={content} />;
});
