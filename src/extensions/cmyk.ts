import type { Extensions } from '../extend';
import type { CmykaColor, ToStringFormat } from '../types';

import { cmykToRgb, cmykToString, rgbToCmyk } from '../helpers/converters/cmyk';

declare module '../colorblender' {
  interface Colorblender {
    cmyk(raw?: boolean): CmykaColor;
    cmykString(format?: ToStringFormat): string;
  }
}

const cmykExtension: Extensions = (Class, converters): void => {
  /**
   * @param raw Whether to return the color in raw format.
   * @returns the color in the CMYK format.
   */
  Class.prototype.cmyk = function (raw = false): CmykaColor {
    return this._getColorFormat(rgbToCmyk, raw) as CmykaColor;
  };

  /**
   * @param format The format to use.
   * @returns the color in the HWB format as a string.
   */
  Class.prototype.cmykString = function (
    format: ToStringFormat = 'default',
  ): string {
    return cmykToString(
      {
        ...this._internalRgb,
        a: this.alpha(),
      },
      format,
    );
  };

  converters.push({
    format: ['c', 'm', 'y', 'k'],
    converter: cmykToRgb,
  });
};

export default cmykExtension;
