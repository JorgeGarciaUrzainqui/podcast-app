/**
 * Saves a timestamp number into the specified key in localstorage
 *
 * @param {string} item - the localstorage item to save the information
 * @param {number} timestamp - a valid timestamp number
 */

export function saveItemTimestamp(item, timestamp) {
  localStorage.setItem(item, timestamp.toString());
}

/**
 * Retrieves a timestamp number from a specific key in localstorage
 *
 * @param {string} item - the localstorage item to get the information
 * @returns number | undefined - returns the timestamp if item is defined, return undefined otherwise
 */
export function loadItemTimestamp(item) {
  const value = localStorage.getItem(item);

  if (!value) {
    return undefined;
  }

  return Number(value);
}
