import * as React from 'react';
import { Margins, Flex, Typography, Paddings } from '../style/constants';
import { Link } from '../style/components';
import { format } from 'date-fns';
import { Article } from '../models/Article';

interface Props {
  article: Article;
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
          Paddings.vertical.small,
          Typography.oneLine as any,
          Typography.hideWithEllipsis,
        ]}
      >
        {article.id}
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
