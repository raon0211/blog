import { format } from 'date-fns';
import * as React from 'react';
import { prefetch, withRouteData } from 'react-static';
import Markdown from '../../components/Markdown';
import Section from '../../components/Section';
import { ArticleEntity } from '../../models/Article';
import { Title } from '../../style/components';
import ArticleHead from './components/ArticleHead';
import ArticleMeta from './components/ArticleMeta';

interface Props {
  article: ArticleEntity;
}

class Article extends React.PureComponent<Props> {
  public componentDidMount() {
    Promise.all(this.props.article.externalLinks.map(prefetch));
  }

  public render() {
    const { article } = this.props;
    const { id, title, html } = article;

    return (
      <Section>
        <ArticleHead article={article} />
        <Title>
          {title}
          <ArticleMeta value={article.summary} css={{ fontSize: '1.1rem' }} />
          <ArticleMeta
            value={article.date}
            formatter={date => format(date, 'YYYY. M. D.')}
          />
        </Title>
        <Markdown html={html} />
      </Section>
    );
  }
}

interface RouteData {
  content: ArticleEntity;
}

export default withRouteData(({ content }: RouteData) => {
  return <Article article={content} />;
});
