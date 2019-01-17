import { format } from 'date-fns';
import * as React from 'react';
import { Link } from '../style/components';
import { Flex, Margins, Paddings, Typography } from '../style/constants';

interface Props {
  article: { id: string; title: string; date?: Date };
}

export default function ArticleItem({ article }: Props) {
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
      {article.date !== undefined && (
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
