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
    expect(color1.rgb()).toStrictEqual({ r: 167, g: 40, b: 13 });
  });

  it('should return rgb number', () => {
    expect(color1.rgbNumber()).toBe(10954765);
  });

  it('should return rgba color', () => {
    expect(color1.rgba()).toStrictEqual({ r: 167, g: 40, b: 13, a: 1 });
  });

  it('should return hsl color', () => {
    expect(color1.hsl()).toStrictEqual({ h: 11, s: 86, l: 35 });
  });

  it('should return hsla color', () => {
    expect(color1.hsla()).toStrictEqual({ h: 11, s: 86, l: 35, a: 1 });
  });

  it('should return the alpha', () => {
    expect(color1.alpha()).toBe(1);
  });

  it('should set the alpha', () => {
    expect(color1.alpha(0.593728).alpha()).toBe(0.59);
  });

  it('should return the alpha raw', () => {
    expect(color1.alpha(0.593728).alphaRaw()).toBe(0.593728);
  });

  it('should return the hue', () => {
    expect(color1.hue()).toBe(11);
  });

  it('should set the hue', () => {
    expect(color1.hue(85).hue()).toBe(85);
  });

  it('should negate the color', () => {
    expect(color1.negate().rgb()).toStrictEqual({ r: 88, b: 242, g: 215 });
  });

  it('should lighten the color', () => {
    expect(color1.lighten(0.2).rgb()).toStrictEqual({ r: 200, b: 16, g: 48 });
  });

  it('should darken the color', () => {
    expect(color1.darken(0.2).rgb()).toStrictEqual({ r: 134, b: 10, g: 32 });
  });

  it('should saturate the color', () => {
    expect(color1.saturate(0.2).rgb()).toStrictEqual({ r: 180, b: 0, g: 32 });
  });

  it('should desaturate the color', () => {
    expect(color1.desaturate(0.2).rgb()).toStrictEqual({
      r: 152,
      g: 50,
      b: 28,
    });
  });

  // it('should whiten the color', () => {
  //   expect(color1.whiten(0.2).rgb()).toStrictEqual({ r: 167, b: 16, g: 42 });
  // });

  // it('should darken the color', () => {
  //   expect(color1.blacken(0.2).rgb()).toStrictEqual({ r: 149, b: 13, g: 37 });
  // });

  it('should grayscale the color', () => {
    expect(color1.grayscale().rgb()).toStrictEqual({ r: 75, b: 75, g: 75 });
  });

  it('should grayscale the color', () => {
    expect(color1.luminosity()).toBe(0.0976213184127798);
  });

  it('should grayscale the color', () => {
    expect(color1.contrast(color2)).toBe(5.308885390786212);
  });

  it('should rotate the color', () => {
    expect(color1.rotate(20).hue()).toBe(31);
  });

  it('should mix the color', () => {
    expect(color1.mix(color2, 0.2).rgb()).toStrictEqual({
      r: 139,
      g: 82,
      b: 47,
    });
  });

  it('should mix the color multiple', () => {
    expect(color1.mixMultiple(color2, 3).map((c) => c.rgb())).toStrictEqual([
      { r: 132, b: 56, g: 93 },
      { r: 98, b: 99, g: 146 },
      { r: 63, b: 142, g: 199 },
    ]);
  });
});
