import React from 'react';
import { Meta } from '../../../style/components';

interface Props {
  className?: string;
  value: string;
}

export default function ArticleMeta({ className, value }: Props) {
  return (
    <Meta>
      <div className={className}>{value}</div>
    </Meta>
  );
}
