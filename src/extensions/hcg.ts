import type { Extensions } from '../extend';
import type { HcgaColor } from '../types';
import type { Colorblender } from '../colorblender';

import { hcgToRgb, hcgToString, rgbToHcg } from '../helpers/converters/hcg';
import { negateTones } from '../helpers/manipulation/negateTones';
import { shaden } from '../helpers/manipulation/shaden';
import { tinten } from '../helpers/manipulation/tinten';

declare module '../colorblender' {
  interface Colorblender {
    hcg(raw?: boolean): HcgaColor;
    hcgString(): string;
    tinten(ratio: number): Colorblender;
    shaden(ratio: number): Colorblender;
    negateTones(): Colorblender;
  }
}

const hcgExtension: Extensions = (Class, converters): void => {
  /**
   * @param raw Whether to return the color in raw format.
   * @returns the color in the HCG format.
   */
  Class.prototype.hcg = function (raw = false): HcgaColor {
    return this._getColorFormat(rgbToHcg, raw) as HcgaColor;
  };

  /**
   * @param format The format to use.
   * @returns the color in the HCG format as a string.
   */
  Class.prototype.hcgString = function (): string {
    return hcgToString({
      ...this._internalRgb,
      a: this._internalAlpha,
    });
  };

  /**
   * @returns The color with the tones negated.
   */
  Class.prototype.negateTones = function (): Colorblender {
    return new Class(this._withAlpha(negateTones(this._internalRgb)));
  };

  Class.prototype.tinten = function (ratio: number): Colorblender {
    return new Class(this._withAlpha(tinten(this._internalRgb, ratio)));
  };

  Class.prototype.shaden = function (ratio: number): Colorblender {
    return new Class(this._withAlpha(shaden(this._internalRgb, ratio)));
  };

  converters.push({
    format: ['h', 'c', 'g'],
    converter: hcgToRgb,
  });
};

export default hcgExtension;
