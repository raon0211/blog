import { Link as RouterLink } from '@reach/router';
import { format } from 'date-fns';
import * as React from 'react';
import {
  Colors,
  Flex,
  Margins,
  Paddings,
  Typography,
} from '../style/constants';

interface Props {
  article: { id: string; title: string; summary?: string; date?: Date };
}

export default function ArticleItem({ article }: Props) {
  const hasSummary = article.summary !== undefined;

  return (
    <RouterLink
      to={`/article/${article.id}`}
      css={[
        { color: Colors.text, textDecoration: 'none', display: 'block' },
        Margins.verticalList.xSmall,
      ]}
    >
      <div
        css={[Flex.horizontal, Flex.spaceBetweenItems, Flex.alignItemsToCenter]}
      >
        <div
          css={[
            Paddings.vertical.xxSmall,
            Margins.vertical.xxSmall,
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
        </div>{' '}
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
            Paddings.left.xSmall,
          ]}
        >
          {article.summary}
        </div>
      ) : null}
    </RouterLink>
  );
}
