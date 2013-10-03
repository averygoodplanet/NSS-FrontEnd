'use strict';

$(document).ready(initialize);

function setLogo() {
  alert('setLogo function');
}

function setBalance() {
  alert('setBalance function');
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