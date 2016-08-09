;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
arrayTrim = require('../src/array-trim.js');

},{"../src/array-trim.js":3}],2:[function(require,module,exports){
/**
 * Tells you if the value is empty. Empty values are '', undefined, null, [],
 *  {}, and objects with no enumerable properties.
 * @param {Mixed} item The item to check.
 */
function isEmpty (item) {
    var out = false;
    switch (item) {
        case '' :
        case null :
        case undefined :
            out = true;
        default:
            break;
    }
    try {
        if (Object.keys(item).length === 0) {
            out = true;
        }
    } catch (ignore) {
        // not an object.
    }
    return out;
}
module.exports = isEmpty;
},{}],3:[function(require,module,exports){
/**
 * Removes empty items from an array. Empty items are undefined, null, and ''.
 * @param {Array} arr The array to trim.
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
},{"atropa-is-empty":2}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGFycmF5LXRyaW1cXGRldlxcYnJvd3Nlck1haW4uanMiLCJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGFycmF5LXRyaW1cXG5vZGVfbW9kdWxlc1xcYXRyb3BhLWlzLWVtcHR5XFxzcmNcXGlzLWVtcHR5LmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERlc2t0b3BcXGV4cGVyaW1lbnRzXFxhcnJheS10cmltXFxzcmNcXGFycmF5LXRyaW0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiYXJyYXlUcmltID0gcmVxdWlyZSgnLi4vc3JjL2FycmF5LXRyaW0uanMnKTtcclxuIiwiLyoqXHJcbiAqIFRlbGxzIHlvdSBpZiB0aGUgdmFsdWUgaXMgZW1wdHkuIEVtcHR5IHZhbHVlcyBhcmUgJycsIHVuZGVmaW5lZCwgbnVsbCwgW10sXHJcbiAqICB7fSwgYW5kIG9iamVjdHMgd2l0aCBubyBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSB7TWl4ZWR9IGl0ZW0gVGhlIGl0ZW0gdG8gY2hlY2suXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0VtcHR5IChpdGVtKSB7XHJcbiAgICB2YXIgb3V0ID0gZmFsc2U7XHJcbiAgICBzd2l0Y2ggKGl0ZW0pIHtcclxuICAgICAgICBjYXNlICcnIDpcclxuICAgICAgICBjYXNlIG51bGwgOlxyXG4gICAgICAgIGNhc2UgdW5kZWZpbmVkIDpcclxuICAgICAgICAgICAgb3V0ID0gdHJ1ZTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBvdXQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGlnbm9yZSkge1xyXG4gICAgICAgIC8vIG5vdCBhbiBvYmplY3QuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gaXNFbXB0eTsiLCIvKipcclxuICogUmVtb3ZlcyBlbXB0eSBpdGVtcyBmcm9tIGFuIGFycmF5LiBFbXB0eSBpdGVtcyBhcmUgdW5kZWZpbmVkLCBudWxsLCBhbmQgJycuXHJcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBUaGUgYXJyYXkgdG8gdHJpbS5cclxuICovXHJcbmZ1bmN0aW9uIGFycmF5VHJpbSAoYXJyKSB7XHJcbiAgICB2YXIgb3V0O1xyXG4gICAgdmFyIGVtcHR5ID0gcmVxdWlyZSgnYXRyb3BhLWlzLWVtcHR5Jyk7XHJcbiAgICBvdXQgPSBhcnIuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgcmV0dXJuICFlbXB0eShpdGVtKTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG91dDtcclxufVxyXG5tb2R1bGUuZXhwb3J0cyA9IGFycmF5VHJpbTsiXX0=
;