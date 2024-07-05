/**
 * Converts an object of key-value pairs into a query string.
 *
 * @param {Object} data - An object containing key-value pairs to be converted.
 * @param {string | number | boolean} data[k] - The value associated with each key can be a string, number, or boolean.
 * @returns {string} The resulting query string.
 *
 * @example
 * const params = { name: "John", age: 30, active: true };
 * const queryString = querify(params);
 * // Output: "name=John&age=30&active=true"
 */
const querify = (data: { [k: string]: string | number | boolean }): string => {
  return Object.keys(data)
    .map((k) => `${k}=${data[k].toString()}`)
    .join("&");
};

export default querify;
