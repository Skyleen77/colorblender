import type { Extensions } from '../extend';
import type { Ansi16Color, Ansi256Color } from '../types';

import { ansi16ToRgb, rgbToAnsi16 } from '../helpers/converters/ansi16';
import { ansi256ToRgb, rgbToAnsi256 } from '../helpers/converters/ansi256';

declare module '../colorblender' {
  interface Colorblender {
    ansi16(): Ansi16Color;
    ansi256(): Ansi256Color;
  }
}

const ansiExtension: Extensions = (Class, converters): void => {
  /**
   * @returns the ansi16 of the color.
   */
  Class.prototype.ansi16 = function (): Ansi16Color {
    return rgbToAnsi16(this._internalRgb);
  };

  /**
   * @returns the ansi256 of the color.
   */
  Class.prototype.ansi256 = function (): Ansi256Color {
    return rgbToAnsi256(this._internalRgb);
  };

  converters.push(
    {
      format: ['ansi16'],
      converter: ansi16ToRgb,
    },
    {
      format: ['ansi256'],
      converter: ansi256ToRgb,
    },
  );
};

export default ansiExtension;
