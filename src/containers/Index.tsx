import * as React from 'react';
import { withRouteData } from 'react-static';
import { Article } from './Article';

interface Props {
  articles: Article[];
}

function Index({ articles }: Props) {
  console.log(articles);
  return (
    <article>
      {articles.map(({ id }) => (
        <a key={id} href={`/article/${id}`}>
          {id}
        </a>
      ))}
    </article>
  );
}

interface RouteData {
  articles: Article[];
}

export default withRouteData(({ articles }: RouteData) => {
  return <Index articles={articles} />;
});
