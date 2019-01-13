import * as React from 'react';
import {
  Typography,
  Margins,
  Paddings,
  Borders,
  Sizes,
  Colors,
} from './constants';
import { Link as RouterLink } from '@reach/router';
import css from '@emotion/css';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const titleCss = [
  Typography.title,
  Margins.top.xxLarge,
  Margins.bottom.large,
  css`
    font-weight: 900;
  `,
];

export function Title({ className, children }: Props) {
  return (
    <h1 className={className} css={titleCss}>
      {children}
    </h1>
  );
}

export const metaCss = [
  Typography.textSans,
  { color: Colors.textSecondary },
  Margins.top.small,
];

export function Meta({ className, children }: Props) {
  return (
    <div className={className} css={metaCss}>
      {children}
    </div>
  );
}

export const headingCss = [
  Margins.top.xxLarge,
  Margins.bottom.medium,
  Paddings.bottom.small,
  Typography.h1,
  Borders.bottom,
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

export const linkCss = [Typography.internalLink];

interface LinkProps {
  className?: string;
  href: string;
}

export function Link({ href, ...props }: Props & LinkProps) {
  return <RouterLink to={href} css={linkCss} {...props} />;
}
