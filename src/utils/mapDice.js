import DICE from '../constants/dice.constants.js';

/**
 * Get the abbreviated letter code of a die from its name.
 * @param {('proficiency'|'ability'|'boost'|'challenge'|'difficulty'|'setback')} name
 *    - name of a die
 * @returns {('y'|'g'|'b'|'r'|'p'|'k')} - letter code matching the die name
 */
export function getDieLetter(name) {
   const letter = DICE.DiceLetterMap[name];
   if (letter) return letter;

   // eslint-disable-next-line no-console
   console.error(`"${name}" is not a valid die name.`);
   return '';
}

/**
 * Get the full name of a die from it's abbreviated letter code
 * @param {('y'|'g'|'b'|'r'|'p'|'k')} letter - Any die letter
 * @returns {('proficiency'|'ability'|'boost'|'challenge'|'difficulty'|'setback')}
 *    - die name matching letter
 */
export function getDieName(letter) {
   const name = DICE.DiceNameMap[letter];
   if (name) return name;

   // eslint-disable-next-line no-console
   console.error(`"${letter}" is not a valid die letter.`);
   return '';
}
