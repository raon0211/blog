import path from 'path';
import marked from 'marked';
import grayMatter from 'gray-matter';

import aboutMarkdown from './contents/about.md';
import indexMarkdown from './contents/index.md';
import * as articleMarkdowns from './contents/articles/*.md';

const articleIds = Object.keys(articleMarkdowns);

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
      path: getArticlePath(article.id),
      component: 'src/containers/Article',
      getData: () => ({ content: article }),
    };
  });

  return [
    {
      path: '/',
      component: 'src/containers/Index',
      getData: () => ({
        content: processMarkdown(indexMarkdown, {
          id: 'index',
          linkingIds: articleIds,
        }),
        recentArticles: articles.sort((x, y) => x.date - y.date).slice(0, 10),
      }),
    },
    {
      path: '/about',
      component: 'src/containers/Article',
      getData: () => ({
        content: processMarkdown(aboutMarkdown, {
          id: '소개',
          linkingIds: articleIds,
        }),
      }),
    },
    ...articleRoutes,
  ];
}

function getArticlePath(articleId) {
  return `/article/${articleId}`;
}

function getArticles() {
  return articleIds.map(id => {
    const articleMarkdown = articleMarkdowns[id];
    return processMarkdown(articleMarkdown, {
      id: id,
      linkingIds: articleIds,
    });
  });
}

function processMarkdown(markdown, { id, linkingIds = [] }) {
  const { content, data } = grayMatter(markdown);
  const html = marked(linkContent(content, linkingIds));

  return {
    html,
    id: decamelize(id),
    ...data,
    date: new Date(data.date),
  };
}

function linkContent(content, linkingIds) {
  return linkingIds.reduce((linkingContent, linkingId) => {
    return linkingContent.replace(
      new RegExp(linkingId, 'g'),
      `[${linkingId}](${getArticlePath(linkingId)})`
    );
  }, content);
}

function decamelize(str) {
  return str.replace(/-/g, ' ');
}
