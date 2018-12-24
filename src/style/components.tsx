import * as React from 'react';
import { Typography, Margins, Paddings, Borders } from './constants';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const titleCss = [
  Typography.title,
  Margins.top.xxLarge,
  Margins.bottom.xLarge,
];

export function Title({ className, children }: Props) {
  return (
    <h1 className={className} css={titleCss}>
      {children}
    </h1>
  );
}

export const headingCss = [
  Margins.top.xxLarge,
  Margins.bottom.medium,
  Paddings.bottom.xSmall,
  Typography.h1,
  Borders.bottomIndented,
];

export function Heading({ className, children }: Props) {
  return (
    <h1 className={className} css={headingCss}>
      {children}
    </h1>
  );
}

export const subheadingCss = [
  Margins.top.xLarge,
  Margins.bottom.regular,
  Typography.h2,
];

export function Subheading({ className, children }: Props) {
  return (
    <h2 className={className} css={subheadingCss}>
      {children}
    </h2>
  );
}

export const paragraphCss = [
  Margins.vertical.none,
  Margins.verticalList.regular,
  Typography.text,
];

export function Paragraph({ className, children }: Props) {
  return (
    <p className={className} css={paragraphCss}>
      {children}
    </p>
  );
}

export const linkCss = [Typography.link];

interface LinkProps {
  className?: string;
  href: string;
}

export function Link(props: Props & LinkProps) {
  return <a css={linkCss} {...props} />;
}
