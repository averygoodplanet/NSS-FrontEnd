function show_variable(variable) {
  variable_name_string =
  console.log(""+variable_name);
}

function transaction(trasaction_name){
  var amount = parseFloat(prompt("Amount of your "+transaction_name+"?"));
  balance += amount;
  console.log("balance: "+balance);
}

var name = prompt("What's your name?");


var balance = null;
transaction("initial balance");

var deposit1 = parseFloat(prompt("Amount of 1st deposit?"));
balance += deposit1;
console.log("balance: "+balance);

var deposit2 = parseFloat(prompt("Amount of 2nd deposit?"));
balance += deposit2;
console.log("balance: "+balance);

var deposit3 = parseFloat(prompt("Amount of 3rd deposit?"));
balance += deposit3;
console.log("balance: "+balance);

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

if(balance < 0)
{
  balance -= 50;
  console.log("charged $50 overdraft fee");
}

console.log("Your final balance: $"+balance);

final_balance = final_balance - 50

