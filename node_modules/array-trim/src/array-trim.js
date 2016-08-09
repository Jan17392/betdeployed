/**
 * Removes empty items from an array. Empty values are '', undefined, null, [],
 *  {}, and objects with no enumerable properties.
 * @param {Array} arr The array to trim.
 * @returns {Array} arr The array with empty values removed.
 */
function arrayTrim (arr) {
    var out;
    var empty = require('atropa-is-empty');
    out = arr.filter(function (item) {
        return !empty(item);
    });
    return out;
}
module.exports = arrayTrim;