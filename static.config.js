import indexMarkdown from './contents/index.md';
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
        article: getIndexContent(),
      }),
    },
    ...articleRoutes,
  ];
}

function getIndexContent() {
  return parseMarkdown(indexMarkdown, 'index');
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
    html,
    id: decamelize(id),
    ...data,
  };
}

function decamelize(str) {
  return str.replace(/-/g, ' ');
}
