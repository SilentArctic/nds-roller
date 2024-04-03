export const numbers = [
   '10',
   '100',
];

export const symbols = [
   's',
   'a',
   't',
   'f',
   'h',
   'd',
];

export const diceNames = [
   'boost', 'b',
   'setback', 'k',
   'ability', 'g',
   'difficulty', 'p',
   'proficiency', 'y',
   'challenge', 'r',
   ...numbers,
   ...symbols,
];

export const diceMapper = {
   b: 'boost',
   k: 'setback',
   g: 'ability',
   p: 'difficulty',
   y: 'proficiency',
   r: 'challenge',
};

export const symbolMapper = {
   s: 'success',
   a: 'advantage',
   t: 'triumph',
   f: 'failure',
   h: 'threat',
   d: 'despair',
};
