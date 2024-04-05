const Numbers = [
   '10',
   '100',
];

const Symbols = [
   's',
   'a',
   't',
   'f',
   'h',
   'd',
];

const DiceNames = [
   'boost', 'b',
   'setback', 'k',
   'ability', 'g',
   'difficulty', 'p',
   'proficiency', 'y',
   'challenge', 'r',
   ...Numbers,
   ...Symbols,
];

const DiceNameMap = {
   b: 'boost',
   k: 'setback',
   g: 'ability',
   p: 'difficulty',
   y: 'proficiency',
   r: 'challenge',
};

const DiceLetterMap = {
   boost: 'b',
   setback: 'k',
   ability: 'g',
   difficulty: 'p',
   proficiency: 'y',
   challenge: 'r',
};

const SymbolNameMap = {
   s: 'success',
   a: 'advantage',
   t: 'triumph',
   f: 'failure',
   h: 'threat',
   d: 'despair',
};

const SymbolLetterMap = {
   success: 's',
   advantage: 'a',
   triumph: 't',
   failure: 'f',
   threat: 'h',
   despair: 'd',
};

export default {
   Numbers,
   Symbols,
   DiceNames,
   DiceNameMap,
   DiceLetterMap,
   SymbolNameMap,
   SymbolLetterMap,
};
