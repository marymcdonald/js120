//q1
//What are two disadvantages of working with factory functions?

/*
1. Each object created with a factory function has a full copy of all of the methods, which can place a heavy load on system memory, in addition to being redundant.
2. No way to know whether it was created with a factory function, which makes it impossible to identify the specific type of object.
*/

//q2
function makeObj() {
  let obj = {};
  obj.propA = 10;
  obj.propB = 20;
  return obj;
}

function makeObj () {
  return {
    propA: 10,
    propB: 20,
  };
}

//q3
// let invoice = {
//   phone: 3000,
//   internet: 6500
// };

// let payment = {
//   phone: 1300,
//   internet: 5500
// };

// let invoiceTotal = invoice.phone + invoice.internet;
// let paymentTotal = payment.phone + payment.internet;
// let remainingDue = invoiceTotal - paymentTotal;

// console.log(paymentTotal);         // => 6800
// console.log(remainingDue);         // => 2700

function createInvoice(services = {}) {
  let phoneCharge = services.phone;
  if (phoneCharge === undefined) {
    phoneCharge = 3000;
  }

  let internetCharge = services.internet;
  if (internetCharge === undefined) {
    internetCharge = 5500;
  }
  return {
    phone: phoneCharge,
    internet: internetCharge,
    payments: [],

    total: function() {
      return this.phone + this.internet;
    },
    addPayment: function(payment) {
      return this.payments.push(payment);
    },
    addPayments: function(arrPayments) {
      return this.payments.forEach(payment => this.payments.push(payment));
    },
    amountDue: function() {
      return this.total() - this.payments();
    }
  };
}

function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000

//q4

function createPayment(services = {}) {
  let payment = {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
  };

  payment.total = function() {
    return this.amount || (this.phone + this.internet);
  };

  return payment;
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000

//q5
//Update the createInvoice function so that it can add payment(s) to invoices.

function createInvoice(services = {}) {
  let phoneCharge = services.phone;
  if (phoneCharge === undefined) {
    phoneCharge = 3000;
  }

  let internetCharge = services.internet;
  if (internetCharge === undefined) {
    internetCharge = 5500;
  }
  return {
    phone: phoneCharge,
    internet: internetCharge,
    payments: [],

    total: function() {
      return this.phone + this.internet;
    },
    addPayment: function(payment) {
      this.payments.push(payment);
    },
    addPayments: function(payments) {
      payments.forEach(this.addPayment, this);
    },
    paymentTotal: function() {
      return this.payments.reduce((sum, payment)  => sum + payment.total(), 0);
    },
    amountDue: function() {
      return this.total() - this.paymentTotal();
    }
  };
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0