import type {
  HexColor,
  RgbColor,
  AnyColor,
  RgbaColor,
  HslaColor,
  HsvaColor,
  HslColor,
  HwbaColor,
  HwbColor,
  GrayColor,
  HcgColor,
  HcgaColor,
  ToStringFormat,
} from './types';

import { brightness } from './helpers/analysis/brightness';
import { alphaToHex, rgbToHex } from './helpers/converters/hex';
import { hslToString, rgbToHsl } from './helpers/converters/hsl';
import { hsvToString, rgbToHsv } from './helpers/converters/hsv';
import { anyToRgba } from './helpers/manipulation/anyToRgba';
import { darken } from './helpers/manipulation/darken';
import { desaturate } from './helpers/manipulation/desaturate';
import { grayscale } from './helpers/manipulation/grayscale';
import { lighten } from './helpers/manipulation/lighten';
import { negate } from './helpers/manipulation/negate';
import { saturate } from './helpers/manipulation/saturate';
import { round, roundColor } from './helpers/utils';
import { rgbToGray } from './helpers/converters/gray';
import { brighten } from './helpers/manipulation/brighten';
import { temperature } from './helpers/manipulation/temperature';
import { complement } from './helpers/manipulation/complement';
import { rgbToString } from './helpers/converters/rgb';

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

  public _withAlpha(
    color: RgbColor | HslColor | HwbColor | HcgColor,
  ): RgbaColor | HslaColor | HwbaColor | HcgaColor {
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
   * @param format The format to use.
   * @returns the color in the RGB format as a string.
   */
  public rgbString = (format: ToStringFormat = 'default') => {
    return rgbToString(
      {
        ...this._internalRgb,
        a: this._internalAlpha,
      },
      format,
    );
  };

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
   * @param format The format to use.
   * @returns the color in the HSL format as a string.
   */
  public hslString = (format: ToStringFormat = 'default') => {
    return hslToString(
      {
        ...this._internalRgb,
        a: this._internalAlpha,
      },
      format,
    );
  };

  /**
   * @returns the color in the HSV format.
   */
  public hsv(raw = false): HsvaColor {
    return this._getColorFormat(rgbToHsv, raw) as HsvaColor;
  }

  /**
   * @param format The format to use.
   * @returns the color in the HSV format as a string.
   */
  public hsvString = () => {
    return hsvToString({
      ...this._internalRgb,
      a: this._internalAlpha,
    });
  };

  /**
   * @returns the color in the Gray format.
   */
  public gray(raw = false): GrayColor {
    return {
      ...(raw
        ? rgbToGray(this._internalRgb)
        : roundColor(rgbToGray(this._internalRgb))),
    };
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
    return round(this._internalAlpha, 2);
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
   * @param ratio The ratio to brighten the color.
   * @returns The color brightened.
   */
  public brighten(ratio: number): Colorblender {
    return colorblender(this._withAlpha(brighten(this._internalRgb, ratio)));
  }

  /**
   *
   * @param ratio The ratio to lighten the color.
   * @returns The color lightened.
   */
  public lighten(ratio: number): Colorblender {
    return colorblender(this._withAlpha(lighten(this._internalRgb, ratio)));
  }

  /**
   * @param ratio The ratio to darken the color.
   * @returns The color darkened.
   */
  public darken(ratio: number): Colorblender {
    return colorblender(this._withAlpha(darken(this._internalRgb, ratio)));
  }

  /**
   * @param ratio The ratio to saturate the color.
   * @returns The color saturated.
   */
  public saturate(ratio: number): Colorblender {
    return colorblender(this._withAlpha(saturate(this._internalRgb, ratio)));
  }

  /**
   * @param ratio The ratio to desaturate the color.
   * @returns The color desaturated.
   */
  public desaturate(ratio: number): Colorblender {
    return colorblender(this._withAlpha(desaturate(this._internalRgb, ratio)));
  }

  /**
   * @param ratio The ratio to fade the color.
   * @returns The color faded.
   */
  public fade(ratio: number): Colorblender {
    return this.alpha(this._internalAlpha - this._internalAlpha * ratio);
  }

  /**
   * @param ratio The ratio to opaquer the color.
   * @returns The color opaqued.
   */
  public opaquer(ratio: number): Colorblender {
    return this.alpha(this._internalAlpha + this._internalAlpha * ratio);
  }

  /**
   * @param amount The amount to change the temperature.
   * @returns The color with the temperature changed.
   */
  public temperature(amount: number): Colorblender {
    return colorblender(
      this._withAlpha(temperature(this._internalRgb, amount)),
    );
  }

  /**
   * @returns The complement color.
   */
  public complement(): Colorblender {
    return colorblender(this._withAlpha(complement(this._internalRgb)));
  }

  /**
   * @returns The grayscale color.
   */
  public grayscale(): Colorblender {
    return colorblender(this._withAlpha(grayscale(this._internalRgb)));
  }

  /**
   * @param amount The amount to rotate the color.
   * @returns The color rotated.
   */
  public rotate(amount = 15): Colorblender {
    const hsl = rgbToHsl(this._internalRgb);
    let newHue = hsl.h + amount;
    newHue = newHue % 360;
    if (newHue < 0) newHue += 360;
    return colorblender({
      h: newHue,
      s: hsl.s,
      l: hsl.l,
      a: this._internalAlpha,
    });
  }
}

export const colorblender = (input?: AnyColor | Colorblender): Colorblender => {
  if (input instanceof Colorblender) return input;
  return new Colorblender(input);
};
