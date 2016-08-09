;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
isEmpty = require('../src/is-empty.js');
},{"../src/is-empty.js":2}],2:[function(require,module,exports){
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
},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGthc3RvclxcRGVza3RvcFxcZXhwZXJpbWVudHNcXGlzLWVtcHR5XFxkZXZcXGJyb3dzZXJNYWluLmpzIiwiQzpcXFVzZXJzXFxrYXN0b3JcXERlc2t0b3BcXGV4cGVyaW1lbnRzXFxpcy1lbXB0eVxcc3JjXFxpcy1lbXB0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJpc0VtcHR5ID0gcmVxdWlyZSgnLi4vc3JjL2lzLWVtcHR5LmpzJyk7IiwiLyoqXHJcbiAqIFRlbGxzIHlvdSBpZiB0aGUgdmFsdWUgaXMgZW1wdHkuIEVtcHR5IHZhbHVlcyBhcmUgJycsIHVuZGVmaW5lZCwgbnVsbCwgW10sXHJcbiAqICB7fSwgYW5kIG9iamVjdHMgd2l0aCBubyBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSB7TWl4ZWR9IGl0ZW0gVGhlIGl0ZW0gdG8gY2hlY2suXHJcbiAqL1xyXG5mdW5jdGlvbiBpc0VtcHR5IChpdGVtKSB7XHJcbiAgICB2YXIgb3V0ID0gZmFsc2U7XHJcbiAgICBzd2l0Y2ggKGl0ZW0pIHtcclxuICAgICAgICBjYXNlICcnIDpcclxuICAgICAgICBjYXNlIG51bGwgOlxyXG4gICAgICAgIGNhc2UgdW5kZWZpbmVkIDpcclxuICAgICAgICAgICAgb3V0ID0gdHJ1ZTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHRyeSB7XHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBvdXQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGlnbm9yZSkge1xyXG4gICAgICAgIC8vIG5vdCBhbiBvYmplY3QuXHJcbiAgICB9XHJcbiAgICByZXR1cm4gb3V0O1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gaXNFbXB0eTsiXX0=
;