import type { RgbColor } from '../types';

export const clamp = (number: number, min = 0, max = 1): number => {
  return number > max ? max : number > min ? number : min;
};

export const round = (
  number: number,
  digits = 0,
  base = Math.pow(10, digits),
): number => {
  return Math.round(base * number) / base + 0;
};

export const roundColor = <T extends object>(obj: T): T => {
  let roundedObj = {} as T;

  Object.keys(obj).forEach((key) => {
    const value = obj[key as keyof T];
    if (typeof value === 'number') {
      roundedObj[key as keyof T] = round(value) as unknown as T[keyof T];
    } else {
      roundedObj[key as keyof T] = value;
    }
  });

  return roundedObj;
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function colorDistance(color1: RgbColor, color2: RgbColor): number {
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
      Math.pow(color1.g - color2.g, 2) +
      Math.pow(color1.b - color2.b, 2),
  );
}
