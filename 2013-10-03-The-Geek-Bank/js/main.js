'use strict';

$(document).ready(initialize);

var balance = 0;

function setLogo() {
  var url = $('#url').val();
  alert('url: '+url);
  $('#logo').attr('src', url);
}

function setBalance() {
  balance = $('#balanceInput').val();
  alert('balance is now ' + balance);
  $('#balanceDisplay').val('$'+balance);
}

function deposit() {
  alert('deposit function');
}

function withdraw() {
  alert('withdraw function');
}

function initialize() {
  $('#setLogo').click(setLogo);
  $('#setBalance').click(setBalance);
  $('#deposit').click(deposit);
  $('#withdraw').click(withdraw);
}