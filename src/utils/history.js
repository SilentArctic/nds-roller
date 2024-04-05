export const log = [];

/**
 * Add a roll to the log stack
 * @param {Object} options
 * @param {Object} options.result - `roll` output
 * @param {string} options.note - a message to attach to the roll
 */
export const postLog = ({ outcome }) => {
   log.unshift({
      outcome,
      timestamp: new Date(),
   });
};
