import unescape from 'lodash/unescape';
import React from 'react';
import { Head } from 'react-static';
import { ArticleEntity } from '../../../models/Article';
import { buildAbsoluteUrl } from '../../../utils';

interface Props {
  article: ArticleEntity;
}

function ArticleHead({ article }: Props) {
  const { id, title } = article;

  const articleDescription = extractArticleDescription(article);

  return (
    <Head>
      <title>{title} - Sojin Park</title>

      <meta property="og:title" content={title} />
      <meta property="og:type" content="article" />
      <meta
        property="og:url"
        content={buildAbsoluteUrl({ articleId: article.id })}
      />
      <meta property="og:description" content={articleDescription} />
      {article.date !== undefined ? (
        <meta property="og:updated_time" content={article.date.toString()} />
      ) : null}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={id} />
      <meta name="twitter:description" content={articleDescription} />
      <meta name="twitter:creator" content="@chaevit" />
    </Head>
  );
}

export default React.memo(ArticleHead);

function extractArticleDescription({ html }: ArticleEntity) {
  const sanitizedHtml = html.replace(/<.+?>/g, '').trim();

  return unescape(sanitizedHtml)
    .replace(/\n/g, '')
    .slice(0, 200);
}
