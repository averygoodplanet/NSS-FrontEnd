$(document).ready(initialize);

var a = 0;
var b = 0;

function userinput_to_a_b () {
  var user_string = $('#userinput').val();
  var array_strings = user_string.split(',');
  var array_numbers = [];
  for(i in array_strings)
    array_numbers.push(parseInt(array_strings[i]));
  console.log("array_numbers: "+array_numbers);
  return array_numbers; // e.g. [5, 3]
}

function a_to_range (a) { // e.g. if a = 5,  range = [1,2,3,4,5]
  return _.range(1, a+1);
}



function initialize(){

}