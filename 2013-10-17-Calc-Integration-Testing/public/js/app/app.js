'use strict';

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#calculate').click(clickCalculate);
  $('#history > ul').on('click', '.remove', clickRemove);
  $('#sum').click(clickSum);
  $('#product').click(clickProduct);
  $('#removeNeg').click(clickRemoveNeg);
  $('#removePos').click(clickRemovePos);
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
  addPaperTrailLi(number1, operatorString, number2, result);
}

function clickRemove() {
  var $row = $(this);
  //remove this row (i.e. this <li>)
  $row.parent().remove();
}

function clickSum() {
  //create empty sum variable
  var sum = 0;

  // for each result within the <li>s within #history, add them to the sum variable
  var resultSpans = $('#history li .result');

  $('#history li .result').each(function () {
    sum += parseFloat($(this).text());
  });

  //display sum variable to #sumResult (a read-only input field)
  $('#sumResult').val(sum);
}

function clickProduct() {

}

function clickRemoveNeg() {

}

function clickRemovePos() {

}

function addPaperTrailLi(number1, operatorString, number2, result){
  //construct the empty jQuery li object
  var li = '<li><span class="op1"></span><span class="operator"></span><span class="op2"></span><span>=</span><span class="result"></span><input type="button" class="remove button small" value="Remove!"></input></li>';
  var $li = $(li);

  //add text into the $li from passed params
  $li.children('.op1').text(number1);
  $li.children('.operator').text(operatorString);
  $li.children('.op2').text(number2);
  $li.children('.result').text(result);

  //add $li to page
  $('#history > ul').prepend($li);
}

function clearFields() {
  $('#op1').val('');
  $('#op2').val('');
  $('#operator').val('');
  $('#result').val('');
}

function canRun(flag) {
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}