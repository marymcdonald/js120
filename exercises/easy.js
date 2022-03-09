//q1
/*
Create a class Rectangle.

The constructor should take 2 arguments which represent width and length
respectively.

Implement the class so that the output from the example below is correct.
*/

class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

let rect = new Rectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20

//q2
// Write a class called Square that inherits from Rectangle

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }
}

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25

//q3
// Without calling the Cat constructor, create an object that looks and acts
// like a Cat instance that doesn't have a defined name.

class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(Cat.prototype);// your implementation
console.log(fakeCat instanceof Cat); // logs true
console.log(fakeCat.name);           // logs undefined
console.log(fakeCat.speaks());       // logs undefined says meowwww.

//q4
class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Cat extends Pet {
  constructor(name, age, colour) {
    super(name, age);
    this.colour = colour;
  }

  info() {
    return `My cat ${this.name} is ${this.age} and has ${this.colour} fur.`;
  }
}

let pudding = new Cat('Pudding', 7, 'black and white');
let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

console.log(pudding.info());
console.log(butterscotch.info());

// My cat Pudding is 7 years old and has black and white fur.
// My cat Butterscotch is 10 years old and has tan and white fur.

//q5

class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, 'cat', status);
  }

  introduce() {
    return `${super.introduce()} Meow meow!`;
  }
}

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, 'dog', status);
    this.master = master;
  }

  greetMaster() {
    return `Hello ${this.master}! Woof woof!`;
  }
}

let cat = new Cat("Pepe", 2, "happy");
console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// logs true

//q6
//Refactor these classes so they all use a common superclass, and inherit
//behavior as needed.

class Machine {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Machine {
  getWheels() {
    return 4;
  }
}

class Motorcycle extends Machine {
  getWheels() {
    return 2;
  }
}

class Truck extends Machine {
  constructor(make, model, payload) {
    super(make, model);
    this.payload = payload;
  }

  getWheels() {
    return 6;
  }
}

//q7
// What will the following code log?
class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData());
console.log(thing.dupData());

// Something.dupData() invokes the static method dupData(), so it should log
// 'ByeBye'.

// thing.dupData() invokes the public method dupData(), so it shoulg log
// "HelloHello".

//q8

// Rewrite these two object types to use the class keyword, instead of direct
// prototype manipulation. Person exposes method greeting which when called
// logs the provided greeting text. Shouter is a subtype of Person and is a bit
// loud so whatever he says is uppercased.

function Person() {
}
Person.prototype.greeting = function(text) {
  console.log(text);
}

function Shouter() {
  Person.call(this);
}
Shouter.prototype = Object.create(Person.prototype);
Shouter.prototype.greeting = function(text) {
  Person.prototype.greeting.call(this, text.toUpperCase());
}

class Person {
  greeting(text) {
    console.log(text);
  }
}

class Shouter extends Person {
  greeting(text) {
    super.greeting(text.toUpperCase());
  }
}

let person = new Person();
let shouter = new Shouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.

//q9

// Write one method to get the code below to work.

class Person {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "strolls";
  }
}

class Cat {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "saunters";
  }
}

class Cheetah {
  constructor(name) {
    this.name = name;
  }

  gait() {
    return "runs";
  }
}

const Walkable = {
  walk() {
    return `${this.name} ${this.gait()} forwards`;
  }
};

Object.assign(Person.prototype, Walkable);
Object.assign(Cat.prototype, Walkable);
Object.assign(Cheetah.prototype, Walkable);

let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"

//q10

class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }
  info() {
    console.log(`a ${this.type} named ${this.name}`);
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }
  numberOfPets() {
    return this.pets.length;
  }
  adopt(animal) {
    this.pets.push(animal);
  }
}

class Shelter {
  constructor() {
    this.name = 'The Animal Shelter';
    this.owners = [];
    this.unadoptedPets = [];
  }
  adopt(owner, animal) {
    owner.adopt(animal);
    if (!this.owners.includes(owner)) {
      this.owners.push(owner);
    }
    this.unadoptedPets.splice(this.unadoptedPets.indexOf(animal), 1);
  }
  printAdoptions() {
    this.owners.forEach(owner => {
      console.log(`\n${owner.name} has adopted the following pets: `);
      owner.pets.forEach(animal => {
        animal.info();
      });
    });
  }
  printUnadopted() {
    console.log(`${this.name} has the following unadopted pets: `);
    this.unadoptedPets.forEach(animal => animal.info());
  }
  addToUnadoptedList(animal) {
    this.unadoptedPets.push(animal);
  }
  numberOfUnadopted() {
    return this.unadoptedPets.length;
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

// Write the classes and methods that will be necessary to make this code run,
// and log the following output:
//
// P Hanson has adopted the following pets:
// a cat named Butterscotch
// a cat named Pudding
// a bearded dragon named Darwin

// B Holmes has adopted the following pets:
// a dog named Molly
// a parakeet named Sweetie Pie
// a dog named Kennedy
// a fish named Chester

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.

// The Animal Shelter has the following unadopted pets:
// a dog named Asta
// a dog named Laddie
// a cat named Fluffy
// a cat named Kat
// a cat named Ben
// a parakeet named Chatterbox
// a parakeet named Bluebell
//    ...

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.
// The Animal shelter has 7 unadopted pets.

let asta        = new Pet('dog', 'Asta');
let laddie      = new Pet('dog', 'Laddie');
let fluffy      = new Pet('cat', 'Fluffy');
let kat      = new Pet('cat', 'Kat');
let ben      = new Pet('cat', 'Ben');
let chatterbox      = new Pet('parakeet', 'Chatterbox');
let bluebell      = new Pet('parakeet', 'Bluebell');

shelter.addToUnadoptedList(asta);
shelter.addToUnadoptedList(laddie);
shelter.addToUnadoptedList(fluffy);
shelter.addToUnadoptedList(kat);
shelter.addToUnadoptedList(ben);
shelter.addToUnadoptedList(chatterbox);
shelter.addToUnadoptedList(bluebell);

shelter.printUnadopted();
console.log(`${shelter.name} has ${shelter.numberOfUnadopted()} unadopted pets.`);

//q11
class Banner {
  constructor(message) {
    this.message = message;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+-${'-'.repeat(this.message.length)}-+`;
  }

  emptyLine() {
    return `| ${' '.repeat(this.message.length)} |`;
  }

  messageLine() {
    return `| ${this.message} |`;
  }
}

// Complete this class so that the test cases shown below work as intended. You
// are free to add any properties you need.

// You may assume that the input will always fit in your terminal window.

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+