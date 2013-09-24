var name = prompt("What's your name?");
var balance = parseFloat(prompt("What's your checkbook balance?"));
console.log("initial balance: $"+balance);

var deposit1 = parseFloat(prompt("Amount of 1st deposit?"));
balance += deposit1;
console.log("balance: "+balance);

var deposit2 = parseFloat(prompt("Amount of 2nd deposit?"));
balance += deposit2;
console.log("balance: "+balance);

var deposit3 = parseFloat(prompt("Amount of 3rd deposit?"));
balance += deposit3;
console.log("balance: "+balance);

debugger;

var withdrawal1 = parseFloat(prompt("Amount of 1st withdrawal?"));
balance -= withdrawal1;
console.log("balance: "+balance);

var withdrawal2 = parseFloat(prompt("Amount of 2nd withdrawal?"));
balance -= withdrawal2;
console.log("balance: "+balance);

var withdrawal3 = parseFloat(prompt("Amount of 3rd withdrawal?"));
balance -= withdrawal3
console.log("balance before if statement: "+balance);

console.log("Your name: "+name);

balance -= (balance < 0) ? 50 : 0; // if balance < 0, then subtract 50 for an overdraft fee.

console.log("Your final balance: $"+balance);
