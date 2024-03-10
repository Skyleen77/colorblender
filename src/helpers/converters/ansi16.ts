import type { Ansi16Color, RgbColor } from '../../types';

import { roundColor } from '../utils';
import { rgbToHsv } from './hsv';

export const rgbToAnsi16 = (rgb: RgbColor): Ansi16Color => {
  const { r, g, b } = rgb;
  let value = rgbToHsv(rgb).v;

  value = Math.round(value / 50);

  if (value === 0) {
    return { ansi16: 30 };
  }

  let ansi =
    30 +
    ((Math.round(b / 255) << 2) |
      (Math.round(g / 255) << 1) |
      Math.round(r / 255));

  if (value === 2) {
    ansi += 60;
  }

  return { ansi16: ansi };
};

export const ansi16ToRgb = (
  color: Ansi16Color,
  rounded?: boolean,
): RgbColor => {
  let ansi16 = color.ansi16 % 10;
  let ansiColor = ansi16 % 10;

  // Handle greyscale
  if (ansiColor === 0 || ansiColor === 7) {
    if (ansi16 > 50) {
      ansiColor += 3.5;
    }

    ansiColor = (ansiColor / 10.5) * 255;

    return { r: ansiColor, g: ansiColor, b: ansiColor };
  }

  const mult = (~~(ansi16 > 50) + 1) * 0.5;
  const r = (ansiColor & 1) * mult * 255;
  const g = ((ansiColor >> 1) & 1) * mult * 255;
  const b = ((ansiColor >> 2) & 1) * mult * 255;

  const rgb = { r, g, b };

  return rounded ? roundColor(rgb) : rgb;
};
