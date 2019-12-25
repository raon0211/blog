import { format } from 'date-fns';
import grayMatter from 'gray-matter';
import { disassemble } from 'hangul-js';
import * as katex from 'katex';
import marked from 'marked';
import path from 'path';
import aboutMarkdown from './contents/about.md';
import * as blogArticleMarkdowns from './contents/blog/*.md';
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
    <Html lang="ko">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta content="IE=edge,chrome=1" httpEquiv="X-UA-Compatible" />
        <link
          href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700,900|Noto+Sans+JP:400,500,700,900|Noto+Serif+JP:400,700|Noto+Serif+KR:400,700"
          rel="stylesheet"
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
          title: 'Jin',
          linkMap: wikiLinkMap,
        }),
        recentArticles: [...blogArticles, ...wikiArticles]
          .sort((x, y) => y.date - x.date)
          .map(({ id, summary, date, title }) => ({
            id,
            summary,
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
          title: '소개',
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
    {
      path: '404',
      component: 'src/containers/404',
    },
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
  return Object.keys(markdowns).map(title => {
    const articleMarkdown = markdowns[title];
    return createArticle(articleMarkdown, {
      title,
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

function createArticle(markdown, { title, linkMap }) {
  const articleId = formatArticleId(title);

  const { content, data } = grayMatter(markdown);
  const { html, linkedArticleIds } = linkContent(
    marked(processFormulas(content)),
    articleId,
    linkMap
  );

  return {
    html,
    id: articleId,
    title: decamelize(title),
    summary: data.summary,
    markdown,
    ...data,
    date: data.date ? new Date(data.date) : undefined,
    url: getArticlePath(articleId),
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

function convertTranslatedWord(content) {
  return content.replace(
    /\^([^<>]+?)\^/g,
    (_, translatedWord) => `<sup>${translatedWord}</sup>`
  );
}

function chain(...fns) {
  return input =>
    fns.reduce((prevOutput, currentFn) => currentFn(prevOutput), input);
}

function processFormulas(content) {
  return chain(
    convertDisplayFormula,
    convertInlineFormula,
    convertTranslatedWord
  )(content);
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
  if (data.keywords == undefined) {
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

function formatArticleId(title) {
  return title
    .trim()
    .toLocaleLowerCase()
    .replace(/\_/g, '-');
}
