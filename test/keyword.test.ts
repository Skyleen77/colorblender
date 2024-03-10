import { colorblender, extend } from '../src';
import keywordExtension from '../src/extensions/keyword';

const color1 = colorblender({ r: 167, g: 40, b: 13 });

extend([keywordExtension]);

describe('name extension', () => {
  it('should converts color to Name correctly', () => {
    expect(color1.keyword()).toStrictEqual('firebrick');
  });

  it('should create color correctly with Name entry', () => {
    expect(colorblender('olive').hex()).toStrictEqual('#808000');
  });
});
