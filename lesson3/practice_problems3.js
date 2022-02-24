//q1
// What do we mean when we say that classes are first-class values?

// Classes are first class values because they can be passed as an argument
// into a function, returned as a value from a function and assigned to a
// variable.

//q2
class Television {
  static manufacturer() {
    // omitted code
  }

  model() {
    // method logic
  }
}

// What does the static modifier do? How would we call the method manufacturer?

// The static keyword creates a static method (property), meaning that the
// method is to be called by the constructor class and not by an instance.

// To call manufactor, we can do the following:
Television.manufacturer();

/*
answer:
The static modifier, when used with a method declaration, marks the method as
static. That is, the method is defined directly on the class, not on the
objects the class creates.
*/