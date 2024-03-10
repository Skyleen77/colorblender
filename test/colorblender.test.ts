import { colorblender } from '../src';

const color1 = colorblender({ r: 167, g: 40, b: 13 });
const color2 = colorblender({ r: 28, g: 252, b: 185 });

describe('colorblender', () => {
  it('should create a random color valid', () => {
    expect(colorblender().isValid()).toBe(true);
  });

  it('should verify if color is valid', () => {
    expect(color1.isValid()).toBe(true);
  });

  it('should verify if color is not valid', () => {
    expect(colorblender('#ZZZZZZZZZ').isValid()).toBe(false);
  });

  it('should verify if color is dark', () => {
    expect(color1.isDark()).toBe(true);
  });

  it('should verify if color is light', () => {
    expect(color1.isLight()).toBe(false);
  });

  it('should verify if color is equal', () => {
    expect(color1.isEqual({ r: 167, g: 40, b: 13 })).toBe(true);
  });

  it('should verify if color is not equal', () => {
    expect(color1.isEqual(color2)).toBe(false);
  });

  it('should return brightness', () => {
    expect(color1.brightness()).toBe(0.29);
  });

  it('should return brightness raw', () => {
    expect(color1.brightness(true)).toBe(0.29370588235294115);
  });

  it('should return hex color', () => {
    expect(color1.hex()).toBe('#A7280D');
  });

  it('should return hex color', () => {
    expect(colorblender({ ...color1.rgb(), a: 0.9 }).hex()).toBe('#A7280DE6');
  });

  it('should return rgb when enter a minify hex color', () => {
    expect(colorblender('#FFF').rgb()).toStrictEqual({
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    });
  });

  it('should return rgb color', () => {
    expect(color1.rgb()).toStrictEqual({ r: 167, g: 40, b: 13, a: 1 });
  });

  it('should return rgb number', () => {
    expect(color1.rgbNumber()).toBe(10954765);
  });

  it('should return hsl color', () => {
    expect(color1.hsl()).toStrictEqual({ h: 11, s: 86, l: 35, a: 1 });
  });

  it('should return hsv color', () => {
    expect(color1.hsv()).toStrictEqual({ h: 11, s: 92, v: 65, a: 1 });
  });

  it('should converts color to Gray correctly', () => {
    expect(color1.gray()).toStrictEqual({ gray: 29 });
  });

  it('should create color correctly with Gray entry', () => {
    expect(colorblender({ gray: 29 }).hex()).toStrictEqual('#4A4A4A');
  });

  it('should return the alpha', () => {
    expect(color1.alpha()).toBe(1);
  });

  it('should set the alpha and return it', () => {
    expect(color1.alpha(0.59).alpha()).toBe(0.59);
  });

  it('should return the hue', () => {
    expect(color1.hue()).toBe(11);
  });

  it('should set the hue', () => {
    expect(color1.hue(85).hue()).toBe(85);
  });

  it('should negate the color', () => {
    expect(color1.negate().rgb()).toStrictEqual({
      r: 88,
      b: 242,
      g: 215,
      a: 1,
    });
  });

  it('should brighten the color', () => {
    expect(color1.brighten(0.2).rgb()).toStrictEqual({
      r: 185,
      b: 61,
      g: 83,
      a: 1,
    });
  });

  it('should lighten the color', () => {
    expect(color1.lighten(0.2).rgb()).toStrictEqual({
      r: 200,
      b: 16,
      g: 48,
      a: 1,
    });
  });

  it('should darken the color', () => {
    expect(color1.darken(0.2).rgb()).toStrictEqual({
      r: 134,
      b: 10,
      g: 32,
      a: 1,
    });
  });

  it('should saturate the color', () => {
    expect(color1.saturate(0.2).rgb()).toStrictEqual({
      r: 180,
      b: 0,
      g: 32,
      a: 1,
    });
  });

  it('should desaturate the color', () => {
    expect(color1.desaturate(0.2).rgb()).toStrictEqual({
      r: 152,
      g: 50,
      b: 28,
      a: 1,
    });
  });

  it('should temperature the color', () => {
    expect(color1.temperature(-30).rgb()).toStrictEqual({
      r: 121,
      b: 59,
      g: 32,
      a: 1,
    });
  });

  it('should complement the color', () => {
    expect(color1.complement().hex()).toStrictEqual('#0D8CA7');
  });

  it('should grayscale the color', () => {
    expect(color1.grayscale().rgb()).toStrictEqual({
      r: 75,
      b: 75,
      g: 75,
      a: 1,
    });
  });

  it('should fade the color', () => {
    expect(color1.fade(0.2).alpha()).toBe(0.8);
  });

  it('should fade the color', () => {
    expect(color1.alpha(0.5).opaquer(0.2).alpha()).toBe(0.6);
  });

  it('should rotate the color', () => {
    expect(color1.rotate(20).hue()).toBe(31);
  });
});
