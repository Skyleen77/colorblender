import type { Ansi256Color, RgbColor } from '../../types';

import { roundColor } from '../utils';

export const rgbToAnsi256 = (rgb: RgbColor): Ansi256Color => {
  const { r, g, b } = rgb;

  if (r >> 4 === g >> 4 && g >> 4 === b >> 4) {
    if (r < 8) {
      return { ansi256: 16 };
    }

    if (r > 248) {
      return { ansi256: 231 };
    }

    return { ansi256: Math.round(((r - 8) / 247) * 24) + 232 };
  }

  const ansi =
    16 +
    36 * Math.round((r / 255) * 5) +
    6 * Math.round((g / 255) * 5) +
    Math.round((b / 255) * 5);

  return { ansi256: ansi };
};

export const ansi256ToRgb = (
  color: Ansi256Color,
  rounded?: boolean,
): RgbColor => {
  let ansi256 = color.ansi256;

  if (ansi256 >= 232) {
    const c = (ansi256 - 232) * 10 + 8;
    return { r: c, g: c, b: c };
  }

  ansi256 -= 16;

  let rem;
  const r = (Math.floor(ansi256 / 36) / 5) * 255;
  const g = (Math.floor((rem = ansi256 % 36) / 6) / 5) * 255;
  const b = ((rem % 6) / 5) * 255;

  const rgb = { r, g, b };

  return rounded ? roundColor(rgb) : rgb;
};
