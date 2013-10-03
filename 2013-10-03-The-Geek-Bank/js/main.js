'use strict';

$(document).ready(initialize);

function setLogo() {
  var url = $('#url').val();
  alert('url: '+url);
  $('#logo').attr('src', url);
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