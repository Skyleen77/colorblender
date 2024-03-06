<div align="center">
  <p></p>
  <img src="./logo.png" width="300" />
  <p></p>

  <p>A powerful and fully typed color library.</p>
</div>

## Features

- **Fully typed** - Written in TypeScript
- **Tiny** - Less than 10kb gzipped
- **Fast** - 3x faster than the most popular color library
- **Simple** - Chainable methods
- **Immutable** - All methods return a new instance
- **Complete** - Supports a lot of color models
- **Conversion** - Convert between any of the supported color models
- **Plugins** - Extend the library with custom color models
- **Support** - Support all browsers and Node.js

## Installation

```bash
npm install colorblender
```

## Import

```typescript
import { colorblender } from 'colorblender';
```

## Usage

### Create colorblender instance

```typescript
// HEX
colorblender('#FFF');
colorblender('#FFFFFF');
colorblender('#FFFFFFFF');
// RGB
colorblender({ r: 255, g: 255, b: 255 });
colorblender({ r: 255, g: 255, b: 255, a: 1 });
// HSL
colorblender({ h: 360, s: 100, l: 100 });
colorblender({ h: 360, s: 100, l: 100, a: 1 });
// HSV
colorblender({ h: 360, s: 100, v: 100 });
colorblender({ h: 360, s: 100, v: 100, a: 1 });
// HWB
colorblender({ h: 0, s: 0, i: 1 });
colorblender({ h: 0, s: 0, i: 1, a: 1 });
// HCG
colorblender({ h: 0, w: 100, b: 0 });
colorblender({ h: 0, w: 100, b: 0, a: 1 });
// HSI
colorblender({ h: 360, c: 0, g: 100 });
colorblender({ h: 360, c: 0, g: 100, a: 1 });
// CMYK
colorblender({ c: 0, m: 0, y: 0, k: 0 });
colorblender({ c: 0, m: 0, y: 0, k: 0, a: 1 });
// XYZ
colorblender({ x: 95.047, y: 100, z: 108.883 });
colorblender({ x: 95.047, y: 100, z: 108.883, a: 1 });
// LAB
colorblender({ l: 100, a: 0, b: 0 });
colorblender({ l: 100, a: 0, b: 0, a: 1 });
// LCH
colorblender({ l: 100, c: 0, h: 0 });
colorblender({ l: 100, c: 0, h: 0, a: 1 });
```

### Methods

<details>
<summary><b><code>.hex()</code></b></summary><br>

```typescript
colorblender({ r: 255, g: 255, b: 255 }).hex(); // #FFFFFF
colorblender({ r: 255, g: 255, b: 255, a: 0.5 }).hexa(); // #FFFFFF80
```

</details>

## Issues

Please file an issue for bugs, missing documentation, or unexpected behavior.

[File an issue](https://github.com/Skyleen77/colorblender/issues)

## License

MIT
