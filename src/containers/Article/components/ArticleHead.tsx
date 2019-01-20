import OpenGraphs from 'components/OpenGraphs';
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

      <OpenGraphs
        title={title}
        type="article"
        url={buildAbsoluteUrl({ articleId: article.id })}
        description={articleDescription}
        updatedDate={article.date}
      />
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
