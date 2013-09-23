/* this is a multi-line
  javascript
  comment
*/

var first_name = prompt('What is your first name?');
var last_name = prompt('What is your last name?');
var full_name = first_name + " " + last_name;

var test1 = parseFloat(prompt("Score for test1?"));

//debugger;

var test2 = parseFloat(prompt("Score for test2?"));
var test3 = parseFloat(prompt("Score for test3?"));

var average = (test1 + test2 + test3) / 3;

console.log("Your average was: "+average);



console.log("Your full name is: "+full_name);

