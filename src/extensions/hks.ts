import type { Extensions } from '../extend';
import type { HksColor } from '../list/hks';

import { listToRgb, rgbToList } from '../helpers/converters/list';
import { hks } from '../list/hks';

declare module '../colorblender' {
  interface Colorblender {
    hks(): HksColor;
  }
}

const ralExtension: Extensions = (Class, converters): void => {
  /**
   * @returns the HKS of the color.
   */
  Class.prototype.hks = function (): HksColor {
    return rgbToList<HksColor>(this._internalRgb, hks);
  };

  converters.push({
    format: 'HKS',
    converter: (h: HksColor, rounded?: boolean) => {
      return listToRgb<HksColor>(h, hks, rounded);
    },
  });
};

export default ralExtension;
