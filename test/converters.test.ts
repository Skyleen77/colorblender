import { colorblender } from '../dist';

const color1 = colorblender({ r: 167, g: 40, b: 13 });
const color2 = colorblender({ r: 28, g: 252, b: 185 });

describe('ConverterRgb', () => {
  it('should verify if color is valid', () => {
    expect(color1.isValid()).toBe(true);
  });

  it('should verify if color is not valid', () => {
    // @ts-ignore
    expect(colorblender({ r: 167, g: 40, c: 13 }).isValid()).toBe(false);
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

  it('should return hex color', () => {
    expect(color1.hex()).toBe('#A7280D');
  });

  it('should return hexa color', () => {
    expect(color1.hexa()).toBe('#A7280DFF');
  });

  it('should return rgb color', () => {
    expect(color1.rgb()).toEqual({ r: 167, g: 40, b: 13 });
  });

  it('should return rgb number', () => {
    expect(color1.rgbNumber()).toBe(10954765);
  });

  it('should return rgba color', () => {
    expect(color1.rgba()).toEqual({ r: 167, g: 40, b: 13, a: 1 });
  });
});
