import type { HexColor, RgbColor } from '@colorblender/converter';
import type {
  AnyColor,
  ColorWithAlpha,
  ColorWithoutAlpha,
  RgbaColor,
} from './types';

import {
  alphaToHex,
  rgbToHex,
  rgbToHsl,
  round,
  roundColor,
} from '@colorblender/converter';
import {
  anyToRgba,
  blacken,
  brightness,
  contrast,
  darken,
  desaturate,
  grayscale,
  lighten,
  luminosity,
  mix,
  negate,
  saturate,
  whiten,
} from './helpers';

export class Colorblender {
  private readonly internalValid: boolean;
  private readonly internalRgb: RgbColor;
  private readonly internalAlpha: number;

  constructor(input: AnyColor) {
    const rgba = anyToRgba(input);
    this.internalValid = rgba !== null;
    this.internalRgb = {
      r: rgba?.r ?? 0,
      g: rgba?.g ?? 0,
      b: rgba?.b ?? 0,
    };
    this.internalAlpha = rgba?.a ?? 1;
  }

  private withAlpha(color: ColorWithoutAlpha): ColorWithAlpha {
    return {
      ...color,
      a: this.internalAlpha,
    };
  }

  public isValid(): boolean {
    return this.internalValid;
  }

  public isDark(): boolean {
    return brightness(this.internalRgb) < 0.5;
  }

  public isLight(): boolean {
    return brightness(this.internalRgb) >= 0.5;
  }

  public isEqual(color: AnyColor | Colorblender): boolean {
    return this.hex() === colorblender(color).hex();
  }

  public brightness(): number {
    return round(brightness(this.internalRgb), 2);
  }

  public hex(): HexColor {
    return `#${rgbToHex(this.internalRgb)}`;
  }

  public hexa(): HexColor {
    return `#${rgbToHex(this.internalRgb)}${alphaToHex(this.internalAlpha)}`;
  }

  public rgb(raw = false): RgbColor {
    return raw ? this.internalRgb : roundColor(this.internalRgb);
  }

  public rgbNumber(): number {
    const { r, g, b } = this.internalRgb;
    return ((r & 0xff) << 16) | ((g & 0xff) << 8) | (b & 0xff);
  }

  public rgba(raw = false): RgbaColor {
    return {
      ...(raw ? this.internalRgb : roundColor(this.internalRgb)),
      a: raw ? this.internalAlpha : this.alpha(),
    };
  }

  public alpha(): number;
  public alpha(value: number): Colorblender;
  public alpha(value?: number): Colorblender | number {
    if (typeof value === 'number')
      return colorblender({ ...this.internalRgb, a: value });
    return round(this.internalAlpha, 2);
  }

  public alphaRaw(): number {
    return this.internalAlpha;
  }

  public hue(): number;
  public hue(value: number): Colorblender;
  public hue(value?: number): Colorblender | number {
    const hsl = rgbToHsl(this.internalRgb);
    if (typeof value === 'number')
      return colorblender({
        h: value,
        s: hsl.s,
        l: hsl.l,
        a: this.internalAlpha,
      });
    return round(hsl.h);
  }

  public negate(): Colorblender {
    return colorblender(this.withAlpha(negate(this.internalRgb)));
  }

  public lighten(ratio: number): Colorblender {
    return colorblender(this.withAlpha(lighten(this.internalRgb, ratio)));
  }

  public darken(ratio: number): Colorblender {
    return colorblender(this.withAlpha(darken(this.internalRgb, ratio)));
  }

  public saturate(ratio: number): Colorblender {
    return colorblender(this.withAlpha(saturate(this.internalRgb, ratio)));
  }

  public desaturate(ratio: number): Colorblender {
    return colorblender(this.withAlpha(desaturate(this.internalRgb, ratio)));
  }

  public whiten(ratio: number): Colorblender {
    return colorblender(this.withAlpha(whiten(this.internalRgb, ratio)));
  }

  public blacken(ratio: number): Colorblender {
    return colorblender(this.withAlpha(blacken(this.internalRgb, ratio)));
  }

  public grayscale(): Colorblender {
    return colorblender(this.withAlpha(grayscale(this.internalRgb)));
  }

  public luminosity(): number {
    return luminosity(this.internalRgb);
  }

  public contrast(color: AnyColor | Colorblender): number {
    if (color instanceof Colorblender)
      return contrast(color.rgba(), this.internalRgb);
    const rgba = anyToRgba(color) ?? { r: 0, g: 0, b: 0, a: 1 };
    return contrast(this.internalRgb, rgba);
  }

  public rotate(amount = 15): Colorblender {
    return this.hue(this.hue() + amount);
  }

  public mix(
    color: AnyColor | Colorblender,
    weight: number = 0.5,
  ): Colorblender {
    if (color instanceof Colorblender) return this.mix(color.rgba(), weight);

    const rgba = anyToRgba(color) ?? { r: 0, g: 0, b: 0, a: 1 };
    const mixed = mix(rgba, this.rgba(), weight);
    return colorblender(mixed);
  }

  public mixMultiple = (
    color: AnyColor | Colorblender,
    amount: number,
  ): Colorblender[] => {
    if (amount < 1) {
      throw new Error('Amount should be at least 1');
    }

    amount = Math.round(amount);

    const colorsMixed: Colorblender[] = [];
    const ratio = 1 / (amount + 1);

    for (let i = 0; i < amount; i++) {
      const weight = ratio * (i + 1);
      const mixedColor = this.mix(color, weight);
      colorsMixed.push(mixedColor);
    }

    return colorsMixed;
  };
}

export const colorblender = (input: AnyColor | Colorblender): Colorblender => {
  if (input instanceof Colorblender) return input;
  return new Colorblender(input);
};
