import { colorblender, extend } from '../src';
import harmonyExtension from '../src/extensions/harmony';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([harmonyExtension]);

describe('harmony extension', () => {
  it('should harmonies analogous', () => {
    expect(color1.harmonies('analogous').map((c) => c.hex())).toStrictEqual([
      '#A70D3F',
      '#A7280D',
      '#A7750D',
    ]);
  });

  it('should harmonies complementary', () => {
    expect(color1.harmonies('complementary').map((c) => c.hex())).toStrictEqual(
      ['#A7280D', '#0D8CA7'],
    );
  });

  it('should harmonies split complementary', () => {
    expect(
      color1.harmonies('split-complementary').map((c) => c.hex()),
    ).toStrictEqual(['#A7280D', '#0DA775', '#0D3FA7']);
  });

  it('should harmonies double split complementary', () => {
    expect(
      color1.harmonies('double-split-complementary').map((c) => c.hex()),
    ).toStrictEqual(['#A70D3F', '#A7280D', '#A7750D', '#0DA775', '#0D3FA7']);
  });

  it('should harmonies tetradic', () => {
    expect(color1.harmonies('tetradic').map((c) => c.hex())).toStrictEqual([
      '#A7280D',
      '#3FA70D',
      '#0D8CA7',
      '#750DA7',
    ]);
  });

  it('should harmonies triadic', () => {
    expect(color1.harmonies('triadic').map((c) => c.hex())).toStrictEqual([
      '#A7280D',
      '#0DA728',
      '#280DA7',
    ]);
  });

  it('should harmonies rectangle', () => {
    expect(color1.harmonies('rectangle').map((c) => c.hex())).toStrictEqual([
      '#A7280D',
      '#8CA70D',
      '#0D8CA7',
      '#280DA7',
    ]);
  });
});
