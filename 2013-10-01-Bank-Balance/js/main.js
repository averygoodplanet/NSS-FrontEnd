$(document).ready(initialize);

var balance = 1000;

function deposit(){
  var deposit_amount = parseFloat($('#amount').val());
  balance = balance + deposit_amount;
  $('#balance').val(balance);
  balance_below();
}

function withdrawal(){
  var withdrawal_amount = parseFloat($('#amount').val());
  balance = balance - withdrawal_amount;
  $('#balance').val(balance);
  balance_below();
}

function clear_amount(){
  $('#amount').val('');
}

function balance_below() {
  if(balance < 0)
    $('#balance').css("background-color", "red");
  else
    $('#balance').css("background-color", "white");
}

function initialize(){
  $('#balance').val(balance);
  $('#amount').val('');
  $('#deposit').click(deposit);
  $('#withdraw').click(withdrawal);
  $('#amount').focus(clear_amount);
}