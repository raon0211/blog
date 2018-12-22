import * as React from 'react';
import { withRouteData } from 'react-static';

export interface Article {
  id: string;
  category: string[];
  content: string;
}

interface Props {
  article: Article;
}

function Article({ article }: Props) {
  const { category, content } = article;

  return (
    <article>
      {category}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
}

interface RouteData {
  article: Article;
}

export default withRouteData(({ article }: RouteData) => {
  return <Article article={article} />;
});
