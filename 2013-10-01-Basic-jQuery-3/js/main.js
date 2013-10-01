$(document).ready(initialize);


function add(number1, number2) {
  return number1 + number2;
}


function calculate(){
  var number1 = parseFloat($('#num1').val());
  var number2 = parseFloat($('#num2').val());
  // alert("num1: "+number1+" num2: "+number2);
  var result = add(number1, number2);
  $('#result').text(result);
}

function initialize(){
  $('#add').click(calculate);
}