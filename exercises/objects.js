//q1
// function createGreeter(name) {
//   return {
//     name: name,
//     morning: 'Good Morning',
//     afternoon: 'Good Afternoon',
//     evening: 'Good Evening',
//     greet: function(timeOfDay) {
//       let msg = '';
//       switch (timeOfDay) {
//         case 'morning':
//           msg += `${this.morning} ${this.name}`;
//           break;
//         case 'afternoon':
//           msg += `${this.afternoon} ${this.name}`;
//           break;
//         case 'evening':
//           msg += `${this.evening} ${this.name}`;
//           break;
//       }

//       console.log(msg);
//     },
//   };
// }

// let helloVictor = createGreeter('Victor');
// helloVictor.greet('morning'); // Good Morning Victor

// The problem is that it didn't use `this` keyword to access the properties of
// the object returned by the `createGreeter` function.

//q2
// A grocery store uses a JavaScript function to calculate discounts on various
// items. They are testing out various percentage discounts but are getting
// unexpected results. Go over the code, and identify the reason why they
// aren't getting the expected discounted prices from the function. Then, modify
// the code so that it produces the correct results.

// let item = {
//   name: 'Foo',
//   description: 'Fusce consequat dui est, semper.',
//   price: 50,
//   quantity: 100,
//   discount: function(percent) {
//     let discount = this.price * percent / 100;

//     return this.price - discount;
//   },
// };

// console.log(item.discount(20));  // should return 40
// console.log(item.discount(50));  // should return 25
// console.log(item.discount(25));  // should return 37.5

// The previous code had:
// this.price -= discount;
// return this.price;
// This was mutating the price property, so each subsequent invocation had a
// different, lower price.

// additional LS comment: "To resolve this, the discount method should be
// modified so that it doesn't mutate the object."

//q3

// In JavaScript, comparing two objects either with == or === checks for object
// identity. In other words, the comparison evaluates as true if it's the same
// object on either side of == or ===. This is a limitation, in a sense, because
// sometimes we need to check if two objects have the same key/value pairs.
// JavaScript doesn't give us a way to do that.

// Write a function objectsEqual that accepts two object arguments and returns
// true or false depending on whether the objects have the same key/value pairs.

// function objectsEqual(obj1, obj2) {

//   if (!keysMatch(obj1, obj2)) {
//     return false;
//   } else if (!valuesMatch(obj1, obj2)) {
//     return false;
//   }
//   return true;
// }

// function keysMatch(obj1, obj2) {
//   let keys1 = Object.keys(obj1);
//   let keys2 = Object.keys(obj2);

//   if (keys1.length !== keys2.length) {
//     return false;
//   }

//   let filtered = keys1.filter(element => keys2.includes(element));

//   if (filtered.length !== keys1.length) {
//     return false;
//   }

//   return true;
// }

// function valuesMatch(obj1, obj2) {
//   let values1 = Object.values(obj1);
//   let values2 = Object.values(obj2);

//   for (let index = 0; index < values1.length; index += 1) {
//     if (values1[index] !== values2[index]) {
//       return false;
//     }
//   }
//   return true;

// }

// console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
// console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
// console.log(objectsEqual({}, {}));                                      // true
// console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false

// Could have used getOwnPropertyNames() to include all properties, even
// non-enumerables.

//A limitation of this function is that it doesn't look for deep equality. In
// other words, if one of the values is an object in both objects, this will
// return false unless that object is identical on both objects.

//q4
/*
Create an object factory for a student object. The student object should have
the following methods and it should produce the expected results demonstrated
in the sample code:

info: Logs the name and year of the student.
addCourse: Enrolls student in a course. A course is an object literal that has
properties for its name and code.
listCourses: Returns a list of the courses student has enrolled in.
addNote: Adds a note property to a course. Takes a code and a note as an
argument. If a note already exists, the note is appended to the existing one.
updateNote: Updates a note for a course. Updating a note replaces the existing
note with the new note.
viewNotes: Logs the notes for all the courses. Courses without notes are not
displayed.
*/

