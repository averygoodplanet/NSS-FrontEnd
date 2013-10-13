'use strict';

//Firebase Schema
var Δdb;
var Δbalance;
var Δstocks;

//Local Schema
var db = {};
db.balance = 0;
db.stocks = {};

var timer, promiseCheckTimer, incompleteAPICalls, timerDelay;

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

  //on page-load is triggered for all stocks already in the remote database
  //also triggered when a newStock is added to the database via addNewStock()
  Δstocks.on('child_added', childAdded);

  // when they click "Buy button", add a stock
  $('#buy').click(buy);
  $('#setTimer').click(setTimer);
}

function setTimer() {
  //stop timer, then set and start timer with new delay.
  clearInterval(timer);
  timerDelay = parseFloat($('#timerInput').val())   * 1000;

  //on interval, calls updateStockPrices
  timer = setInterval(startUpdateStockPrices, timerDelay);
}

function startUpdateStockPrices() {
  //this function will make API calls to get updated stock quotes for all stocks
  // as each API call returns, will store updated quote and updated subtotal in
  // global (but not database).
  // ONCE ALL API calls returned(use promise-keeping with a separate timer
  // and count-down variable) then will update stocks in database.
  //*make sure that updating stocks in database triggers updating of
  //stocks on page, grandtotal, and red/green bar.

  //stop timer (will resume once finishStockupdate)
  clearInterval(timer);

  //get number of stocks--this global variable will count down for promise-keeping
  //as callbacks are complete. (set to zero, then set to number of stocks)
  incompleteAPICalls = _.size(db.stocks);

  //set a new timer that checks frequently to see if promises have reached zero
  clearInterval(promiseCheckTimer);
  promiseCheckTimer = setInterval(promiseCheck, 500);

  //make API calls for each stock and update global only for quote, subtotal, and positiveChange
  //in each API callback function is complete decrement the global promise count.
  for(var property in db.stocks){
    var symbol = db.stocks[property].symbol;
    getStockQuote(symbol, updateReturned);
  }

  //when new timer finds that promises have reached zero,
  // then clearInterval,  and call function to update stocks in database,
  //and verify (or make so, using e.g. child_changed) that updating stock
  //quote and subtotal in database triggers updating on stock display, grandtotal,
  //and red/green bar.
}

function updateReturned(data) {
  // extract updated quote, subtotal, changePositive from API data
  // and store in global variable only (not yet into database)
  var symbol = data.Data.Symbol;

  db.stocks[symbol].quote = data.Data.LastPrice;
  db.stocks[symbol].subtotal = data.Data.LastPrice * db.stocks[symbol].count;
  db.stocks[symbol].changePositive = (data.Data.Change > 0);

  //decrement promises
  incompleteAPICalls -= 1;
}


function promiseCheck() {
  if(incompleteAPICalls <= 0){
    clearInterval(promiseCheckTimer);
    finishUpdateStockPrices();
  }
}

function finishUpdateStockPrices() {
  //this function is supposed to be called when all the updates
  // to stock quotes, subtotal, and positiveChange have been made to global
  //this function should:

  //--update the database
  Δstocks.set(db.stocks);

  //cause (cascades) update to page DISPLAY for quote, subtotal, red/green, and grandtotal.
  // clear the table rows
  $('table#stocksTable tr:not(#headerRow)').remove();

  //for each stock--i.e. property--in global var db,
  //makeTableRow
  for(var property in db.stocks){
    makeTableRow(property);
  }

  //then update the stocks grand total
  updateTotalStocks();

  //restart timer
  timer = setInterval(startUpdateStockPrices, timerDelay);
}

function childAdded(snapshot) {
  var stockSymbol = snapshot.val().symbol;

  //load each stock object from database into global var
  db.stocks[stockSymbol] = snapshot.val();

  //add table rows for the stocks
  makeTableRow(stockSymbol);
  updateTotalStocks();
}

function updateTotalStocks() {
  //make local sum variable
  var sum = 0;
  //loop through each property in db.stocks
  //(each property is a stock)
  //get that stock's subtotal
  //add that stock's subtotal to sum
  for(var property in db.stocks){
    var singleStockSubtotal = db.stocks[property].subtotal;
    sum += singleStockSubtotal;
  }

  //format sum to two number to right of decimal point
  //and preceded with a '$'
  sum = '$' + sum.toFixed(2);
  //diplay the sum in #totalStocks
  $('#totalStocks').val(sum);
  //DESIGN CHOICE: Choosing to only keep the
  // grand total in the html element #totalStocks
  // at this time, since it is recalculated so often.
}

function makeTableRow(symbol) {
  //make emptyrow (with classes) that is a jQuery object
  var row = '<tr><td class="symbol"></td><td class="name"></td><td class="quote"></td><td class="count"></td><td class="subtotal"></td></tr>';
  var $row = $(row);
  //make local stock variable using symbol to pull stock
  // from global db
  var stock = db.stocks[symbol];

  //fill in each td by traversing the DOM
  $row.children('.symbol').text(stock.symbol);
  $row.children('.name').text(stock.name);
  $row.children('.quote').text(stock.quote);
  $row.children('.count').text(stock.count);
  $row.children('.subtotal').text(stock.subtotal);

  //append row to table
  $('#stocksTable').append($row);
}

function loadBalance(snapshot) {
  var balanceFromDatabase = snapshot.val();
  $('#displayedBalance').val('$'+balanceFromDatabase.toFixed(2));
  db.balance = balanceFromDatabase;
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
  updateAndDisplayBalance(stock);
}

function updateAndDisplayBalance(stock) {
  //subtract stock's subtotal--which is the cost of the shares purchased--from
  //balance stored in global variable and in database
  var subtotal = db.stocks[stock.symbol].subtotal;
  db.balance -= subtotal;
  Δbalance.set(db.balance);
  //update balance displayed on the screen
  $('#displayedBalance').val('$'+db.balance.toFixed(2));
}

function getStockQuote(symbol, fn) {
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?&&symbol=' + symbol, fn);
}
