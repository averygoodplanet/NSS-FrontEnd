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

}
