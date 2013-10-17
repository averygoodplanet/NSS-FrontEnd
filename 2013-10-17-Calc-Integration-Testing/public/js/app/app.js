'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#calculate').click(clickCalculate);
}

function clickCalculate() {
  var number1 = parseFloat($('#op1').val());
  $('#op1').val('');
  var number2 = parseFloat($('#op2').val());
  $('#op2').val('');
  var operatorString = $('#operator').val();
  $('#operator').val('');
  var result = 0;

  switch (operatorString) {
  case '*':
    result = number1 * number2;
    break;
  case '/':
    result = number1 / number2;
    break;
  case '+':
    result = number1 + number2;
    break;
  case '-':
    result = number1 - number2;
    break;
  default:
    alert('operator not recognized');
  }

  $('#result').text(result);
  clearFields();
}

function clearFields() {
  $('#op1').val('');
  $('#op2').val('');
  $('#operator').val('');
  $('#result').val('');
}