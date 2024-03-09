import { colorblender, extend } from '../src';
import harmonyExtension from '../src/extensions/harmony';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([harmonyExtension]);

describe('harmony extension', () => {
  it('should harmonies analogous', () => {
    expect(color1.harmonies('analogous').map((c) => c.hex())).toStrictEqual([
      '#A70D3E',
      '#A7290D',
      '#A7760D',
    ]);
  });

  it('should harmonies complementary', () => {
    expect(color1.harmonies('complementary').map((c) => c.hex())).toStrictEqual(
      ['#A7290D', '#0D8BA7'],
    );
  });

  it('should harmonies split complementary', () => {
    expect(
      color1.harmonies('split-complementary').map((c) => c.hex()),
    ).toStrictEqual(['#A7290D', '#0DA776', '#0D3EA7']);
  });

  it('should harmonies double split complementary', () => {
    expect(
      color1.harmonies('double-split-complementary').map((c) => c.hex()),
    ).toStrictEqual(['#A70D3E', '#A7290D', '#A7760D', '#0DA776', '#0D3EA7']);
  });

  it('should harmonies tetradic', () => {
    expect(color1.harmonies('tetradic').map((c) => c.hex())).toStrictEqual([
      '#A7290D',
      '#3EA70D',
      '#0D8BA7',
      '#760DA7',
    ]);
  });

  it('should harmonies triadic', () => {
    expect(color1.harmonies('triadic').map((c) => c.hex())).toStrictEqual([
      '#A7290D',
      '#0DA729',
      '#290DA7',
    ]);
  });

  it('should harmonies rectangle', () => {
    expect(color1.harmonies('rectangle').map((c) => c.hex())).toStrictEqual([
      '#A7290D',
      '#8BA70D',
      '#0D8BA7',
      '#290DA7',
    ]);
  });
});
