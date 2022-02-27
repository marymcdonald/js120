//q1
class Game {
  play() {
    return 'Start the game!';
  }
}

class Bingo extends Game {
  rulesOfPlay() {
    // rules of play
  }
}

// What would happen if we added a play method to the Bingo class, keeping in
// mind that there is already a method of this name in the Game class from
// which the Bingo class inherits? Explain your answer. What do we call it when
// we define a method like this?

// If we added a play method to the Bingo class, it would overwrite the one in
// the Game class. This means that if an instance of Bingo were to invoke a play
// method, it would be the one in the Bingo class that is executed, not the one
// in the Game class.

// We define a method such as this as an instance method (?).

/*
answer:
If we add a new play method to the Bingo class, objects created by Bingo will
use that method instead of looking up the prototype chain and finding it in the
Game class. As soon as JavaScript finds a method, it calls it. When a class
redefines a method that a superclass defines, we call this "method overriding."
*/

//q2
// Create a class named Greeting that has a single method named greet. The
// method should take a string argument, and it should print that argument to
// the console.

// Now, create two more classes that inherit from Greeting: one named Hello,
// and the other Goodbye. The Hello class should have a hi method that takes no
// arguments and logs "Hello". The Goodbye class should have a bye method that
// logs "Goodbye". Use the greet method from the Greeting class when
// implementing Hello and Goodbye; don't call console.log from either Hello or
// Goodbye.

class Greeting {
  greet(str) {
    console.log(str);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet('Hello');
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet('Goodbye');
  }
}

let hihi = new Hello();
hihi.hi();
let byebye = new Goodbye();
byebye.bye();