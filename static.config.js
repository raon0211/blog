import path from 'path';
import marked from 'marked';
import grayMatter from 'gray-matter';

import aboutMarkdown from './contents/about.md';
import indexMarkdown from './contents/index.md';
import * as wikiArticleMarkdowns from './contents/wiki/*.md';

const wikiArticleIds = Object.keys(wikiArticleMarkdowns);

export default {
  plugins: ['react-static-plugin-typescript', 'react-static-plugin-emotion'],
  entry: path.join(__dirname, 'src', 'index.tsx'),
  extensions: ['.ts', '.tsx'],
  getRoutes,
};

function getRoutes() {
  const wikiArticles = getWikiArticles();

  const wikiRoutes = wikiArticles.map(article => {
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
          linkingIds: wikiArticleIds,
        }),
        recentArticles: wikiArticles
          .sort((x, y) => x.date - y.date)
          .slice(0, 20),
      }),
    },
    {
      path: '/about',
      component: 'src/containers/Article',
      getData: () => ({
        content: processMarkdown(aboutMarkdown, {
          id: '소개',
          linkingIds: wikiArticleIds,
        }),
      }),
    },
    {
      path: '/articles',
      component: 'src/containers/Articles',
      getData: () => ({
        content: wikiArticles,
      }),
    },
    ...wikiRoutes,
  ];
}

function getArticlePath(articleId) {
  return `/article/${articleId}`;
}

function getWikiArticles() {
  return wikiArticleIds.map(id => {
    const articleMarkdown = wikiArticleMarkdowns[id];
    return processMarkdown(articleMarkdown, {
      id: id,
      linkingIds: wikiArticleIds,
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
