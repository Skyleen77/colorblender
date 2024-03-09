import type { Extensions } from '../extend';
import type { HcgaColor } from '../types';

import { hcgToRgb, rgbToHcg } from '../helpers/converters/hcg';

declare module '../colorblender' {
  interface Colorblender {
    hcg(raw?: boolean): HcgaColor;
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

  converters.push({
    format: ['h', 'c', 'g'],
    converter: hcgToRgb,
  });
};

export default hcgExtension;
