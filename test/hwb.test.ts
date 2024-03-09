import { colorblender, extend } from '../src';
import hwbExtension from '../src/extensions/hwb';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([hwbExtension]);

describe('hwb extension', () => {
  it('should whiten the color', () => {
    expect(color1.whiten(0.2).rgb()).toStrictEqual({
      r: 167,
      b: 16,
      g: 42,
      a: 1,
    });
  });

  it('should darken the color', () => {
    expect(color1.blacken(0.2).rgb()).toStrictEqual({
      r: 149,
      b: 13,
      g: 37,
      a: 1,
    });
  });

  it('should converts color to HWB correctly', () => {
    expect(color1.hwb()).toStrictEqual({
      h: 11,
      w: 5,
      b: 35,
      a: 1,
    });
  });

  it('should create color correctly with HWB entry', () => {
    expect(colorblender({ h: 11, w: 5, b: 35 }).rgb()).toStrictEqual({
      r: 166,
      g: 41,
      b: 13,
      a: 1,
    });
  });
});
