import type { Extensions } from '../extend';
import type { RalColor } from '../list/ral';

import { listToRgb, rgbToList } from '../helpers/converters/list';
import { ral } from '../list/ral';

declare module '../colorblender' {
  interface Colorblender {
    ral(): RalColor;
  }
}

const ralExtension: Extensions = (Class, converters): void => {
  /**
   * @returns the RAL of the color.
   */
  Class.prototype.ral = function (): RalColor {
    return rgbToList<RalColor>(this._internalRgb, ral);
  };

  converters.push({
    format: 'RAL',
    converter: (r: RalColor, rounded?: boolean) => {
      return listToRgb<RalColor>(r, ral, rounded);
    },
  });
};

export default ralExtension;
