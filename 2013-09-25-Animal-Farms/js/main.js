var dogs = [];

var name = prompt("Enter a dog's name or blank to exit:");

while(name) // if users enters nothing, name = "", which evaluates to false
{
  var dog = {};
  dog.name = name;
  dog.age = parseInt(prompt("Age?"));
  dog.breed = prompt("Breed?");
  dogs.push(dog);
  name = prompt("Enter a dog's name or blank to exit:");
}

debugger;

var avg_age;
var sum_age = 0;

for(var i = 0; i < dogs.length; i++)
{
  sum_age += dogs[i].age;
  console.log("sum_age: "+sum_age);
}

avg_age = sum_age / dogs.length;
console.log("You have " + dogs.length + " dog(s)consolec, the average age (rounded up) is " + Math.ceil(avg_age));