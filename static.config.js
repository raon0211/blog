import * as articleMarkdowns from './contents/articles/*.md';
import path from 'path';
import marked from 'marked';
import grayMatter from 'gray-matter';

export default {
  plugins: ['react-static-plugin-typescript', 'react-static-plugin-emotion'],
  entry: path.join(__dirname, 'src', 'index.tsx'),
  extensions: ['.ts', '.tsx'],
  getRoutes,
};

function getRoutes() {
  const articles = getArticles();

  const articleRoutes = articles.map(article => {
    return {
      path: `article/${article.id}`,
      component: 'src/containers/Article',
      getData: () => ({ article }),
    };
  });

  return [
    {
      path: '/',
      component: 'src/containers/Index',
      getData: () => ({
        articles,
      }),
    },
    ...articleRoutes,
  ];
}

function getArticles() {
  const articleIds = Object.keys(articleMarkdowns);

  return articleIds.map(id => {
    const articleMarkdown = articleMarkdowns[id];
    return parseMarkdown(articleMarkdown, id);
  });
}

function parseMarkdown(markdown, id) {
  const { content, data } = grayMatter(markdown);
  const html = marked(content);

  return {
    content: html,
    id: decamelize(id),
    ...data,
  };
}

function decamelize(str) {
  return str.replace(/-/g, ' ');
}
