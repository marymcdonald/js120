//q1
let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo); // 2, since baz.foo = 1 + qux.foo = 1


Naturally, qux.foo returns 1 since qux has a foo property with that value.
However, baz doesn't have its "own" copy of the foo property. Thus, JavaScript
searches the prototype chain for a foo property and finds the property in qux.
Thus, baz.foo is also 1, and the sum of the two values is 2.


//q2
let qux = { foo: 1 };
let baz = Object.create(qux);
baz.foo = 2;

console.log(baz.foo + qux.foo);

//baz creates its own foo property equal to 2 on line 17
//so baz.foo + qux.foo = 1 + 2 = 3

// This code is very similar to that in problem 1. However, this time, we
// assign baz.foo to a value of 2. Property assignment doesn't use the prototype
// chain; instead, it creates a new property in the baz object named foo.

// When we add baz.foo and qux.foo together, baz.foo returns the value of its
// "own" foo property, while qux.foo returns the value of its "own" foo
// property.
// Thus, the result is 3.

//q3
let qux = { foo: 1 };
let baz = Object.create(qux);
qux.foo = 2;

console.log(baz.foo + qux.foo); //baz.foo = 2 + qux.foo = 2, so 4

//qux.foo is reassigned to the value 2
//baz.foo is still taken from the prototype chain since baz does not have its
//own foo property

// This code is also very similar to problem 1. This time, though, we assign
// the value 2 to qux.foo. Since baz doesn't have its "own" copy of the foo
// property, JavaScript uses the prototype chain to look up baz.foo, and it
// finds
// the foo property in qux. The result is equivalent to 2 + 2, or 4.

// An important consideration when dealing with prototypes is that objects hold
// a reference to their prototype objects. If the object's prototype changes in
// some way, the changes are observable in the inheriting object as well.


//q4

// Write a function that searches the prototype chain of an object for a given
// property and assigns it a new value. If the property does not exist in any of
// the prototype objects, the function should do nothing. The following code
// should work as shown:

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

function assignProperty(obj, prop, value) {
  let currentObj = obj;

  while (!currentObj.hasOwnProperty(prop)) {
    currentObj = Object.getPrototypeOf(currentObj);

    if (currentObj.hasOwnProperty(prop)) {
      currentObj[prop] = value;
      break;
    }

    if (Object.is(currentObj, Object.prototype)) break;
  }

}

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2


assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false


//q5

// If foo is an arbitrary object, will these loops always log the same results
// to the console? Explain why they do or do not. If they don't always log the
// same information, show an example of when the results differ.

// A for/in loop iterates over all of an object's properties, including those
// in its prototype chain.
// Object.keys only returns an object's own properties, not any prototype
// properties.

let mary = {
  poketo: 3,
};

let foo = Object.create(mary);

for (let property in foo) {
  console.log(`${property}: ${foo[property]}`);
}

Object.keys(foo).forEach(property => {
  console.log(`${property}: ${foo[property]}`);
});

//the for/in loop will have one property logged to the console,
//while the second loop will have none.

// The two loops produce the same results only when the prototype chain doesn't
// contain enumerable properties.

//q6
// How do you create an object that doesn't have a prototype? How can you
// determine whether an object has a prototype?

//object without a prototype
let a = Object.create(null);

//an object does not have a prototype if
// Object.getPrototypeOf(obj) === null

