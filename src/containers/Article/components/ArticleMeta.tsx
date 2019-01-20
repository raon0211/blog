import ConditionalDiv from 'components/ConditionalDiv';
import React from 'react';
import { metaCss } from '../../../style/components';

interface Props<T> {
  className?: string;
  value?: T;
  formatter?: (val: T) => React.ReactNode;
}

export default function ArticleMeta<T>({
  className,
  value,
  formatter,
}: Props<T>) {
  if (value === undefined) {
    return null;
  }

  return (
    <ConditionalDiv
      className={className}
      value={value}
      formatter={formatter}
      css={metaCss}
    />
  );
}
