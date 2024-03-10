import type { Extensions } from '../extend';
import type { AppleaColor } from '../types';

import { rgbToApple } from '../helpers/converters/apple';

declare module '../colorblender' {
  interface Colorblender {
    apple(raw?: boolean): AppleaColor;
  }
}

const appleExtension: Extensions = (Class): void => {
  /**
   * @param raw Whether to return the color in raw format.
   * @returns the color in the apple format.
   */
  Class.prototype.apple = function (raw = false): AppleaColor {
    return this._getColorFormat(rgbToApple, raw) as AppleaColor;
  };
};

export default appleExtension;
