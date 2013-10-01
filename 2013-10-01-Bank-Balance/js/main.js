$(document).ready(initialize);

var balance = 1000;

function deposit(){
  var deposit_amount = parseFloat($('#amount').val());
  balance = balance + deposit_amount;
  $('#balance').val(balance);
}

function withdrawal(){
  var withdrawal_amount = parseFloat($('#amount').val());
  balance = balance - withdrawal_amount;
  $('#balance').val(balance);
}

function clear_amount(){
  $('#amount').val('');
}

function initialize(){
  $('#balance').val(balance);
  $('#amount').val('');
  $('#deposit').click(deposit);
  $('#withdraw').click(withdrawal);
  $('#amount').focus(clear_amount);
}