# NDS Roller

This is my implementation of a dice roller for FFG/EDGE Studio's narrative dice system.

## Usage
### config
> nds.config(options);

| option  | default | effect                                                                                                                                                                             |
| ------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| useFont | false   | By default, nds-roller returns result symbols as generic html symbols. Set this option to `true` if your app uses the Genesys font and result symbols will be returned as letters. |

### roll
```js
// Use dice colors
const dicePool = ['y', 'g', 'g', 'p', 'p', 'b'];

// Or use dice names
const dicePool = ['proficiency', 'ability', 'ability', 'difficulty', 'difficulty', 'boost'];

nds.roll(dicePool);
// [{ name: 'proficiency', face: 12, symbols: 't' }, ...]
```

