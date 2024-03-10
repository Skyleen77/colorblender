import type { AppleColor, RgbColor } from '../../types';

import { roundColor } from '../utils';

export const rgbToApple = (rgb: RgbColor, rounded?: boolean): AppleColor => {
  const apple = {
    r: (rgb.r / 255) * 65535,
    g: (rgb.g / 255) * 65535,
    b: (rgb.b / 255) * 65535,
  };

  return rounded ? roundColor(apple) : apple;
};
