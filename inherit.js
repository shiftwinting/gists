/**
 * create a object whose prototype is set to p
 */
function inherit(p) {
  if (p == null) throw TypeError();
  if (Object.create) return Object.create(p);

  var t = typeof p;

  if (t !== 'object' && t !== 'function') throw TypeError();

  function f() {};
  f.prototype = p;
  return new f();
}

var a = { x: 1 };
var b = inherit(a);

b.y = 2;

console.log('a.x:', a.x);
console.log('b.x:', b.x);
console.log('b.y:', b.y);

b.x = 3;  // create a new x property, hide that of a

console.log('change b.x to 3');
console.log('a.x:', a.x);
console.log('b.x:', b.x);
