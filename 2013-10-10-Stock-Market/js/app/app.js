'use strict';

//Firebase Schema
var Δdb;

//Local Schema
var db = {};


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://stocks-ph.firebaseio.com/');


  getStockQuote();
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
