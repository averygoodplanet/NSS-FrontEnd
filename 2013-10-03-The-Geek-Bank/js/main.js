'use strict';

$(document).ready(initialize);

var balance = 0;

function setLogo() {
  var url = $('#url').val();
  $('#logo').attr('src', url);
  $('#url').val('');
  $('#setLogoWrapper').hide();
  $('#balanceInput').focus();
}

function setBalance() {
  balance = parseFloat($('#balanceInput').val());
  $('#balanceDisplay').val(balance);
  $('#setBalanceWrapper').hide();
  $('#amount').focus();
}

function deposit() {
  balance += parseFloat($('#amount').val());
  $('#balanceDisplay').val(balance);
  $('#depositsColumn').append(makeTransactionItem());
}

function withdraw() {
  balance -= parseFloat($('#amount').val());
  $('#balanceDisplay').val(balance);
  $('#withdrawalsColumn').append(makeTransactionItem());
}

function makeTransactionItem(){
  var $item = $('<p>');
  $item.text('$'+($('#amount').val()));
  return $item;
}

function initialize() {
  $('#url').focus();
  $('#setLogo').click(setLogo);
  $('#setBalance').click(setBalance);
  $('#deposit').click(deposit);
  $('#withdraw').click(withdraw);
}