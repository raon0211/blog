import { format } from 'date-fns';
import * as React from 'react';
import { Link } from '../style/components';
import { Flex, Margins, Paddings, Typography } from '../style/constants';

interface Props {
  article: { id: string; title: string; summary?: string; date?: Date };
}

export default function ArticleItem({ article }: Props) {
  const hasSummary = article.summary !== undefined;

  return (
    <div css={Margins.verticalList.mediumSmall}>
      <div
        css={[Flex.horizontal, Flex.spaceBetweenItems, Flex.alignItemsToCenter]}
      >
        <Link
          href={`/article/${article.id}`}
          css={[
            Paddings.vertical.xSmall,
            Margins.vertical.xSmall,
            Typography.oneLine as any,
            Typography.hideWithEllipsis,
            {
              fontSize: '1.05rem',
              fontWeight: 500,
              textDecoration: 'none',
            },
          ]}
        >
          {article.title}
        </Link>{' '}
        {article.date !== undefined ? (
          <span
            css={[
              Typography.secondaryTextSans,
              Typography.oneLine as any,
              Margins.left.regular,
            ]}
          >
            {format(article.date, 'YYYY. M. D.')}
          </span>
        ) : null}
      </div>
      {hasSummary ? (
        <div
          css={[
            Typography.secondaryTextSans,
            Margins.bottom.regular,
            Paddings.left.regular,
          ]}
        >
          {article.summary}
        </div>
      ) : null}
    </div>
  );
}
