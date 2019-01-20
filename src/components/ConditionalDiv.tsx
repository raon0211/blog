import React from 'react';

interface Props<Val> {
  className?: string;
  value: Val | undefined;
  formatter?: (value: Val) => React.ReactNode;
}

export default function ConditionalDiv<Val>({
  className,
  value,
  formatter = _ => _,
}: Props<Val>) {
  if (value === undefined) {
    return null;
  }

  return <div className={className}>{formatter(value)}</div>;
}
