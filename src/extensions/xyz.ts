import type { Extensions } from '../extend';
import type { XyzaColor } from '../types';

import { xyzToRgb, rgbToXyz } from '../helpers/converters/xyz';

declare module '../colorblender' {
  interface Colorblender {
    xyz(raw?: boolean): XyzaColor;
  }
}

const xyzExtension: Extensions = (Class, converters): void => {
  /**
   * @param raw Whether to return the color in raw format.
   * @returns the color in the XYZ format.
   */
  Class.prototype.xyz = function (raw = false): XyzaColor {
    return this._getColorFormat(rgbToXyz, raw) as XyzaColor;
  };

  converters.push({
    format: ['x', 'y', 'z'],
    converter: xyzToRgb,
  });
};

export default xyzExtension;
