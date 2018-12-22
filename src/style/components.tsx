import * as React from 'react';
import { Typography, Margins } from './constants';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const headingCss = [
  Margins.top.large,
  Margins.bottom.medium,
  Typography.title,
];

export function Heading({ className, children }: Props) {
  return (
    <h1 className={className} css={headingCss}>
      {children}
    </h1>
  );
}

export const subheadingCss = [
  Margins.top.large,
  Margins.bottom.regular,
  Typography.subtitle,
];

export function Subheading({ className, children }: Props) {
  return (
    <h2 className={className} css={subheadingCss}>
      {children}
    </h2>
  );
}

export const paragraphCss = [Margins.vertical.regular, Typography.text];

export function Paragraph({ className, children }: Props) {
  return (
    <p className={className} css={paragraphCss}>
      {children}
    </p>
  );
}

export const linkCss = [Typography.link];

interface LinkProps {
  href: string;
}

export function Link(props: Props & LinkProps) {
  return <a css={linkCss} {...props} />;
}
