import type { HsvColor, RgbColor } from '../../types';

import { roundColor } from '../../helpers/utils';

export const rgbToHsv = (rgb: RgbColor, rounded?: boolean): HsvColor => {
  let rdif;
  let gdif;
  let bdif;
  let h = 0;
  let s;

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const v = Math.max(r, g, b);
  const diff = v - Math.min(r, g, b);
  const diffc = function (c: number) {
    return (v - c) / 6 / diff + 1 / 2;
  };

  if (diff !== 0) {
    s = diff / v;
    rdif = diffc(r);
    gdif = diffc(g);
    bdif = diffc(b);

    if (r === v) {
      h = bdif - gdif;
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif;
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif;
    }

    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  } else {
    s = 0;
  }

  const hsv = { h: h * 360, s: s * 100, v: v * 100 };

  return rounded ? roundColor(hsv) : hsv;
};

export const hsvToRgb = (hsv: HsvColor, rounded?: boolean): RgbColor => {
  const h = hsv.h / 60;
  const s = hsv.s / 100;
  let v = hsv.v / 100;
  const hi = Math.floor(h) % 6;

  const f = h - Math.floor(h);
  const p = 255 * v * (1 - s);
  const q = 255 * v * (1 - s * f);
  const t = 255 * v * (1 - s * (1 - f));
  v *= 255;

  let rgb;

  if (hi === 0) {
    rgb = { r: v, g: t, b: p };
  } else if (hi === 1) {
    rgb = { r: q, g: v, b: p };
  } else if (hi === 2) {
    rgb = { r: p, g: v, b: t };
  } else if (hi === 3) {
    rgb = { r: p, g: q, b: v };
  } else if (hi === 4) {
    rgb = { r: t, g: p, b: v };
  } else if (hi === 5) {
    rgb = { r: v, g: p, b: q };
  } else {
    rgb = { r: 0, g: 0, b: 0 };
  }

  return rounded ? roundColor(rgb) : rgb;
};
