import { Link as RouterLink } from '@reach/router';
import ConditionalDiv from 'components/ConditionalDiv';
import { format } from 'date-fns';
import { ArticleEntity } from 'models/Article';
import * as React from 'react';
import { Flex, Margins, Paddings, Typography } from '../style/constants';

interface Props {
  article: Pick<ArticleEntity, 'id' | 'title' | 'summary' | 'date'>;
}

export default function ArticleItem({ article }: Props) {
  return (
    <RouterLink to={`/article/${article.id}`} css={Margins.verticalList.xSmall}>
      <div css={Flex.horizontal}>
        <ArticleTitle title={article.title} />{' '}
        <ArticleDate date={article.date} />
      </div>
      <ArticleSummary summary={article.summary} />
    </RouterLink>
  );
}

function ArticleTitle({ title }: { title: string }) {
  return (
    <div
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
    </div>
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
