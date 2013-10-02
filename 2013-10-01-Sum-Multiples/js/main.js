$(document).ready(initialize);


function userinput_to_a_b () {
  var user_string = $('#userinput').val();
  // var user_string = "5,3";  //for testing
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

function make_multiples_array() { // e.g. [3,6,9,12,15]
  var array_a_b = userinput_to_a_b();
  var a = array_a_b[0];
  var b = array_a_b[1];
  var range = a_to_range(a);
  var multiples_array = [];
  for(i in range)
    multiples_array.push((range[i])*b);
  return multiples_array;
}

function initialize(){
  make_multiples_array();
}