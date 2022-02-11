//q1
// What method can we use to bind a function permanently to a particular
// execution context?

//The `bind` method permanently binds a function to a particular execution
//context.

//q2
//  What will the following code log to the console?
let obj = {
  message: 'JavaScript',
};

function foo() {
  console.log(this.message);
}

foo.bind(obj);

// It should log 'JavaScript'

/*
answer:
Nothing. Unlike `call` and `apply`, `bind` doesn't invoke the function used to
call it. Instead, it returns a new function that is permanently bound to the
context argument.
*/

//q3
//  What will the following code log to the console?
let obj = {
  a: 2,
  b: 3,
};

function foo() {
  return this.a + this.b;
}

let bar = foo.bind(obj);

console.log(foo());
console.log(bar());

//It should log:
//5
//[Function foo] or something like that, since it returns a function

/*
answer:
NaN
5
The function foo looks for properties a and b on the global object since it is
invoked as a function and this is bound to the global object. Both this.a and
this.b evaluate to undefined, resulting in a NaN value. bar, however, is
explicitly bound to obj on line 10, and, as a result, references that object's
a and b properties when it is invoked.

If you use strict mode (discussed in more detail in JS130) to run the code, it
will raise a TypeError: Cannot read property 'a' of undefined error when
calling foo().
*/

//q4
//  What will the code below log to the console?
let positivity = {
  message: 'JavaScript makes sense!',
};

let negativity = {
  message: 'JavaScript makes no sense!',
};

function foo() {
  console.log(this.message);
}

let bar = foo.bind(positivity);

negativity.logMessage = bar;
negativity.logMessage();

//this should log 'JavaScript makes sense!' because bar is explicitly bound to
//the positivity object on line 78

/*
answer:
Since bar is bound to positivity as the return value of the bind invocation on
line 78, positivity's property message is logged by the function call on the
last line, despite the fact that the function is invoked as a method on the
negativity object.
*/

//q5
// What will the code below output?
let obj = {
  a: 'Amazebulous!',
};
let otherObj = {
  a: "That's not a real word!",
};

function foo() {
  console.log(this.a);
}

let bar = foo.bind(obj);

bar.call(otherObj);

//bar is bound to the obj object, so it's property a, 'Amazebulous', will be
//logged. This is despite bar.call being invoked as a method on the otherObj
//object.

/*
answer:
Once a function's context gets bound using bind, its context can't be changed
even with call and apply. In keeping with this, the last line of our code
outputs "Amazebulous!", because the function bar's context has been permanently
bound to obj.
*/