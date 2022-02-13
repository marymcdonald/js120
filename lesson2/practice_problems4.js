//q1
// The code below should output "Christopher Turk is a Surgeon". Without
// running the code, what will it output? If there is a difference between the
// actual and desired output, explain the difference.

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription);

//This will return
//'undefined undefined is a undefined'
//Both logReturnVal and its the return value, `returnVal`, are invoked
//as standalone functions and results in the global object being passed.
//----incorrect: logReturnVal is not invoked as a standalone function.

/*
answer:
When we pass turk.getDescription to logReturnVal as an argument, we remove the
method from its context. As a result, when we execute it as func, this points
to the global object rather than turk. Since global doesn't have properties
defined for firstName, lastName, or occupation, the output isn't what we expect.
*/

//q2
// Modify the program from the previous problem so that logReturnVal accepts an
// additional context argument. If you then run the program with turk as the
// context argument, it should produce the desired output.

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);

//q3
// Suppose that we want to extract getDescription from turk, but we always want
// it to execute with turk as its execution context. How would you modify your
// code to do that?

let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
                                  + this.occupation + '.';
  }
};

function logReturnVal(func) {
  let returnVal = func();
  console.log(returnVal);
}

logReturnVal(turk.getDescription.bind(turk));

//q4

const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();

//this won't log the seriesTitle because forEach executes the function
//expression given to it and it gets executed with the global object as context.

/*
answer:
Since functions lose their surrounding context when used as arguments to
another function, the context of line 6 is not the TESgames object. Instead, it
is the global object. Thus, this.seriesTitle resolves to undefined rather than
"The Elder Scrolls".
*/

//q5
// Use let self = this; to ensure that TESgames.listGames uses TESGames as its
// context and logs the proper output.

const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    let self = this;
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();

//q6
// The forEach method provides an alternative way to supply the execution
// context for the callback function. Modify the program from the previous
// problem to use that technique to produce the proper output:

const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ': ' + title);
    }, this);
  }
};

TESgames.listGames();


//q7
// Use an arrow function to achieve the same result:
const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();

//Note that this solution does not pass this to forEach.

//q8
//What will the value of foo.a be after this code runs?
let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment();
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
console.log(foo.a);

// I think it will end up as NaN. increment is called as a standalone function,
// so its context is the global object.

/*
answer:
The value of foo.a will be 0. Since increment gets invoked as a function, this
a on line 5 references a property of the global object rather than a property
of foo. Thus, the property foo.a isn't modified by the increment; its value
remains 0.
*/

//q9
// Use one of the methods we learned in this lesson to invoke increment with an
// explicit context such that foo.a gets incremented with each invocation of
// incrementA.

let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
console.log(foo.a);

/*
answer:
We can use apply or call to invoke increment on line 8 with explicit context.
We pass this as the context argument since inside incrementA but outside of
increment, this references the containing object, namely foo.
*/