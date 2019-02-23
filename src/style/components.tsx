import css from '@emotion/css';
import React from 'react';
import { Borders, Colors, Margins, Paddings, Typography } from './constants';

interface CommonProps {
  className?: string;
  children?: React.ReactNode;
}

export const titleCss = [
  Typography.title,
  Margins.top.xxLarge,
  Margins.bottom.large,
  css`
    font-weight: 900;
  `,
];

export function Title({ className, children }: CommonProps) {
  return (
    <h1 className={className} css={titleCss}>
      {children}
    </h1>
  );
}

export const metaCss = [
  Typography.textSans,
  { color: Colors.textSecondary },
  Paddings.vertical.small,
  Paddings.verticalList.none,
];

export function Meta({ className, children }: CommonProps) {
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

export function Heading({ className, children }: CommonProps) {
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

export function Subheading({ className, children }: CommonProps) {
  return (
    <h2 className={className} css={subheadingCss}>
      {children}
    </h2>
  );
}

export const heading3Css = [
  Typography.text,
  Margins.top.medium,
  Margins.bottom.small,
  { fontWeight: 700 },
];

export const paragraphCss = [
  Margins.vertical.none,
  Margins.verticalList.regular,
  Typography.text,
];

export function Paragraph({ className, children }: CommonProps) {
  return (
    <p className={className} css={paragraphCss}>
      {children}
    </p>
  );
}

export const listItemCss = [Margins.vertical.xxSmall, Typography.text];

export const listCss = [
  Paddings.left.large,
  css`
    p + & {
      ${Margins.vertical.medium}
    }
  `,
];

export const unorderedListCss = css`
  ${listCss};
  & > li {
    list-style-type: disc;
  }
`;

export const orderedListCss = css`
  ${listCss};
  & > li {
    list-style-type: decimal;
  }
`;

export const documentImageCss = css`
  max-width: 100%;
  margin: 0 auto;
  display: block;
  border: 1px solid #f0f0f0;
`;

export const blockquoteCss = css`
  ${Margins.vertical.xLarge};
  ${Paddings.left.regular};
  border-left: 3px solid #e0e0e0;
`;

export const documentCss = css`
  & h1 {
    ${headingCss};
  }

  & h2 {
    ${subheadingCss};
  }

  & h1 + h2 {
    ${Margins.top.large};
  }

  & h3 {
    ${heading3Css};
  }

  & p {
    ${paragraphCss};
  }

  & > p + p {
    ${Margins.top.medium};
  }

  & > p + ul,
  & > p + ol {
    ${Margins.vertical.medium};
  }

  & ul {
    ${unorderedListCss};
  }

  & ol {
    ${orderedListCss};
  }

  & li {
    ${listItemCss};
  }

  & p > img {
    ${documentImageCss};
  }

  & > blockquote {
    ${blockquoteCss};
  }

  & a[href^='\\/'] {
    ${Typography.internalLink};
  }

  & a:not([href^='\\/']) {
    ${Typography.externalLink};
  }

  & sup {
    vertical-align: top;
    font-size: 0.8em;
    margin: 0 0.1em;
  }

  & sup > * {
    vertical-align: top;
  }
`;
