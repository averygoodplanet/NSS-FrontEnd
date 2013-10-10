'use strict';

//Firebase Schema
var Δdb;
var Δbalance;

//Local Schema
var db = {};
db.balance = 0;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://stocks-ph.firebaseio.com/');
  Δbalance = Δdb.child('balance');
  $('#setBalance').click(setAndDisplayBalance);

  // getStockQuote();
}

function setAndDisplayBalance() {
  var balance = parseFloat($('#inputBalance').val());
  db.balance = balance;
  Δbalance.set(balance);
  $('#displayedBalance').val(balance);
}

function getStockQuote() {
  var data = {};
  data.symbol = 'AAPL';
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?&&symbol=' + data.symbol, receivedQuote);
}

function receivedQuote(data, textStatus, jqXHR) {
  console.log(data);
  console.log(textStatus);
  console.log('jqXHR follows: ');
  console.log(jqXHR);
}
