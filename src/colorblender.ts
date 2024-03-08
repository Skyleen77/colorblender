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
  darken,
  desaturate,
  grayscale,
  lighten,
  negate,
  saturate,
  rgbToHsv,
} from './helpers';

export class Colorblender {
  readonly _internalValid: boolean;
  readonly _internalRgb: RgbColor;
  readonly _internalAlpha: number;

  constructor(input?: AnyColor) {
    if (!input) {
      this._internalValid = true;
      this._internalRgb = {
        r: Math.random() * 255,
        g: Math.random() * 255,
        b: Math.random() * 255,
      };
      this._internalAlpha = 1;
    } else {
      const rgba = anyToRgba(input);
      this._internalValid = rgba !== null;
      this._internalRgb = {
        r: rgba?.r ?? 0,
        g: rgba?.g ?? 0,
        b: rgba?.b ?? 0,
      };
      this._internalAlpha = rgba?.a ?? 1;
    }
  }

  public _clampRatio(ratio: number): number {
    return Math.min(1, Math.max(0, ratio));
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

  /**
   * @returns The color in the HEX format.
   */
  public hex(): HexColor {
    const hexAlpha = alphaToHex(this._internalAlpha);
    return `#${rgbToHex(this._internalRgb)}${
      hexAlpha === 'FF' ? '' : hexAlpha
    }`;
  }

  /**
   * @param raw If true, the output will be in the raw format.
   * @returns The color in the RGB format.
   */
  public rgb(raw = false): RgbaColor {
    return this._getColorFormat((c) => c, raw) as RgbaColor;
  }

  /**
   * @returns The color in the base 10 format.
   */
  public rgbNumber(): number {
    const { r, g, b } = this._internalRgb;
    return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
  }

  /**
   * @param raw If true, the output will be in the raw format.
   * @returns The color in the HSL format.
   */
  public hsl(raw = false): HslaColor {
    return this._getColorFormat(rgbToHsl, raw) as HslaColor;
  }

  /**
   * @returns the color in the HSV format.
   */
  public hsv(raw = false): HsvaColor {
    return this._getColorFormat(rgbToHsv, raw) as HsvaColor;
  }

  /**
   * @returns true if the color is valid, false otherwise.
   */
  public isValid(): boolean {
    return this._internalValid;
  }

  /**
   * @returns true if the color is dark, false otherwise.
   */
  public isDark(): boolean {
    return brightness(this._internalRgb) < 0.5;
  }

  /**
   * @returns true if the color is light, false otherwise.
   */
  public isLight(): boolean {
    return brightness(this._internalRgb) >= 0.5;
  }

  /**
   * @param color The color to compare.
   * @returns true if the color is equal to the given color, false otherwise.
   */
  public isEqual(color: AnyColor | Colorblender): boolean {
    return this.hex() === colorblender(color).hex();
  }

  /**
   * @param raw If true, the output will be in the raw format.
   * @returns the brightness of the color.
   */
  public brightness(raw = false): number {
    return raw
      ? brightness(this._internalRgb)
      : round(brightness(this._internalRgb), 2);
  }

  /**
   * @param value The alpha value to set.
   * @returns The alpha value of the color if no value is provided, otherwise returns the Colorblender instance.
   */
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

  /**
   * @param value The hue value to set.
   * @returns The hue value of the color if no value is provided, otherwise returns the Colorblender instance.
   */
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

  /**
   * @returns The color inverted.
   */
  public negate(): Colorblender {
    return colorblender(this._withAlpha(negate(this._internalRgb)));
  }

  /**
   *
   * @param ratio The ratio to lighten the color (between 0 and 1).
   * @returns The color lightened.
   */
  public lighten(ratio: number): Colorblender {
    ratio = this._clampRatio(ratio);
    return colorblender(this._withAlpha(lighten(this._internalRgb, ratio)));
  }

  /**
   * @param ratio The ratio to darken the color (between 0 and 1).
   * @returns The color darkened.
   */
  public darken(ratio: number): Colorblender {
    ratio = this._clampRatio(ratio);
    return colorblender(this._withAlpha(darken(this._internalRgb, ratio)));
  }

  /**
   * @param ratio The ratio to saturate the color (between 0 and 1).
   * @returns The color saturated.
   */
  public saturate(ratio: number): Colorblender {
    ratio = this._clampRatio(ratio);
    return colorblender(this._withAlpha(saturate(this._internalRgb, ratio)));
  }

  /**
   * @param ratio The ratio to desaturate the color (between 0 and 1).
   * @returns The color desaturated.
   */
  public desaturate(ratio: number): Colorblender {
    ratio = this._clampRatio(ratio);
    return colorblender(this._withAlpha(desaturate(this._internalRgb, ratio)));
  }

  /**
   * @param ratio The ratio to fade the color (between 0 and 1).
   * @returns The color faded.
   */
  public fade(ratio: number): Colorblender {
    ratio = this._clampRatio(ratio);
    return this.alpha(this._internalAlpha - this._internalAlpha * ratio);
  }

  /**
   * @param ratio The ratio to opaquer the color (between 0 and 1).
   * @returns The color opaqued.
   */
  public opaquer(ratio: number): Colorblender {
    ratio = this._clampRatio(ratio);
    return this.alpha(this._internalAlpha + this._internalAlpha * ratio);
  }

  /**
   * @returns The grayscale color.
   */
  public grayscale(): Colorblender {
    return colorblender(this._withAlpha(grayscale(this._internalRgb)));
  }

  /**
   * @param amount The amount to rotate the color (between 0 and 360).
   * @returns The color rotated.
   */
  public rotate(amount = 15): Colorblender {
    return this.hue(this.hue() + amount);
  }
}

export const colorblender = (input?: AnyColor | Colorblender): Colorblender => {
  if (input instanceof Colorblender) return input;
  return new Colorblender(input);
};
