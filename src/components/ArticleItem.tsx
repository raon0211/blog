import * as React from 'react';
import { Margins, Flex, Typography, Paddings } from '../style/constants';
import { Link } from '../style/components';
import { format } from 'date-fns';

interface Props {
  article: { id: string; title: string; date: Date };
  shouldShowDate?: boolean;
}

export default function ArticleItem({ article, shouldShowDate = true }: Props) {
  return (
    <div
      key={article.id}
      css={[Flex.horizontal, Flex.spaceBetweenItems, Flex.alignItemsToCenter]}
    >
      <Link
        href={`/article/${article.id}`}
        css={[
          Paddings.vertical.xSmall,
          Margins.vertical.xSmall,
          Typography.oneLine as any,
          Typography.hideWithEllipsis,
        ]}
      >
        {article.title}
      </Link>{' '}
      {shouldShowDate && (
        <span
          css={[
            Typography.secondaryText,
            Typography.oneLine as any,
            Margins.left.regular,
          ]}
        >
          {format(article.date, 'YYYY. M. D.')}
        </span>
      )}
    </div>
  );
}
