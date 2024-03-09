import type { Extensions } from '../extend';
import type { HwbaColor } from '../types';
import type { Colorblender } from '../colorblender';

import { hwbToRgb, rgbToHwb } from '../helpers/converters/hwb';
import { blacken } from '../helpers/manipulation/blacken';
import { whiten } from '../helpers/manipulation/whiten';

declare module '../colorblender' {
  interface Colorblender {
    hwb(raw?: boolean): HwbaColor;
    whiten(ratio: number): Colorblender;
    blacken(ratio: number): Colorblender;
  }
}

const hwbExtension: Extensions = (Class, converters): void => {
  /**
   * @param raw Whether to return the color in raw format.
   * @returns the color in the HWB format.
   */
  Class.prototype.hwb = function (raw = false): HwbaColor {
    return this._getColorFormat(rgbToHwb, raw) as HwbaColor;
  };

  /**
   * @param ratio The ratio to whiten the color (between 0 and 1).
   * @returns The color whitened.
   */
  Class.prototype.whiten = function (ratio: number): Colorblender {
    return new Class(this._withAlpha(whiten(this._internalRgb, ratio)));
  };

  /**
   * @param ratio The ratio to blacken the color (between 0 and 1).
   * @returns The color blackened.
   */
  Class.prototype.blacken = function (ratio: number): Colorblender {
    return new Class(this._withAlpha(blacken(this._internalRgb, ratio)));
  };

  converters.push({
    format: ['h', 'w', 'b'],
    converter: hwbToRgb,
  });
};

export default hwbExtension;
