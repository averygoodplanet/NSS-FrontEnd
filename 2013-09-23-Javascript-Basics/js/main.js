/* this is a multi-line
  javascript
  comment
*/

var first_name = prompt('What is your first name?');
var last_name = prompt('What is your last name?');
var gender = prompt('Male or Female?');
var age = prompt('Age?');
var bday_month = prompt('What month were you born in?');
var current_month = prompt("What month is it right now?")
var full_name = first_name + " " + last_name;

var test1 = parseFloat(prompt("Score for test1?"));

//debugger;

var test2 = parseFloat(prompt("Score for test2?"));
var test3 = parseFloat(prompt("Score for test3?"));

var sum = 0;
sum += test1;
sum += test2;
sum += test3;

var average = sum / 3;
console.log("Your average was: "+average);


if(average < 70)
  console.log('failed')
else if((average >= 70) && (average < 80))
  console.log('you made a D');
else if (average >= 80 && average < 90)
  console.log('you made a B');
else
  console.log('you made an A');


console.log("Your full name is: "+full_name);

var null_variable = null, undefined_variable;
/* created null_variable and assigned null to it.
created undefined_variable but did not assigned anything to it. */

if((first_name == 'Peter') && (last_name == "Himmelreich"))
  console.log('hey, i recognize you!');

if((gender == 'female') && (age >= 21))
  console.log('free drinks, ladies night! woot!')
else if((gender == 'male') && (age >= 21))
  console.log('looks like you are buying!')
else
  console.log('not old enough to drink or indeterminate gender');

var can_have_cake = (current_month == bday_month);
var cake = (current_month == bday_month) ? "chocolate" : "vanilla";
/* If this month matches the current month then you eat chocolate,
otherwise you eat vanilla. */
console.log("Marie Antoinette says that you are eating " + cake);


switch(bday_month)
{
  case 'january':
    console.log('you are a capricorn');
    break;
  case 'february':
    console.log('you are a pisces');
    break;
  default:
    console.log('you are not of this world, god speed!');
}