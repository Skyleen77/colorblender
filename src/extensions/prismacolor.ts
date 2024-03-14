import type { Extensions } from '../extend';
import type { PrismaColor } from '../list/prismacolor';

import { listToRgb, rgbToList } from '../helpers/converters/list';
import { prismacolor } from '../list/prismacolor';

declare module '../colorblender' {
  interface Colorblender {
    prismacolor(): PrismaColor;
  }
}

const prismacolorExtension: Extensions = (Class, converters): void => {
  /**
   * @returns the PrismaColor of the color.
   */
  Class.prototype.prismacolor = function (): PrismaColor {
    return rgbToList<PrismaColor>(this._internalRgb, prismacolor);
  };

  converters.push({
    format: 'PRISMACOLOR',
    converter: (r: PrismaColor, rounded?: boolean) => {
      return listToRgb<PrismaColor>(r, prismacolor, rounded);
    },
  });
};

export default prismacolorExtension;
