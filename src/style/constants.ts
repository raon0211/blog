import { mapValues } from 'lodash';
import { makeStyleFromSizes, copyMapper } from './helpers';

export const Sizes = {
  none: 0,
  xSmall: '0.25rem',
  small: '0.5rem',
  regular: '1rem',
  medium: '1.25rem',
  large: '2rem',
};

export const Colors = {
  text: '#333',
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
};

export const Typography = {
  text: {
    fontSize: Sizes.regular,
    color: Colors.text,
    fontWeight: 400,
    lineHeight: 1.6,
  },
  link: {
    fontSize: Sizes.regular,
    color: Colors.text,
    textDecoration: 'underline',
    fontWeight: 400,
    lineHeight: 1.6,
  },
  title: {
    fontSize: Sizes.medium,
    color: Colors.text,
    fontWeight: 700,
  },
};
