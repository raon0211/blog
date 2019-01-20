import css from '@emotion/css';
import { copyMapper, makeStyleFromSizes } from './helpers';

export const Sizes = {
  none: 0,
  xxSmall: '0.3rem',
  xSmall: '0.5rem',
  small: '0.75rem',
  regular: '1rem',
  medium: '1.25rem',
  large: '1.5rem',
  xLarge: '2rem',
  xxLarge: '3.75rem',
};

export const Colors = {
  text: '#444',
  textSecondary: '#666',
  accentDark: '#1a75d5',
  accentMedium: '#1f7fe4',
  white: '#fff',
};

export const Margins = {
  top: makeStyleFromSizes(Sizes, copyMapper(['marginTop'])),
  bottom: makeStyleFromSizes(Sizes, copyMapper(['marginBottom'])),
  vertical: makeStyleFromSizes(
    Sizes,
    copyMapper(['marginTop', 'marginBottom'])
  ),
  left: makeStyleFromSizes(Sizes, copyMapper(['marginLeft'])),
  right: makeStyleFromSizes(Sizes, copyMapper(['marginRight'])),
  horizontal: makeStyleFromSizes(
    Sizes,
    copyMapper(['marginLeft', 'marginRight'])
  ),
  horizontalList: makeStyleFromSizes(
    Sizes,
    size => css`
      & + & {
        margin-left: ${size};
      }
    `
  ),
  verticalList: makeStyleFromSizes(
    Sizes,
    size => css`
      & + & {
        margin-top: ${size};
      }
    `
  ),
};

export const Paddings = {
  top: makeStyleFromSizes(Sizes, copyMapper(['paddingTop'])),
  bottom: makeStyleFromSizes(Sizes, copyMapper(['paddingBottom'])),
  vertical: makeStyleFromSizes(
    Sizes,
    copyMapper(['paddingTop', 'paddingBottom'])
  ),
  left: makeStyleFromSizes(Sizes, copyMapper(['paddingLeft'])),
  right: makeStyleFromSizes(Sizes, copyMapper(['paddingRight'])),
  horizontal: makeStyleFromSizes(
    Sizes,
    copyMapper(['paddingLeft', 'paddingRight'])
  ),
};

export const Flex = {
  horizontal: {
    display: 'flex',
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
  },
  spaceBetweenItems: {
    justifyContent: 'space-between',
  },
  alignItemsToCenter: {
    alignItems: 'center',
  },
};

const lineHeight = 1.75;
const letterSpacing = -0.3;

const titleLineHeight = 1.5;

const sans = `'Noto Sans KR', 'Noto Sans JP', sans-serif`;
const serif = `'Noto Serif KR', 'Noto Serif JP', serif`;

const text = {
  fontFamily: serif,
  fontSize: Sizes.regular,
  color: Colors.text,
  fontWeight: 400,
  lineHeight,
  letterSpacing,
};

const secondaryText = {
  fontFamily: serif,
  fontSize: Sizes.regular,
  color: Colors.textSecondary,
  fontWeight: 400,
  lineHeight,
  letterSpacing,
};

export const Typography = {
  text,
  textSans: {
    ...text,
    fontFamily: sans,
  },
  secondaryText,
  secondaryTextSans: {
    ...secondaryText,
    fontFamily: sans,
  },
  externalLink: css`
    font-weight: 700;
    color: ${Colors.accentDark};
    text-decoration: none;
    &::after {
      content: ' ';
      display: inline-block;
      width: 10px;
      height: 9px;
      background: url(https://static.sojin.io/icons/link.svg);
      margin: 0 3px;
    }
  `,
  internalLink: {
    color: Colors.text,
    textDecoration: 'underline',
  },
  title: {
    fontSize: Sizes.xLarge,
    color: Colors.text,
    fontWeight: 700,
    lineHeight: titleLineHeight,
    letterSpacing,
  },
  h1: {
    fontSize: Sizes.large,
    color: Colors.text,
    fontWeight: 700,
    lineHeight: titleLineHeight,
    letterSpacing,
  },
  h2: {
    fontSize: Sizes.medium,
    color: Colors.text,
    fontWeight: 700,
    lineHeight: titleLineHeight,
    letterSpacing,
  },
  oneLine: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  hideWithEllipsis: {
    textOverflow: 'ellipsis',
  },
};

export const Borders = {
  none: css`
    &::after {
      display: none;
    }
  `,
  bottom: css`
    position: relative;
    overflow: hidden;

    &::after {
      position: absolute;
      content: ' ';
      border-bottom: 1px solid #f0f0f0;
      width: 100vw;
      bottom: 0;
      left: 0;
    }
  `,
};

export const Containers = {
  wrap: css`
    max-width: 900px;
    margin: 0 auto;
  `,
};
