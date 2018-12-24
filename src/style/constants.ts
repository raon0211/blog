import { mapValues } from 'lodash';
import { makeStyleFromSizes, copyMapper } from './helpers';
import css from '@emotion/css';

export const Sizes = {
  none: 0,
  xSmall: '0.3rem',
  small: '0.75rem',
  regular: '1rem',
  medium: '1.25rem',
  large: '1.5rem',
  xLarge: '2rem',
  xxLarge: '3.5rem',
};

export const Colors = {
  text: '#444',
  textSecondary: '#666',
  accent: '#3188ff',
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
    size => `& + & {
    margin-left: ${size};
  }`
  ),
  verticalList: makeStyleFromSizes(
    Sizes,
    size => `& + & {
    margin-top: ${size};
  }`
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

const serif = 'Noto Serif';

export const Typography = {
  text: {
    fontFamily: serif,
    fontSize: Sizes.regular,
    color: Colors.text,
    fontWeight: 500,
    lineHeight,
    letterSpacing,
  },
  secondaryText: {
    fontFamily: serif,
    fontSize: Sizes.regular,
    color: Colors.textSecondary,
    fontWeight: 400,
    lineHeight,
    letterSpacing,
  },
  link: {
    color: Colors.text,
    textDecoration: 'underline',
  },
  title: {
    fontSize: Sizes.large,
    color: Colors.text,
    fontWeight: 700,
    lineHeight: titleLineHeight,
    letterSpacing,
  },
  h1: {
    fontSize: Sizes.medium,
    color: Colors.text,
    fontWeight: 700,
    lineHeight: titleLineHeight,
    letterSpacing,
  },
  h2: {
    fontSize: '1.1rem',
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
  bottomIndented: css`
    position: relative;
    overflow: hidden;

    &::after {
      position: absolute;
      content: ' ';
      border-bottom: 1px solid #eee;
      width: 100vw;
      bottom: 0;
      left: 0;
    }
  `,
};
