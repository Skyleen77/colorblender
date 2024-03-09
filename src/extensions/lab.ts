import type { Extensions } from '../extend';
import type { LabaColor } from '../types';

import { labToRgb, rgbToLab } from '../helpers/converters/lab';
import { roundColor } from '../helpers/utils';

declare module '../colorblender' {
  interface Colorblender {
    lab(raw?: boolean): LabaColor;
  }
}

const labExtension: Extensions = (Class, converters): void => {
  /**
   * @param raw Whether to return the color in raw format.
   * @returns the color in the LAB format.
   */
  Class.prototype.lab = function (raw = false): LabaColor {
    return {
      ...(raw
        ? rgbToLab(this._internalRgb)
        : roundColor(rgbToLab(this._internalRgb))),
      alpha: raw ? this._internalAlpha : this.alpha(),
    };
  };

  converters.push({
    format: ['l', 'a', 'b'],
    converter: labToRgb,
  });
};

export default labExtension;
