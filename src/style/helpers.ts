import { mapValues } from 'lodash';

type CopiedStyle<T extends string> = { [styleKey in T]: number };

type MappedStyle<S extends object, T extends string> = {
  [sizeKey in keyof S]: string | number | CopiedStyle<T>
};

export function makeStyleFromSizes<
  S extends { [key: string]: string | number },
  T extends string
>(
  sizes: S,
  sizeMapper: (s: string | number) => string | number | CopiedStyle<T>
): MappedStyle<S, T> {
  return mapValues(sizes, size => {
    return sizeMapper(size);
  }) as any;
}

export function copyMapper<T extends string>(styleKeys: T[]) {
  return (size: string | number): CopiedStyle<T> => {
    return styleKeys
      .map((key: T) => ({
        [key as T]: size,
      }))
      .reduce((styles, style) => {
        return {
          ...styles,
          ...style,
        };
      }, {}) as any;
  };
}
