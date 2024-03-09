import { colorblender, extend } from '../src';
import mixExtension from '../src/extensions/mix';

const color1 = colorblender({ r: 167, g: 40, b: 13 });
const color2 = colorblender({ r: 28, g: 252, b: 185 });

extend([mixExtension]);

describe('mix extension', () => {
  it('should mix the colors', () => {
    expect(color1.mix(color2).hex()).toBe('#629263');
  });

  it('should mix the colors 5 times', () => {
    expect(color1.mixPalette(color2, 5).map((c) => c.hex())).toStrictEqual([
      '#904B2A',
      '#796F46',
      '#629263',
      '#4AB580',
      '#33D99C',
    ]);
  });

  it('should tint the color 5 times', () => {
    expect(color1.tints(5).map((c) => c.hex())).toStrictEqual([
      '#B64C35',
      '#C4705E',
      '#D39486',
      '#E2B7AE',
      '#F0DBD7',
    ]);
  });

  it('should shade the color 5 times', () => {
    expect(color1.shades(5).map((c) => c.hex())).toStrictEqual([
      '#8B210B',
      '#6F1B09',
      '#541407',
      '#380D04',
      '#1C0702',
    ]);
  });

  it('should tone the color 5 times', () => {
    expect(color1.tones(5).map((c) => c.hex())).toStrictEqual([
      '#A13720',
      '#9A4533',
      '#945447',
      '#8D635A',
      '#87716D',
    ]);
  });
});
