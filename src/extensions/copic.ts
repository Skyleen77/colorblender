import type { Extensions } from '../extend';
import type { CopicColor } from '../list/copic';

import { listToRgb, rgbToList } from '../helpers/converters/list';
import { copic } from '../list/copic';

declare module '../colorblender' {
  interface Colorblender {
    copic(): CopicColor;
  }
}

const copicExtension: Extensions = (Class, converters): void => {
  /**
   * @returns the Copic of the color.
   */
  Class.prototype.copic = function (): CopicColor {
    return rgbToList<CopicColor>(this._internalRgb, copic);
  };

  converters.push({
    format: 'COPIC',
    converter: (r: CopicColor, rounded?: boolean) => {
      return listToRgb<CopicColor>(r, copic, rounded);
    },
  });
};

export default copicExtension;
