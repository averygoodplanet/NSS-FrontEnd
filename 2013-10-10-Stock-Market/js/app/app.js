'use strict';

//Firebase Schema
var Δdb;
var Δbalance;
var Δstocks;

//Local Schema
var db = {};
db.balance = 0;
db.stocks = {};

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://stocks-ph.firebaseio.com/');

  Δbalance = Δdb.child('balance');
  //once get the balance from database.
  Δbalance.once('value', loadBalance);
  $('#setBalance').click(setAndDisplayBalance);

  //creates a database Stocks OBJECT-not an array
  Δstocks = Δdb.child('stocks');
  // when they click "Buy button", add a stock
  $('#buy').click(buy);
}

function loadBalance(snapshot) {
  var balanceFromDatabase = snapshot.val();
  $('#displayedBalance').val(balanceFromDatabase);
}

function setAndDisplayBalance() {
  //getting balance from user's input
  var balance = parseFloat($('#inputBalance').val());
  // storing balance in global variable (in propery balance of global db)
  db.balance = balance;
  // setting balance in remote database
  Δbalance.set(balance);
  //displaying balance
  $('#displayedBalance').val(balance);
  // clearing the input field
  $('#inputBalance').val('');
}

function buy() {
  //ASSUMPTION: Only buying a particular stock once.
  var symbol = storeSymbolAndCount();

  /* fire $getJSON request by calling getStockQuote--pass in addNewStock as callback function.
  Later, when we're updating stocks we already bought we will pass a different callback
  function to getStockQuote().
  */
  getStockQuote(symbol, addNewStock);
}

function storeSymbolAndCount() {
  //--get symbol and #-of-shares from user input
  var symbol = $('#enterSymbol').val();
  var count = $('#enterCount').val();

  /*
  --Store symbol and #-of-shares in global stocks object and in stocks database object.
  The individual stock will be an object that is a property of these objects.
  The property name will be the stock symbol. (In case at some point I want to
  retrieve an individual stock by stock symbol.)
  *Using bracket notation to set the propertyname to a string variable.
  e.g. db.stocks.APPL = {symbol: APPL, count: 2};
  */
  db.stocks[symbol] = {symbol: symbol, count: count};
  Δstocks.child(symbol).set({symbol: symbol, count: count});
  return symbol;
}

function addNewStock(symbol) {
  console.log("symbol passed to addNewStock: "+symbol);
  //

}

function getStockQuote(symbol, fn) {
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?&&symbol=' + symbol, fn(symbol));
}
