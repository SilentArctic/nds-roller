import Faces from './constants/faces.constants';
import * as Dice from './constants/dice.constants';

/**
 * @typedef {Object} RollResult
 * @property {string} faces - result of each die
 * @property {string} symbols - total symbols after any cancellations
 */

/**
 * Roll given dice and return result
 * @param {(
 *    'boost'|'b'|'setback'|'k'|'ability'|'g'|'difficulty'|'p'|'proficiency'|'y'|'challenge'|'r'|
 *    '10'|'100'|'s'|'a'|'t'|'f'|'h'|'d')[]
 * } dicePool - Dice to be rolled
 * @returns {RollResult} - Result of rolled dice from given dicePool
 */
function roll(dicePool) {
   if (!Array.isArray(dicePool)) {
      throw new Error('[nds] `roll` argument must be an array.');
   }

   const diceResults = [];
   dicePool.forEach((die) => {
      if (!Dice.diceNames.includes(die)) {
         throw new Error(`${die} is not a valid die type. Valid options are: ${Dice.diceNames.join(', ')}`);
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

   const total = diceResults.reduce((current, nextDie) => ({
      s: current.s + (nextDie.symbols.match(/s/g) || []).length,
      a: current.a + (nextDie.symbols.match(/a/g) || []).length,
      t: current.t + (nextDie.symbols.match(/t/g) || []).length,
      f: current.f + (nextDie.symbols.match(/f/g) || []).length,
      h: current.h + (nextDie.symbols.match(/h/g) || []).length,
      d: current.d + (nextDie.symbols.match(/d/g) || []).length,
      num: total.num + (nextDie.total || 0),
   }), { s: 0, a: 0, t: 0, f: 0, h: 0, d: 0, num: 0 });

   const summary = {};
   if (total.num) summary.num = total.num;
   if (total.t) summary.t = total.t;
   if (total.d) summary.d = total.d;
   if (total.s + total.t > total.f + total.d) {
      summary.s = total.s + total.t - total.f;
   } else if (total.f + total.d > total.s + total.t) {
      summary.f = total.f + total.d - total.s;
   }
   if (total.a > total.h) {
      summary.a = total.a - total.h;
   } else if (total.h > total.a) {
      summary.h = total.h - total.a;
   }

   let result = [];
   if (summary.s) result.push(`${summary.s} ${Dice.symbolMapper.s}`);
   else if (summary.f) result.push(`${summary.f} failure`);
   if (summary.a) result.push(`${summary.a} advantage`);
   else if (summary.h) result.push(`${summary.h} threat`);
   if (summary.t) result.push(`${summary.t} triumph`);
   if (summary.d) result.push(`${summary.d} despair`);
   if (summary.num) result.push(summary.num);

   result = result.join(', ');

   return {
      dice: diceResults,
      total,
      summary,
      result,
   };
}

export default {
   roll,
};
