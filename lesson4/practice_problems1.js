//q1
// Use a factory function to create pet objects.

// function createPet (animal, name) {
//   return {
//     animal,
//     name,

//     sleep() {
//       console.log('I am sleeping');
//     },

//     wake() {
//       console.log('I am awake');
//     }
//   };
// }

// let pudding = createPet("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake

// let neptune = createPet("Fish", "Neptune");
// console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
// neptune.sleep(); // I am sleeping
// neptune.wake();  // I am awake

//q2
// Use the OLOO pattern to create an object prototype that we can use to create
// pet objects.

let PetPrototype = {
  sleep: function () {
    console.log('I am sleeping');
  },

  wake: function () {
    console.log('I am awake');
  },

  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  }
};

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake

//q3
// Consider the objects created by the programs in problems 1 and 2. How do
// objects for the same animal differ from each other?

/*
The objects created from the factory function have all of their own methods,
while those created from the OLOO pattern inherit their methods from the object
prototype.
*/

/* answer:
Objects created with the OLOO have a prototype object that contains the methods
associated with the created objects. Since all pets created from the prototype
share a single prototype object, they all share the same methods. With the
factory function, each object has a copy of all the methods. Thus, objects
created by OLOO are more efficient in terms of memory use.

Objects created with the factory function can have private state. Any state
stored in the body of the factory function instead of in the returned object is
private to the returned object. They can't be accessed or modified unless one
of the object methods exposes the state. With OLOO, there is no way to define
private state. All object state can be accessed and modified by outside code.
*/