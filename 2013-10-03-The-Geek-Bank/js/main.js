'use strict';

$(document).ready(initialize);

var balance = 0;

function setLogo() {
  var url = $('#url').val();
  $('#logo').attr('src', url);
  $('#url').val('');
}

function setBalance() {
  balance = parseFloat($('#balanceInput').val());
  $('#balanceDisplay').val(balance);
}

function deposit() {
  balance += parseFloat($('#amount').val());
  $('#balanceDisplay').val(balance);
}

function withdraw() {
  balance -= parseFloat($('#amount').val());
  $('#balanceDisplay').val(balance);
}

function initialize() {
  $('#url').focus();
  $('#setLogo').click(setLogo);
  $('#setBalance').click(setBalance);
  $('#deposit').click(deposit);
  $('#withdraw').click(withdraw);
}