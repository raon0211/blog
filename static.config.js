import path from 'path';
import marked from 'marked';
import grayMatter from 'gray-matter';

import aboutMarkdown from './contents/about.md';
import indexMarkdown from './contents/index.md';
import * as wikiArticleMarkdowns from './contents/wiki/*.md';
import * as blogArticleMarkdowns from './contents/blog/*.md';
import { disassemble } from 'hangul-js';
import { format } from 'date-fns';
import * as katex from 'katex';

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
          href="https://fonts.googleapis.com/css?family=Noto+Sans+KR|Noto+Sans+JP|Noto+Serif+JP|Noto+Serif+KR"
          rel="stylesheet"
        />

        <meta
          name="google-site-verification"
          content="Sf9XItb9NNczFyBi_dpjkdiCjN-5B5w1o-fCVtvwvfA"
        />

        {renderMeta.styleTags}
      </Head>
      <Body>{children}</Body>
    </Html>
  );
}

function getRoutes() {
  const wikiArticles = getArticles(wikiArticleMarkdowns);
  const blogArticles = getArticles(blogArticleMarkdowns);

  return [
    {
      path: '/',
      component: 'src/containers/Index',
      getData: () => ({
        content: createArticle(indexMarkdown, {
          id: 'Jin',
          linkMap: wikiLinkMap,
        }),
        recentArticles: [...blogArticles, ...wikiArticles]
          .sort((x, y) => y.date - x.date)
          .map(({ id, date, title }) => ({
            id,
            date,
            title,
          }))
          .slice(0, 20),
      }),
    },
    {
      path: '/about',
      component: 'src/containers/Article',
      getData: () => ({
        content: createArticle(aboutMarkdown, {
          id: '소개',
          linkMap: wikiLinkMap,
        }),
      }),
    },
    {
      path: '/articles',
      component: 'src/containers/Articles',
      getData: () => ({
        title: '글뭉치',
        count: wikiArticles.length,
        content: createFirstCharToArticleMap(wikiArticles),
      }),
    },
    {
      path: '/blog',
      component: 'src/containers/Articles',
      getData: () => ({
        title: '끄적끄적',
        count: blogArticles.length,
        content: createDateToArticleMap(blogArticles),
      }),
    },
    ...getArticleRoutes(wikiArticles),
    ...getArticleRoutes(blogArticles),
  ];
}

function getMapWithItemAdded(map, { key, item }) {
  const list = map[key] !== undefined ? map[key] : [];

  return {
    ...map,
    [key]: [...list, item],
  };
}

function createFirstCharToArticleMap(articles) {
  return articles
    .map(article => [article.id, article])
    .sort(([xTitle], [yTitle]) => xTitle.localeCompare(yTitle))
    .reduce((sortingArticles, [title, article]) => {
      const firstLetter = disassemble(title)[0];

      return getMapWithItemAdded(sortingArticles, {
        key: firstLetter,
        item: article,
      });
    }, {});
}

function createDateToArticleMap(articles) {
  return articles
    .sort((x, y) => y.date - x.date)
    .reduce((sortingArticles, article) => {
      return getMapWithItemAdded(sortingArticles, {
        key: format(article.date, 'YYYY. M.'),
        item: article,
      });
    }, {});
}

function getArticlePath(articleId) {
  return `/article/${articleId}`;
}

function getArticles(markdowns) {
  return Object.keys(markdowns).map(id => {
    const articleMarkdown = markdowns[id];
    return createArticle(articleMarkdown, {
      id: id,
      linkMap: wikiLinkMap,
    });
  });
}

function getArticleRoutes(articles) {
  return articles.map(article => {
    return {
      path: getArticlePath(article.id),
      component: 'src/containers/Article',
      getData: () => ({
        content: article,
      }),
    };
  });
}

function createArticle(markdown, { id, linkMap }) {
  const { content, data } = grayMatter(markdown);
  const { html, linkedArticleIds } = linkContent(
    marked(processFormulas(content)),
    id,
    linkMap
  );

  return {
    html,
    id,
    title: decamelize(id),
    markdown,
    ...data,
    date: new Date(data.date),
    externalLinks: linkedArticleIds.map(getArticlePath),
  };
}

function convertInlineFormula(content) {
  return content.replace(/\$(.+?)\$/g, (_, p1) => katex.renderToString(p1));
}

function convertDisplayFormula(content) {
  return content.replace(/\$\$((.|\r|\n)+?)\$\$/g, (_, p1) =>
    katex.renderToString(p1, {
      displayMode: true,
    })
  );
}

function chain(...fns) {
  return input =>
    fns.reduce((prevOutput, currentFn) => currentFn(prevOutput), input);
}

function processFormulas(content) {
  return chain(convertDisplayFormula, convertInlineFormula)(content);
}

function createLinkMap(markdowns) {
  return Object.keys(markdowns)
    .map(articleId => {
      const markdown = markdowns[articleId];
      const { data } = grayMatter(markdown);
      const keywords = [decamelize(articleId), ...extractKeywords(data)];

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

function linkContent(html, id, linkMap) {
  return Object.keys(linkMap).reduce(
    ({ html, linkedArticleIds }, keyword) => {
      const keywordRegex = new RegExp(`(\\s|>)${keyword}`, 'g');

      if (id === linkMap[keyword] || !keywordRegex.test(html)) {
        return { html, linkedArticleIds };
      }

      return {
        html: html.replace(
          keywordRegex,
          `$1<a href="${getArticlePath(linkMap[keyword])}">${keyword}</a>`
        ),
        linkedArticleIds: [...linkedArticleIds, keyword],
      };
    },
    { html, linkedArticleIds: [] }
  );
}

function decamelize(str) {
  return str.replace(/\_/g, ' ');
}
