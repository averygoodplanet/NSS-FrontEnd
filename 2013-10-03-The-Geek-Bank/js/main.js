'use strict';

$(document).ready(initialize);

var balance = 0;

function setLogo() {
  var url = $('#url').val();
  alert('url: '+url);
  $('#logo').attr('src', url);
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
  $('#setLogo').click(setLogo);
  $('#setBalance').click(setBalance);
  $('#deposit').click(deposit);
  $('#withdraw').click(withdraw);
}