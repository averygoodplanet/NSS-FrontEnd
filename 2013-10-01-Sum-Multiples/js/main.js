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

//make_multiples_array uses functions:
// 1) userinput_to_a_b, 2) a_to_range.
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

function sum_array(array) {
  var sum = 0;
  for(i in array)
    sum += array[i];
  return sum;
}

function format_output_string() {
  return make_multiples_array().join('+') + "=" + sum_array(make_multiples_array()).toString();
}

function overall_output_function() {

}

function initialize() {
  alert(format_output_string());
}