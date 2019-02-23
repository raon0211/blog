import { Link as ArticleLink } from '@reach/router';
import ConditionalDiv from 'components/ConditionalDiv';
import { format } from 'date-fns';
import { ArticleEntity } from 'models/Article';
import React, { useCallback, useEffect, useRef } from 'react';
import { Flex, Margins, Paddings, Typography } from '../style/constants';

interface Props {
  article: Pick<ArticleEntity, 'id' | 'title' | 'summary' | 'date'>;
}

export default function ArticleItem({ article }: Props) {
  const articleLink = `/article/${article.id}`;

  return (
    <article css={Margins.verticalList.xSmall}>
      <ArticleLink to={articleLink}>
        <header css={Flex.horizontal}>
          <ArticleTitle title={article.title} />{' '}
          <ArticleDate date={article.date} />
        </header>
        <ArticleSummary summary={article.summary} />
      </ArticleLink>
    </article>
  );
}

function ArticleTitle({ title }: { title: string }) {
  return (
    <h3
      css={[
        Paddings.vertical.xxSmall,
        Margins.vertical.xxSmall,
        Typography.oneLine,
        Typography.hideWithEllipsis,
        {
          fontSize: '1.05rem',
          fontWeight: 500,
          textDecoration: 'none',
        },
      ]}
    >
      {title}
    </h3>
  );
}

function ArticleDate({ date }: { date: Date | undefined }) {
  return (
    <ConditionalDiv
      value={date}
      formatter={d => format(d, 'YYYY. M. D.')}
      css={[
        Typography.secondaryTextSans,
        Typography.oneLine,
        Margins.left.regular,
      ]}
    />
  );
}

function ArticleSummary({ summary }: { summary?: string }) {
  return (
    <ConditionalDiv
      value={summary}
      css={[
        Typography.secondaryTextSans,
        Margins.bottom.regular,
        Paddings.left.xSmall,
      ]}
    />
  );
}
