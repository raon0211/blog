import path from 'path';
import marked from 'marked';
import grayMatter from 'gray-matter';

import aboutMarkdown from './contents/about.md';
import indexMarkdown from './contents/index.md';
import * as wikiArticleMarkdowns from './contents/wiki/*.md';

const wikiLinkMap = createLinkMap(wikiArticleMarkdowns);

export default {
  plugins: ['react-static-plugin-typescript', 'react-static-plugin-emotion'],
  entry: path.join(__dirname, 'src', 'index.tsx'),
  extensions: ['.ts', '.tsx'],
  getRoutes,
};

function getRoutes() {
  const wikiArticles = getWikiArticles(wikiArticleMarkdowns);

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
          linkMap: wikiLinkMap,
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
          linkMap: wikiLinkMap,
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

function getWikiArticles(markdowns) {
  return Object.keys(markdowns).map(id => {
    const articleMarkdown = markdowns[id];
    return processMarkdown(articleMarkdown, {
      id: id,
      linkMap: wikiLinkMap,
    });
  });
}

function processMarkdown(markdown, { id, linkMap }) {
  const { content, data } = grayMatter(markdown);
  const html = marked(linkContent(content, linkMap));

  return {
    html,
    id: decamelize(id),
    ...data,
    date: new Date(data.date),
  };
}

function createLinkMap(markdowns) {
  return Object.keys(markdowns)
    .map(articleId => {
      const markdown = markdowns[articleId];
      const { data } = grayMatter(markdown);
      const keywords = [articleId, ...extractKeywords(data)];

      return [articleId, keywords];
    })
    .reduce((map, [articleId, nextKeywords]) => {
      nextKeywords.forEach(keyword => {
        map[keyword] = articleId;
      });

      return map;
    }, {});
}

function extractKeywords(data) {
  if (data.keywords === undefined) {
    return [];
  }

  return data.keywords.split(',').map(x => x.trim());
}

function linkContent(content, linkMap) {
  return Object.keys(linkMap).reduce((linkingContent, keyword) => {
    return linkingContent.replace(
      new RegExp(`\\s${keyword}`, 'g'),
      ` [${keyword}](${getArticlePath(linkMap[keyword])})`
    );
  }, content);
}

function decamelize(str) {
  return str.replace(/-/g, ' ');
}
