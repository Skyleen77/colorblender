import type {
  HexColor,
  RgbColor,
  AnyColor,
  ColorWithAlpha,
  ColorWithoutAlpha,
  RgbaColor,
  HslaColor,
  HsvaColor,
} from './types';
import {
  alphaToHex,
  rgbToHex,
  rgbToHsl,
  round,
  roundColor,
  anyToRgba,
  brightness,
  contrast,
  darken,
  desaturate,
  grayscale,
  lighten,
  luminosity,
  negate,
  saturate,
  rgbToHsv,
} from './helpers';

export class Colorblender {
  readonly _internalValid: boolean;
  readonly _internalRgb: RgbColor;
  readonly _internalAlpha: number;

  constructor(input: AnyColor) {
    const rgba = anyToRgba(input);
    this._internalValid = rgba !== null;
    this._internalRgb = {
      r: rgba?.r ?? 0,
      g: rgba?.g ?? 0,
      b: rgba?.b ?? 0,
    };
    this._internalAlpha = rgba?.a ?? 1;
  }

  public _withAlpha(color: ColorWithoutAlpha): ColorWithAlpha {
    return {
      ...color,
      a: this._internalAlpha,
    };
  }

  public _getColorFormat(
    converter: (color: RgbColor) => Omit<AnyColor, string>,
    raw?: boolean,
  ) {
    return {
      ...(raw
        ? converter(this._internalRgb)
        : roundColor(converter(this._internalRgb))),
      a: raw ? this._internalAlpha : this.alpha(),
    };
  }

  public hex(): HexColor {
    const hexAlpha = alphaToHex(this._internalAlpha);
    return `#${rgbToHex(this._internalRgb)}${
      hexAlpha === 'FF' ? '' : hexAlpha
    }`;
  }

  public rgb(raw = false): RgbaColor {
    return this._getColorFormat((c) => c, raw) as RgbaColor;
  }

  public rgbNumber(): number {
    const { r, g, b } = this._internalRgb;
    return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
  }

  public hsl(raw = false): HslaColor {
    return this._getColorFormat(rgbToHsl, raw) as HslaColor;
  }

  public hsv(raw = false): HsvaColor {
    return this._getColorFormat(rgbToHsv, raw) as HsvaColor;
  }

  public isValid(): boolean {
    return this._internalValid;
  }

  public isDark(): boolean {
    return brightness(this._internalRgb) < 0.5;
  }

  public isLight(): boolean {
    return brightness(this._internalRgb) >= 0.5;
  }

  public isEqual(color: AnyColor | Colorblender): boolean {
    return this.hex() === colorblender(color).hex();
  }

  public brightness(raw = false): number {
    return raw
      ? brightness(this._internalRgb)
      : round(brightness(this._internalRgb), 2);
  }

  public alpha(): number;
  public alpha(value: number): Colorblender;
  public alpha(value?: number): number | Colorblender {
    if (typeof value === 'number')
      return colorblender({
        ...this._internalRgb,
        a: value,
      });
    return this._internalAlpha;
  }

  public hue(): number;
  public hue(value: number): Colorblender;
  public hue(value?: number): Colorblender | number {
    const hsl = rgbToHsl(this._internalRgb);
    if (typeof value === 'number')
      return colorblender({
        h: value,
        s: hsl.s,
        l: hsl.l,
        a: this._internalAlpha,
      });
    return round(hsl.h);
  }

  public negate(): Colorblender {
    return colorblender(this._withAlpha(negate(this._internalRgb)));
  }

  public lighten(ratio: number): Colorblender {
    return colorblender(this._withAlpha(lighten(this._internalRgb, ratio)));
  }

  public darken(ratio: number): Colorblender {
    return colorblender(this._withAlpha(darken(this._internalRgb, ratio)));
  }

  public saturate(ratio: number): Colorblender {
    return colorblender(this._withAlpha(saturate(this._internalRgb, ratio)));
  }

  public desaturate(ratio: number): Colorblender {
    return colorblender(this._withAlpha(desaturate(this._internalRgb, ratio)));
  }

  public grayscale(): Colorblender {
    return colorblender(this._withAlpha(grayscale(this._internalRgb)));
  }

  public luminosity(): number {
    return luminosity(this._internalRgb);
  }

  public contrast(color: AnyColor | Colorblender): number {
    if (color instanceof Colorblender)
      return contrast(color.rgb(), this._internalRgb);
    const rgba = anyToRgba(color) ?? { r: 0, g: 0, b: 0, a: 1 };
    return contrast(this._internalRgb, rgba);
  }

  public rotate(amount = 15): Colorblender {
    return this.hue(this.hue() + amount);
  }
}

export const colorblender = (input: AnyColor | Colorblender): Colorblender => {
  if (input instanceof Colorblender) return input;
  return new Colorblender(input);
};
