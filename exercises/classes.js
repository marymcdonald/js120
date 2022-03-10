//q1
// Update the following code so that, instead of logging the values, each
// statement logs the name of the constructor to which it belongs.
console.log("Hello".constructor.name);
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);

// Expected output:
// String
// Array
// Object

//q2
// Create an empty class named Cat.

class Cat {
}

//q3
// Using the code from the previous exercise, create an instance of Cat and
// assign it to a variable named kitty.

let kitty = new Cat();

//q4
// Using the code from the previous exercise, add a constructor method that
// logs to the console I'm a cat! when a new Cat object is initialized.

class Cat {
  constructor() {
    console.log('I\'m a cat!');
  }
}

let kitty = new Cat();

//q5
// Using the code from the previous exercise, add a parameter to constructor
// that provides a name for the Cat object. Assign this parameter to a property
// called name and use it to log a greeting with the provided name. (You can
// remove the code that displays I'm a cat!.)

class Cat {
  constructor(name) {
    this.name = name;
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat('Sophie');

//q6
// Using the code from the previous exercise, move the greeting from the
// constructor method to an instance method named greet that logs a greeting to
// the console when invoked.

class Cat {
  constructor(name) {
    this.name = name;
  }

  greet() {
    console.log(`Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat('Sophie');
kitty.greet();

//q7
// Create a class Person.

// Person should accept one argument for "name" when instantiated.

// If no arguments are given, person object should instantiate with a "name" of
// "John Doe".

class Person {
  constructor(name = 'John Doe') {
    this.name = name;
  }
}

let person1 = new Person();
let person2 = new Person("Pepe");

console.log(person1.name); // John Doe
console.log(person2.name); // Pepe

//q8
// Using the following code, add an instance method named rename that renames
// kitty when invoked.

class Cat {
  constructor(name) {
    this.rename(name);
  }

  rename(newName) {
    this.name = newName;
  }
}

let kitty = new Cat('Sophie');
console.log(kitty.name); // Sophie
kitty.rename('Chloe');
console.log(kitty.name); // Chloe

//q9
// Modify the following code so that Hello! I'm a cat! is logged when Cat
// genericGreeting is invoked.

class Cat {
  static genericGreeting() {
    console.log('Hello I\'m a cat!');
  }
}

Cat.genericGreeting();

//q10
// Using the following code, add two methods: static method genericGreeting and
// instance method personalGreeting. The first method should log a greeting
// that's generic to the class. The second method should be an instance method
// and log a greeting that's custom to the object.

class Cat {
  constructor(name) {
    this.name = name;
  }
  static genericGreeting() {
    console.log('Hello I\'m a cat!');
  }
  personalGreeting() {
    console.log( `Hello! My name is ${this.name}!`);
  }
}

let kitty = new Cat("Sophie");
Cat.genericGreeting();
kitty.personalGreeting();

// Hello! I'm a cat!
// Hello! My name is Sophie!