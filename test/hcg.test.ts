import { colorblender, extend } from '../src';
import hcgExtension from '../src/extensions/hcg';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([hcgExtension]);

describe('hcg extension', () => {
  it('should converts color to HCG correctly', () => {
    expect(color1.hcg()).toStrictEqual({
      h: 11,
      c: 60,
      g: 13,
      a: 1,
    });
  });

  it('should create color correctly with HCG entry', () => {
    expect(colorblender({ h: 11, c: 60, g: 13 }).rgb()).toStrictEqual({
      r: 166,
      g: 41,
      b: 13,
      a: 1,
    });
  });
});
