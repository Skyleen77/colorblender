import type { RgbColor } from '../../types';
import { clamp } from '../utils';

export const temperature = (rgb: RgbColor, amount: number): RgbColor => {
  const temperature = clamp(amount, -100, 100);

  const hot = {
    r: Math.max(rgb.r, rgb.g, rgb.b),
    g: Math.min(rgb.r, rgb.g, rgb.b),
    b: Math.min(rgb.r, rgb.g, rgb.b),
  };
  const cold = {
    r: Math.min(rgb.r, rgb.g, rgb.b),
    g: Math.min(rgb.r, rgb.g, rgb.b),
    b: Math.max(rgb.r, rgb.g, rgb.b),
  };

  const adjusted = {
    r:
      rgb.r +
      ((temperature > 0 ? hot.r - rgb.r : cold.r - rgb.r) *
        Math.abs(temperature)) /
        100,
    g:
      rgb.g +
      ((temperature > 0 ? hot.g - rgb.g : cold.g - rgb.g) *
        Math.abs(temperature)) /
        100,
    b:
      rgb.b +
      ((temperature > 0 ? hot.b - rgb.b : cold.b - rgb.b) *
        Math.abs(temperature)) /
        100,
  };

  return adjusted;
};
