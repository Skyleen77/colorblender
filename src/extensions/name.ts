import type { Extensions } from '../extend';
import type { NameColor } from '../list/names';

import { names } from '../list/names';
import { listToRgb, rgbToList } from '../helpers/converters/list';

declare module '../colorblender' {
  interface Colorblender {
    name(): NameColor;
  }
}

const nameExtension: Extensions = (Class, converters): void => {
  /**
   * @returns the name of the color.
   */
  Class.prototype.name = function (): NameColor {
    return rgbToList<NameColor>(this._internalRgb, names);
  };

  converters.push({
    format: 'NAME',
    converter: (name: NameColor, rounded?: boolean) => {
      return listToRgb<NameColor>(name, names, rounded);
    },
  });
};

export default nameExtension;
