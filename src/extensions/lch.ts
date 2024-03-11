import type { Extensions } from '../extend';
import type { LchaColor, ToStringFormat } from '../types';

import { lchToRgb, lchToString, rgbToLch } from '../helpers/converters/lch';

declare module '../colorblender' {
  interface Colorblender {
    lch(raw?: boolean): LchaColor;
    lchString(format?: ToStringFormat): string;
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

  /**
   * @param format The format to use.
   * @returns the color in the LCH format as a string.
   */
  Class.prototype.lchString = function (
    format: ToStringFormat = 'default',
  ): string {
    return lchToString(
      {
        ...this._internalRgb,
        a: this._internalAlpha,
      },
      format,
    );
  };

  converters.push({
    format: ['l', 'c', 'h'],
    converter: lchToRgb,
  });
};

export default lchExtension;
