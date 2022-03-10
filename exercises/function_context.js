//q1
// What is logged on line 10?

let person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

//My first thought is that it will log
// 'Rick Sanchez'
//Could it log something else?
// if it were just:
//person.firstName + person.lastName
//then this would definitely print out 'Rick Sanchez'

//if you use the this keyword inside a property...what is this' context?
//the person object is used

/*
it prints out 'NaN'. I guess that means that it's undefined + undefined. Why?
*/

/*
LS answer: Anywhere outside a function, the keyword `this` is bound to the
global object. If the keyword is used inside a function, then its value depends
on how the function was invoked.
*/

//q2
// The method franchise.allMovies is supposed to return the following array:

// [
//   'How to Train Your Dragon 1',
//   'How to Train Your Dragon 2',
//   'How to Train Your Dragon 3'
// ]

// Explain why this method will not return the desired object? Try fixing this
// problem by taking advantage of JavaScript lexical scoping rules.

// let franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies: function() {
//     return [1, 2, 3].map(function(number) {
//       return this.name + ' ' + number;
//     });
//   },
// };

//the issue is with the `this.name` in the map callback function
//it does not have the franchise object as the context, which is what we would
// have wanted.

//The map function executes the function expression passed to it, so it gets
// executed with the global object as context.

// for franchise.allMovies to work:

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return self.name + ' ' + number;
    });
  },
};

console.log(franchise.allMovies());

/* (using the let self = this)
There are multiple ways to solve this problem but here we'll solve it by
employing the lexical scoping of JavaScript to our advantage; specifically, the
rule that a variable defined in an outer scope is available to an inner scope.
*/

//q3
// In the previous exercise, we had a situation where an anonymous method
// passed to map had an undesirable execution context. We solved the problem by
// taking advantage of lexical scoping and introducing a new variable self
// Solve the same problem again by passing a hard-bound anonymous function to
// map.

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }.bind(this));
  },
};

console.log(franchise.allMovies());

/*
Another solution is to use an arrow function as a callback to map method call,
as with arrow functions this is lexically bound.
*/

//q4
// In this exercise, we'll update an implementation of myFilter by adding the
// functionality of accepting an optional thisArg just like the original Array
// prototype.filter.

// Here's an implementation. We also show an example of how we want to call our
// modified function: the 3rd argument, filter, supplies the desired context
// (thisArg).

function myFilter(array, func, thisArg) {
  let result = [];
  //console.log(thisArg);

  array.forEach(function(value) {
    if (func.call(thisArg, value)) {
      result.push(value);
    }
  });

  return result;
}

let filter = {
  allowedValues: [5, 6, 9],
};

let answer = myFilter([2, 1, 3, 4, 5, 6, 9, 12], function(val) {
  return this.allowedValues.indexOf(val) >= 0;
}, filter); // returns [5, 6, 9]

// Modify the implementation such that the expected result is returned. Don't
// use the thisArg argument of Array.prototype.forEach.

console.log(answer);