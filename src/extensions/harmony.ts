import type { Extensions } from '../extend';

const harmonyTypes: Record<string, number[]> = {
  analogous: [-30, 0, 30],
  complementary: [0, 180],
  'split-complementary': [0, 150, 210],
  'double-split-complementary': [-30, 0, 30, 150, 210],
  tetradic: [0, 90, 180, 270],
  triadic: [0, 120, 240],
  rectangle: [0, 60, 180, 240],
};

type HarmonyType = keyof typeof harmonyTypes;

declare module '../colorblender' {
  interface Colorblender {
    harmonies(type: HarmonyType): Colorblender[];
  }
}

const harmonyExtension: Extensions = (Class): void => {
  /**
   * @param type The type of harmony to create.
   * @returns the colors of the harmony.
   */
  Class.prototype.harmonies = function (type) {
    return harmonyTypes[type].map((shift) => this.rotate(shift));
  };
};

export default harmonyExtension;
