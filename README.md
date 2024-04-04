# NDS Roller

This is my implementation of a dice roller for FFG/EDGE Studio's narrative dice system.

## Usage

### nds.roll
Provide an array of dice, and get the randomized result. This is a basic implementation using JavaScript's `Math.random()` method. Results are returned in a variety of reports including dice name/face/symbol information, total symbols, symbols after cancelling, and a string reporting the canceled result.

NOTE: dice output order will be the same as the input order.

```js
import nds from 'nds-roller';

// Use dice colors or names, and add symbols
const dicePool = ['proficiency', 'g', 'p', 'b', 's', 'h'];
nds.roll(dicePool);
/**
 * {
 *    dice: [
 *       { name: 'proficiency', face: 12, symbols: 't', image: '...' },
 *       { name: 'ability', face: 7, symbols: 'sa', image: '...' },
 *       { name: 'difficulty', face: 8, symbols: 'fh', image: '...' },
 *       { name: 'boost': face: 2, symbols: '', image: '...' },
 *       { name: 's', face: 's', symbols: 's' },
 *       { name: 'h', face: 'h', symbols: 'h' },
 *    ],
 *    total: { s: 3, a: 1, t: 1, f: 1, h: 2 },
 *    result: { s: 2, t: 1, h: 1 },
 *    summary: '2 success, 1 threat, 1 triumph'
 * }
 */

// Roll d10s and d100s
const numberPool = ['10', '10', '100'];
nds.roll(numberPool);
/**
 * {
 *    dice: [
 *       { name: '10', face: 4, total: 4 },
 *       { name: '10', face: 6, total: 6 },
 *       { name: '100', face: 61, total: 61 },
 *    ],
 *    total: { num: 71 },
 *    result: { num: 71 },
 *    summary: '71'
 * }
 */
```

### nds.toIcons
Turn symbol abbreviations into HTML icons. Acceptable inputs are a string or array of symbol abbreviations, or an object with abbreviation symbol keys and numerical values (such as the `total` and `result` values provided by `roll` (see above)).

WARNING: browser older browsers/devices may not correctly display these icons - use with caution.

```js
import nds from 'nds-roller';

// get icons from a string
nds.toIcons('satfhd'); // ✲▲❂✖▼⦻

// get icons from an array
nds.toIcons(['s', 'a', 't', 'f', 'h', 'd']) // ✲▲❂✖▼⦻

// get icons from a roll result
nds.toIcons(nds.roll(['y', 'g', 'p']).result) // ✲✲▼
```

## Abbreviations
### Dice
| abbreviation | full name   | reason   |
| ------------ | ----------- | -------- |
| y            | proficiency | [y]ellow |
| g            | ability     | [g]reen  |
| b            | boost       | [b]lue   |
| r            | challenge   | [r]ed    |
| p            | difficulty  | [p]urple |
| k            | setback     | blac[k]  |

### Symbols
| abbreviation | full name   |
| ------------ | ----------- |
| s            | [s]uccess   |
| a            | [a]dvantage |
| t            | [t]riumph   |
| f            | [f]ailure   |
| h            | t[h]reat    |
| d            | [d]espair   |