function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} student`);
    },
    addCourse(course) {
      this.courses.push(course);
    },
    listCourses() {
      return this.courses;
    },
    addNote(code, noteText) {
      let selectedCourse = this.courses.find(course => course.code === code);
      if (selectedCourse.note) {
        selectedCourse.note += `, ${noteText}`;
      } else {
        selectedCourse.note = noteText;
      }
    },
    updateNote(code, noteText) {
      let noteToUpdate = this.courses.find(course => course.code === code);
      noteToUpdate.note = noteText;
    },
    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(course.name + ': ' + course.note);
        }
      });
    },
  };
}

// let foo = createStudent('Foo', '1st');
// foo.info();
// // "Foo is a 1st year student"
// foo.listCourses();
// // [];
// foo.addCourse({ name: 'Math', code: 101 });
// foo.addCourse({ name: 'Advanced Math', code: 102 });
// foo.listCourses();
// // [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
// foo.addNote(101, 'Fun course');
// foo.addNote(101, 'Remember to study for algebra');
// foo.viewNotes();
// // "Math: Fun course; Remember to study for algebra"
// foo.addNote(102, 'Difficult subject');
// foo.viewNotes();
// // "Math: Fun course; Remember to study for algebra"
// // "Advance Math: Difficult subject"
// foo.updateNote(101, 'Fun course');
// foo.viewNotes();
// // "Math: Fun course"
// // "Advanced Math: Difficult subject"

//q5
/*
Create a school object. The school object uses the student object from the
previous exercise. It has methods that use and update information about the
student. Be sure to check out the previous exercise for the other arguments
that might be needed by the school object. Implement the following methods for
the school object:

addStudent: Adds a student by creating a new student and adding the student to
a collection of students. The method adds a constraint that the year can only
be any of the following values: '1st', '2nd', '3rd', '4th', or '5th'. Returns a
student object if year is valid otherwise it logs "Invalid Year".
enrollStudent: Enrolls a student in a course.
addGrade: Adds the grade of a student for a course.
getReportCard: Logs the grades of a student for all courses. If the course has
no grade, it uses "In progress" as the grade.
courseReport: Logs the grades of all students for a given course name. Only
student with grades are part of the course report.
To test your code, use the three student objects listed below. Using the three
student objects, produce the following values from the getReportCard and
courseReport methods respectively.
*/
let school = {
  students: [],
  addStudent: function(name, year) {
    const VALID_YEARS = ['1st', '2nd', '3rd', '4th', '5th'];
    if (VALID_YEARS.includes(year)) {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year.');
    }

  },
  enrollStudent(student, course) {
    student.addCourse(course);
  },
  addGrade(student, courseCode, grade) {
    let course =
    student.listCourses().filter(course => course.code === courseCode);
    course[0].grade = grade;
  },
  getReportCard(student) {
    student.listCourses().forEach(course => {
      if (course.grade) {
        console.log(`${course.name}: ${course.grade}`);
      } else {
        console.log(`${course.name}: In progress`);
      }
    });
  },
  courseReport(courseName) {
    function getCourse(student, courseName) {
      return student.listCourses().filter(elem => elem.name === courseName)[0];
    }
    let grades = [];

    let courseStudents = this.students.map(student => {
      let course = getCourse(student, courseName) || { grade: undefined };
      if (course.grade) {
        grades.push(course.grade);
      }
      return { name: student.name, grade: course.grade };
    }).filter(student => student.grade);

    if (courseStudents.length > 0) {
      console.log(`=${courseName} Grades=`);
      courseStudents.forEach(student => console.log(`${student.name}: ${student.grade}`));
      console.log('---');
      let average = (grades.reduce((a,b) => a + b)) / (grades.length);
      console.log(`Course Average: ${average}`);
    } else {
      console.log('undefined');
    }
  },
};


let foo = school.addStudent('foo', '3rd');
let bar = school.addStudent('bar', '1st');
let qux = school.addStudent('qux', '2nd');
//school.addStudent('mary', '6th');


school.enrollStudent(foo, { name: 'Math', code: 101 });
school.enrollStudent(foo, { name: 'Advanced Math', code: 102 });
school.enrollStudent(foo, { name: 'Physics', code: 202 });
school.enrollStudent(bar, { name: 'Math', code: 101 });
school.enrollStudent(qux, { name: 'Math', code: 101 });
school.enrollStudent(qux, { name: 'Advanced Math', code: 102 });


school.addGrade(foo, 101, 95);
school.addGrade(foo, 102, 90);
school.addGrade(bar, 101, 91);
school.addGrade(qux, 101, 93);
school.addGrade(qux, 102, 90);
console.log(foo);

school.getReportCard(foo);
// //school.getReportCard(qux);
// // Math: 95
// // Advanced Math: 90
// // Physics: In progress

school.courseReport('Math');
// // =Math Grades=
// // foo: 95
// // bar: 91
// // qux: 93
// // ---
// // Course Average: 93

school.courseReport('Advanced Math');
// // =Advanced Math Grades=
// // foo: 90
// // qux: 90
// // ---
// // Course Average: 90

school.courseReport('Physics');
// // undefined