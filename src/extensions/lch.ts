import type { Extensions } from '../extend';
import type { LchaColor } from '../types';

import { lchToRgb, rgbToLch } from '../helpers/converters/lch';

declare module '../colorblender' {
  interface Colorblender {
    lch(raw?: boolean): LchaColor;
  }
}

const lchExtension: Extensions = (Class, converters): void => {
  /**
   * @param raw Whether to return the color in raw format.
   * @returns the color in the LCH format.
   */
  Class.prototype.lch = function (raw = false): LchaColor {
    return this._getColorFormat(rgbToLch, raw) as LchaColor;
  };

  converters.push({
    format: ['l', 'c', 'h'],
    converter: lchToRgb,
  });
};

export default lchExtension;
