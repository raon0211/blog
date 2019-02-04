declare module 'tinycolor2' {
  type ColorString = string;

  interface HSLColor {
    h: number;
    s: number;
    v: number;
    a: number;
  }

  interface HSVColor {
    h: number;
    s: number;
    v: number;
    a: number;
  }

  interface RGBColor {
    r: number;
    g: number;
    b: number;
    a: number;
  }

  interface TinyColor<
    Input extends ColorString | RGBColor | HSVColor | HSLColor
  > {
    getFormat(): 'name' | 'rgb';
    getOriginalInput(): Input;
    isValid(): boolean;
    getBrightness(): number;
    isLight(): boolean;
    isDark(): boolean;
    getLuminance(): number;
    getAlpha(): number;
    setAlpha(alpha: number): TinyColor<RGBColor>;
    toHsv(): HSVColor;
    toHsvString(): string;
    toHsl(): HSLColor;
    toHslString(): string;
    toHex(): string;
    toHexString(): string;
    toHex8(): string;
    toHex8String(): string;
    toRgb(): RGBColor;
    toRgbString(): string;
    lighten(amount?: number): TinyColor<Input>;
    brighten(amount?: number): TinyColor<Input>;
    darken(amount?: number): TinyColor<Input>;
    saturate(amount?: number): TinyColor<Input>;
    greyscale(): TinyColor<Input>;
    spin(degrees?: number): TinyColor<Input>;
    toString(
      format?:
        | 'rgb'
        | 'prgb'
        | 'hex6'
        | 'hex3'
        | 'hex8'
        | 'name'
        | 'hsl'
        | 'hsv'
    ): string;
  }

  interface TinyColorConstructor {
    <Input extends ColorString | RGBColor | HSVColor | HSLColor>(
      colorStr: Input
    ): TinyColor<Input>;
    random(): TinyColor<ColorString>;
  }

  const constructor: TinyColorConstructor;

  export default constructor;
}
