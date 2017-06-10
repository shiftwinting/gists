'use strict'

/**
 * 3 ways to traverse properties in es5:
 *
 * for...in...: all enumerable properties(own and inherited)
 * Object.keys: all enumerable and own properties
 * Object.getOwnPropertyNames: all own properties(enumerable and non-enumerable)
 *
 * property descriptor:
 *
 * normal data property:
 *    name, value, writable, enumerable, configurable
 * accessor property:
 *    name, get, set, enumerable, configurable
 *
 *  writable:
 *    normal data property: if we can change the value attribute
 *    accessor property: if set function is defined
 *  configurable:
 *    governs if we can change other attributes(configurable, writable, enumerable),
 *    but not value which is controlled by writable
 *    and if the attribute can be deleted
 *    
 *    but writable is special:
 *      even if a is not configurable, you can change a's writable from true to
 *      false(off cource, change from false to true is not allowed)
 *
 *      even if a is not writable, but if a is also configurable, we can still change a's
 *      value(because we can change's writable from false to true and then change its value)
 *
 * how to define a data property:
 *    var a = { x: 1 }
 *    or:
 *    var a = {}
 *    Object.defineProperty(a, {
 *      value: 1,
 *      writable: true,
 *      enumerable: true,
 *      configurable: true
 *    })
 * how to define a accessor:
 *    a.$n = 0
 *    Object.defineProperty(a, {
 *      get next() { return this.$n++; },
 *      set next(n) { this.$n = n; }
 *    })
 *
 * how to get property attributes:
 *    Object.getOwnPropertyDescriptor(o)
 */

var o = {
  d: 1,

  get a() { return this.d++; },
  set a(dd) { this.d = dd; }
};

console.log(Object.keys(o)); // ['d', 'a']

Object.defineProperty(o, 'a', {
  value: 3,
  writable: false
})

console.log(Object.getOwnPropertyDescriptor(o, 'a'));
//o.a = 4;  // error

// we can still change a's value 
Object.defineProperty(o, 'a', {
  value: 4,
})
console.log(o.a); // 4

Object.defineProperty(o, 'a', {
  writable: true,
  configurable: false
})

// change writable from true to false even if it's not configurable
Object.defineProperty(o, 'a', {
  writable: false,
})
