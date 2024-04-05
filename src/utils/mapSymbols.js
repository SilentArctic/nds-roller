import DICE from '../constants/dice.constants.js';

/**
 * Get the letter code of a symbol from it's name.
 * @param {('success'|'advantage'|'triumph'|'failure'|'threat'|'despair')} name - Symbol name
 * @returns {('s'|'a'|'t'|'f'|'h'|'d')} - Symbol letter code
 */
export function getSymbolLetter(name) {
   const letter = DICE.SymbolLetterMap[name];
   if (letter) return letter;

   // eslint-disable-next-line no-console
   console.error(`"${name}" is not a valid symbol name.`);
   return '';
}

/**
 * Get the name of a symbol from its abbreviated letter code.
 * @param {('s'|'a'|'t'|'f'|'h'|'d')} letter - The letter code of the symbol
 * @returns {('success'|'advantage'|'triumph'|'failure'|'threat'|'despair')} - Name of the symbol
 */
export function getSymbolName(letter) {
   const name = DICE.SymbolNameMap[letter];
   if (name) return name;

   // eslint-disable-next-line no-console
   console.error(`"${letter}" is not a valid symbol letter.`);
   return '';
}
