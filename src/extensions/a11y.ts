import type { AnyColor } from '../types';
import type { Extensions } from '../extend';
import type { Colorblender } from '../colorblender';
import { luminosity } from '../helpers/analysis/luminosity';
import { contrast } from '../helpers/analysis/contrast';

interface ReadabilityOptions {
  level?: 'AA' | 'AAA';
  size?: 'normal' | 'large';
}

declare module '../colorblender' {
  interface Colorblender {
    luminosity(): number;
    contrast(color: AnyColor | Colorblender): number;
    isReadable(
      color: AnyColor | Colorblender,
      options?: ReadabilityOptions,
    ): boolean;
  }
}

const a11yExtension: Extensions = (Class): void => {
  const getMinimalContrast = ({
    level = 'AA',
    size = 'normal',
  }: ReadabilityOptions) => {
    if (level === 'AAA' && size === 'normal') return 7;
    if (level === 'AA' && size === 'large') return 3;
    return 4.5;
  };

  /**
   * @returns the relative luminance of the color.
   */
  Class.prototype.luminosity = function (): number {
    return luminosity(this._internalRgb);
  };

  /**
   * @param color The color to compare.
   * @returns the contrast ratio between the two colors.
   */
  Class.prototype.contrast = function (color: AnyColor | Colorblender): number {
    if (color instanceof Class)
      return contrast(this._internalRgb, color._internalRgb);
    return contrast(this._internalRgb, new Class(color)._internalRgb);
  };

  /**
   * @param color The color to compare.
   * @param options The options to determine the minimal contrast.
   * @returns whether the color is readable with the given color.
   */
  Class.prototype.isReadable = function (
    color: AnyColor | Colorblender,
    options = {},
  ) {
    return this.contrast(color) >= getMinimalContrast(options);
  };
};

export default a11yExtension;
