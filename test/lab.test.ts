import { colorblender, extend } from '../src';
import labExtension from '../src/extensions/lab';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([labExtension]);

describe('lab extension', () => {
  it('should converts color to LAB correctly', () => {
    expect(color1.lab()).toStrictEqual({
      l: 37,
      a: 50,
      b: 45,
      alpha: 1,
    });
  });

  it('should create color correctly with LAB entry', () => {
    expect(
      colorblender({ l: 37, a: 50, b: 45, alpha: 0.5 }).rgb(),
    ).toStrictEqual({
      r: 165,
      g: 39,
      b: 13,
      a: 0.5,
    });
  });
});
