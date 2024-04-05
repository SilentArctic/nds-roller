import ICONS from '../constants/icons.constants.js';

/**
 * Get raw html symbols from a provided input
 * @param {SymbolTotal|array|string} input -
 * @returns {string} - string of icons
 */
function toIcons(input) {
   let result = null;

   if (typeof input === 'string') {
      result = input
         .split('')
         .map((char) => ICONS[char] || char)
         .join('');
   } else if (Array.isArray(input)) {
      result = input
         .map((char) => ICONS[char] || char)
         .join('');
   } else if (typeof input === 'object') {
      result = Object.keys(input).reduce((current, nextChar) => {
         if (ICONS[nextChar]) {
            return current + Array(input[nextChar])
               .fill(ICONS[nextChar])
               .join('');
         }
         return current;
      }, '');
   } else {
      // eslint-disable-next-line no-console
      console.error('Invalid input');
   }

   return result;
}

export default toIcons;
