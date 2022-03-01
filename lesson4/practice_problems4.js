//q1
// If we have a Car class and a Truck class, how can you use the Speed object
// as a mix-in to make them goFast? How can you check whether your Car or Truck
// can now go fast?

const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}

Object.assign(Car.prototype, Speed);

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}
Object.assign(Truck.prototype, Speed);

let tinyCar = new Car();
tinyCar.goFast();

let bigTruck = new Truck();
bigTruck.goFast();

/*
answer:
To add the goFast method to the Car and Truck classes, we need to mix Speed
into the prototypes of both constructors.

If you need to check whether an object responds to a specific method, you can
use the in operator:

'goFast' in smallCar;  // => true
'goFast' in blueTruck; // => true
*/

//q2
// In the last question, we used a mix-in named Speed that contained a goFast
// method. We included the mix-in in the Car class and then called the goFast
// method from an instance of the Car class. You may have noticed that the
// string printed when we call goFast includes the name of the type of vehicle
// we are using. How is that done?

// We can print the name of the type of vehicle by calling this.prototype.name
// – when we call the method goFast, we are calling it using either a Car or
// Truck object. The prototype objects for both Car and Truck contain the
// constructor property, which, itself, contains the name property. A Function
// object's read-only name property indicates the function's name as specified
// when it was created.

/*
answer:
We used this.constructor.name to determine the name. It works like this:

Within goFast, this refers to the object that invoked the method. In this case,
we used Car and Truck objects.
The constructor property of an object references the class that the object
belongs to, i.e., Car or Truck.
Constructors have a name property that merely contains the name of the class as
a string, and that's what we output in goFast.
*/

//q3
// Ben and Alyssa are working on a vehicle management system. Thus far, they
// have created classes named Auto and Motorcycle to represent automobiles and
// motorcycles. After they noticed that the information and calculations
// performed was common to both vehicle types, they decided to break out the
// commonality into a separate class named WheeledVehicle. Their code, thus
// far, looks like this:

const FuelInfo = {
  range() {
    return this.fuelCap *  this.fuelEfficiency;
  }
};

class WheeledVehicle {
  constructor(tirePressure, kmTravelledPerLiter, fuelCapInLiter) {
    this.tires = tirePressure;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }

}
Object.assign(WheeledVehicle, FuelInfo);

class Auto extends WheeledVehicle {
  constructor() {
    // the array represents tire pressure for four tires
    super([30,30,32,32], 50, 25.0);
  }
}

class Motorcycle extends WheeledVehicle {
  constructor() {
    // array represents tire pressure for two tires
    super([20,20], 80, 8.0);
  }
}

// Their boss now wants them to incorporate a new type of vehicle: a Catamaran.
class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    // catamaran specific logic

    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }
}

// This new class doesn't fit well with our existing class hierarchy: Catamarans
// don't have tires, and aren't wheeled vehicles. However, we still want to
// share the code for tracking fuel efficiency and range. Modify the class
// definitions and move code into a mix-in, as needed, to share code between
// the Catamaran and the wheeled vehicle classes.

Object.assign(Catamaran.prototype, FuelInfo);