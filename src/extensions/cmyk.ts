import type { Extensions } from '../extend';
import type { CmykaColor } from '../types';

import { cmykToRgb, rgbToCmyk } from '../helpers/converters/cmyk';

declare module '../colorblender' {
  interface Colorblender {
    cmyk(raw?: boolean): CmykaColor;
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

  converters.push({
    format: ['c', 'm', 'y', 'k'],
    converter: cmykToRgb,
  });
};

export default cmykExtension;
