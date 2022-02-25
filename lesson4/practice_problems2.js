function Greeting() {}

Greeting.prototype.greet = function(message) {
  console.log(message);
};

function Hello() {}

Hello.prototype = Object.create(Greeting.prototype);

Hello.prototype.hi = function() {
  this.greet('Hello!');
};

function Goodbye() {}

Goodbye.prototype = Object.create(Greeting.prototype);

Goodbye.prototype.bye = function() {
  this.greet("Goodbye");
};

// What happens in each of the following cases?

//q1
let hello = new Hello();
hello.hi();

// hello's prototype object inherits from Hello's prototype. It invokes the hi()
// method, which is available to it because the request is delegated to Hello's
// prototype object, where the method can be found.
// It logs 'Hello!' to the console.

//q2
let hello = new Hello();
hello.bye();

// This returns an error because the bye method is not in hello's prototype chain.

/*
answer:
This code raises a TypeError. Neither Hello.prototype nor its prototype,
Greeting.prototype, have a bye method defined.
*/

//q3
let hello = new Hello();
hello.greet();

// This logs '' to the console. hello has access to the greet method in
// Greeting's prototype object, but since hello.greet is invoked without an
// argument, the empty string is logged to the console.

/*
answer:
This code logs undefined to the console. Since Hello inherits from Greeting,
the hello object has access to greet. However, greet takes an argument, which
isn't supplied by this code.
*/

//q4
let hello = new Hello();
hello.greet('Goodbye');

//This logs 'Goodbye' to the console.

//q5
Hello.hi();

// This returns an error. The hi method is an instance method and can only be
// called by an instance, not the constructor (Hello).

/* answer:
This code also raises a TypeError. The hi method is defined on Hello
prototype, not on the Hello constructor itself. Thus, only instances of Hello
have access to hi.
*/