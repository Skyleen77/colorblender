import type { HexColor, RgbColor } from '@colorblender/converter';
import type { AnyColor, HexaColor, RgbaColor } from './types';

import { alphaToHex, rgbToHex, round } from '@colorblender/converter';
import {
  anyToRgba,
  brightness,
  darken,
  lighten,
  luminosity,
  mix,
  negate,
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

  public isValid(): boolean {
    return this.internalValid;
  }

  public isDark(): boolean {
    return brightness(this.internalRgb) < 0.5;
  }

  public isLight(): boolean {
    return brightness(this.internalRgb) >= 0.5;
  }

  public brightness(): number {
    return round(brightness(this.internalRgb), 2);
  }

  public alpha(): number {
    return this.internalAlpha;
  }

  public hex(): HexColor {
    return rgbToHex(this.internalRgb);
  }

  public hexa(): HexaColor {
    return `${rgbToHex(this.internalRgb)}${alphaToHex(this.internalAlpha)}`;
  }

  public rgb(): RgbColor {
    return this.internalRgb;
  }

  public rgba(): RgbaColor {
    return {
      ...this.internalRgb,
      a: this.internalAlpha,
    };
  }

  public negate(): Colorblender {
    return colorblender(negate(this.rgba()));
  }

  public lighten(ratio: number): Colorblender {
    return colorblender(lighten(this.rgba(), ratio));
  }

  public darken(ratio: number): Colorblender {
    return colorblender(darken(this.rgba(), ratio));
  }

  public luminosity(): number {
    return luminosity(this.internalRgb);
  }

  public mix(color: AnyColor, weight: number = 0.5): Colorblender {
    const rgba = anyToRgba(color) ?? { r: 0, g: 0, b: 0, a: 1 };
    const mixed = mix(this.rgba(), rgba, weight);
    return colorblender(mixed);
  }
}

export const colorblender = (input: AnyColor | Colorblender): Colorblender => {
  if (input instanceof Colorblender) return input;
  return new Colorblender(input);
};

console.log('colorblender', colorblender({ r: 255, g: 255, b: 255 }).hex());
console.log(
  'colorblender 2',
  colorblender({ r: 255, g: 255, b: 255 }).negate().rgb(),
);
console.log(
  'colorblender mix',
  colorblender({ r: 255, g: 255, b: 255 }).mix({
    r: 0,
    g: 0,
    b: 0,
  }),
);
