import type { Colorblender } from '../colorblender';
import type { Extensions } from '../extend';
import type { AnyColor } from '../types';

import { mix } from '../helpers/manipulation/mix';

declare module '../colorblender' {
  interface Colorblender {
    mix(color: AnyColor | Colorblender, weight?: number): Colorblender;
    mixPalette(color: AnyColor | Colorblender, amount: number): Colorblender[];
    tints(amount: number): Colorblender[];
    shades(amount: number): Colorblender[];
    tones(amount: number): Colorblender[];
  }
}

const mixExtension: Extensions = (Class): void => {
  /**
   * @param color The color to mix with.
   * @param weight The weight of the color to mix with (between 0 and 1).
   * @returns The mixed color.
   */
  Class.prototype.mix = function (
    color: AnyColor | Colorblender,
    weight = 0.5,
  ): Colorblender {
    let mixed;

    weight = Math.min(1, Math.max(0, weight));

    if (color instanceof Class) {
      mixed = mix(color.rgb(), this.rgb(), weight);
    } else {
      mixed = mix(new Class(color).rgb(), this.rgb(), weight);
    }

    return new Class(mixed);
  };

  /**
   * @param color The color to mix with.
   * @param amount The amount of colors to mix.
   * @returns The mixed colors.
   */
  Class.prototype.mixPalette = function (
    color: AnyColor | Colorblender,
    amount: number,
  ): Colorblender[] {
    if (amount < 1) {
      throw new Error('Amount should be at least 1');
    }

    amount = Math.round(amount);

    const colorsMixed: Colorblender[] = [];
    const ratio = 1 / (amount + 1);

    for (let i = 0; i < amount; i++) {
      const weight = ratio * (i + 1);
      const mixedColor = this.mix(color, weight);
      colorsMixed.push(mixedColor);
    }

    return colorsMixed;
  };

  /**
   * @param amount The amount of tints to generate.
   * @returns The tints.
   */
  Class.prototype.tints = function (amount: number) {
    return this.mixPalette('#fff', amount);
  };

  /**
   * @param amount The amount of shades to generate.
   * @returns The shades.
   */
  Class.prototype.shades = function (amount: number) {
    return this.mixPalette('#000', amount);
  };

  /**
   * @param amount The amount of tones to generate.
   * @returns The tones.
   */
  Class.prototype.tones = function (amount: number) {
    return this.mixPalette('#808080', amount);
  };
};

export default mixExtension;
