import path from 'path';
import marked from 'marked';
import grayMatter from 'gray-matter';

import aboutMarkdown from './contents/about.md';
import indexMarkdown from './contents/index.md';
import * as wikiArticleMarkdowns from './contents/wiki/*.md';

const siteRoot = '/';
const wikiLinkMap = createLinkMap(wikiArticleMarkdowns);

export default {
  siteRoot,
  plugins: ['react-static-plugin-typescript', 'react-static-plugin-emotion'],
  entry: path.join(__dirname, 'src', 'index.tsx'),
  extensions: ['.ts', '.tsx'],
  getRoutes,
  paths: {
    public: path.join(__dirname, 'static'),
  },
  Document,
};

function Document({ Html, Head, Body, children, renderMeta }) {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible" />

        <meta property="og:title" content="Sojin Park" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sojin.me/" />
        <meta
          property="og:description"
          content="Sojin Park's personal website and blog"
        />

        <link
          href="https://fonts.googleapis.com/css?family=Noto+Sans+KR"
          rel="stylesheet"
        />

        {renderMeta.styleTags}
      </Head>
      <Body>{children}</Body>
    </Html>
  );
}

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
          id: 'Jin',
          linkMap: wikiLinkMap,
        }),
        recentArticles: wikiArticles
          .sort((x, y) => y.date - x.date)
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
  const html = linkContent(marked(content), id, linkMap);

  return {
    html,
    id: decamelize(id),
    markdown,
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

function linkContent(content, id, linkMap) {
  return Object.keys(linkMap).reduce((linkingContent, keyword) => {
    if (id === linkMap[keyword]) {
      return linkingContent;
    }

    return linkingContent.replace(
      new RegExp(`(\\s|>)${keyword}`, 'g'),
      `$1<a href="${getArticlePath(linkMap[keyword])}">${keyword}</a>`
    );
  }, content);
}

function decamelize(str) {
  return str.replace(/\_/g, ' ');
}
