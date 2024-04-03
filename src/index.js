import * as Dice from './constants/dice.constants';
import Faces from './constants/faces.constants';
import Icons from './constants/icons.constants';

/**
 * @typedef {Object} DieResult
 * @property {string} name - die name
 * @property {number} face - face determined by the roll
 * @property {string} symbols - rolled symbols
 * @property {number} [total] - value of numeric dice
 */

/**
 * @typedef {Object} SymbolTotal
 * @property {number} s - number of success symbols
 * @property {number} a - number of advantage symbols
 * @property {number} t - number of triumph symbols
 * @property {number} f - number of failure symbols
 * @property {number} h - number of threat symbols
 * @property {number} d - number of despair symbols
 * @property {number} num - sum of numeric dice
 */

/**
 * @typedef {Object} RollResult
 * @property {DieResult[]} dice -
 * @property {SymbolTotal} total - total symbols, uncanceled
 * @property {SymbolTotal} summary - total symbols, after canceling
 * @property {string} result - Human-readable output
 */

/**
 * Roll given dice and return result
 * @param {(
 *    'boost'|'b'|'setback'|'k'|'ability'|'g'|'difficulty'|'p'|'proficiency'|'y'|'challenge'|'r'|
 *    '10'|'100'|'s'|'a'|'t'|'f'|'h'|'d'
 * )[]} dicePool - Dice to be rolled
 * @returns {RollResult} - Result of rolled dice from given dicePool
 */
function roll(dicePool) {
   if (!Array.isArray(dicePool)) {
      throw new Error('[nds] `roll` argument must be an array.');
   }

   const diceResults = [];
   dicePool.forEach((die) => {
      if (!Dice.diceNames.includes(die)) {
         // eslint-disable-next-line no-console
         console.error(`"${die}" is not a valid die type and will be skipped. Valid options are: ${Dice.diceNames.join(', ')}`);
         return;
      }

      if (Dice.numbers.includes(die)) {
         /* handle d10s */
         diceResults.push({
            name: die,
            total: Math.floor(Math.random() * Number(die) + 1),
            symbols: '',
         });
      } else if (Dice.symbols.includes(die)) {
         /* handle symbols */
         diceResults.push({
            name: die,
            face: die,
            symbols: die,
         });
      } else {
         /* handle dice */
         let dieName = die;
         if (die.length === 1) {
            dieName = Dice.diceMapper[die];
         }

         const faceCount = Object.keys(Faces[dieName]).length;
         const resultFace = Math.floor(Math.random() * faceCount) + 1;
         const resultSymbols = Faces[dieName][resultFace];

         diceResults.push({
            name: dieName,
            face: resultFace,
            symbols: resultSymbols,
         });
      }
   });

   /* get all symbol totals */
   const total = diceResults.reduce((current, nextDie) => ({
      s: current.s + (nextDie.symbols.match(/s/g) || []).length,
      a: current.a + (nextDie.symbols.match(/a/g) || []).length,
      t: current.t + (nextDie.symbols.match(/t/g) || []).length,
      f: current.f + (nextDie.symbols.match(/f/g) || []).length,
      h: current.h + (nextDie.symbols.match(/h/g) || []).length,
      d: current.d + (nextDie.symbols.match(/d/g) || []).length,
      num: current.num + (nextDie.total || 0),
   }), { s: 0, a: 0, t: 0, f: 0, h: 0, d: 0, num: 0 });

   /* add t/d to s/f; cancel s/f and a/h */
   const result = {};
   if (total.num) result.num = total.num;
   if (total.t) result.t = total.t;
   if (total.d) result.d = total.d;
   if (total.s + total.t > total.f + total.d) {
      result.s = total.s + total.t - total.f;
   } else if (total.f + total.d > total.s + total.t) {
      result.f = total.f + total.d - total.s;
   }
   if (total.a > total.h) {
      result.a = total.a - total.h;
   } else if (total.h > total.a) {
      result.h = total.h - total.a;
   }

   /* create readable result string */
   let summary = [];
   if (result.s) summary.push(`${result.s} ${Dice.symbolMapper.s}`);
   else if (result.f) summary.push(`${result.f} failure`);
   if (result.a) summary.push(`${result.a} advantage`);
   else if (result.h) summary.push(`${result.h} threat`);
   if (result.t) summary.push(`${result.t} triumph`);
   if (result.d) summary.push(`${result.d} despair`);
   if (result.num) summary.push(result.num);
   summary = summary.join(', ');

   return {
      dice: diceResults,
      total,
      result,
      summary,
   };
}

/**
 * Get raw html symbols from a provided input
 * @param {SymbolTotal|array|string} input -
 * @returns {string} - string of icons
 */
function icons(input) {
   let result = null;

   if (typeof input === 'string') {
      result = input
         .split('')
         .map((char) => Icons[char] || char)
         .join('');
   } else if (Array.isArray(input)) {
      result = input
         .map((char) => Icons[char] || char)
         .join('');
   } else if (typeof input === 'object') {
      result = Object.keys(input).reduce((current, nextChar) => {
         if (Icons[nextChar]) {
            return current + Array(input[nextChar])
               .fill(Icons[nextChar])
               .join('');
         }
         return current;
      }, '');
   }

   // eslint-disable-next-line no-console
   console.error('Invalid input');
   return result;
}

export default {
   roll,
   icons,
};
