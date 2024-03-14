import type { Extensions } from '../extend';
import type { KeywordColor } from '../list/keywords';

import { keywords } from '../list/keywords';
import { listToRgb, rgbToList } from '../helpers/converters/list';

declare module '../colorblender' {
  interface Colorblender {
    keyword(): KeywordColor;
  }
}

const keywordExtension: Extensions = (Class, converters): void => {
  /**
   * @returns the keyword of the color.
   */
  Class.prototype.keyword = function (): KeywordColor {
    return rgbToList<KeywordColor>(this._internalRgb, keywords);
  };

  converters.push({
    format: 'KEYWORD',
    converter: (keyword: KeywordColor, rounded?: boolean) => {
      return listToRgb<KeywordColor>(keyword, keywords, rounded);
    },
  });
};

export default keywordExtension;
