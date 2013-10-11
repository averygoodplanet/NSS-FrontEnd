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

  // We do not store stock to database until we receive API results.
  // We store the count because we will need it in addNewStock().
  db.stocks[symbol] = {symbol: symbol, count: count};

  return symbol;
}

function addNewStock(data) {
  // extract info from API data and repackage into a local stock variable.
  var stockSymbol = data.Data.Symbol;
  var stockCount = db.stocks[stockSymbol].count;
  var subtotal = data.Data.LastPrice * stockCount;
  var change = (data.Data.Change > 0);
  var stock = { symbol: stockSymbol,
                name: data.Data.Name,
                quote: data.Data.LastPrice,
                count: stockCount,
                subtotal: subtotal,
                changePositive: change };

  /* Store the new-stock into a global variable and in remote database.
    *Using bracket notation to set the propertyname to a string variable, which will be the stock symbol,
    in case I later want to retrieve a stock's info by it's stock symbol.
    e.g. db.stocks.APPL = {symbol: APPL, count: 2};
   NOTE: we will use database child_added or updated to trigger displaying stocks in the page table.
  */
  db.stocks[stockSymbol] = stock;
  Δstocks.child(stockSymbol).set(stock);
}

function getStockQuote(symbol, fn) {
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?&&symbol=' + symbol, fn);
}
