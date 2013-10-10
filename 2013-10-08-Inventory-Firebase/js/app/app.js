'use strict';

//Database Schema
var  Δdb;
var Δitems; //database copy of items
var Δperson;

//Local Schema
var db = {}; //local copy of database
db.person = {};
db.items = []; //*an array in our program variable; in the cloud it is a an object
db.statistics = {};
db.statistics.grandTotal = 0;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);

  Δdb = new Firebase('https://inventory-ph.firebaseio.com/');
  Δitems = Δdb.child('items');
  Δperson = Δdb.child('person');
  Δperson.on('value', personChanged);
  Δitems.on('child_added', itemAdded);
}

function itemAdded(snapshot) {
  //this snapshot is from 'child_added' and is only the added object.
  var name = snapshot.val().name;
  var count = snapshot.val().count;
  var value = snapshot.val().value;
  var room = snapshot.val().room;
  var condition = snapshot.val().condition;
  var date = snapshot.val().date;

  var row = '<tr><td class="name"></td><td class="count"></td><td class="cost"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(name);
  $row.children('.count').text(count);
  $row.children('.cost').text(value);
  $row.children('.room').text(room);
  $row.children('.condition').text(condition);
  $row.children('.date').text(date);

  $('#items').append($row);
  var item = {};
  item.name = name;
  item.count = count;
  item.value = value;
  item.room = room;
  item.condition = condition;
  item.date = date;

  db.items.push(item);
  updateTotal(snapshot.val());
}


function personChanged(snapshot) {
  db.person = snapshot.val();
  try{
    $('#person').val(db.person.fullName);
    $('#address').val(db.person.address);
  } catch (error) {
    console.log('Error: '+error);
  }
}

function updateTotal(snapshot) {
  var count = parseInt(snapshot.count, 10);
  var value = parseFloat(snapshot.value);
  var lineItemTotal = count * value;
  db.statistics.grandTotal += lineItemTotal;
  var sumString = '$' + db.statistics.grandTotal;
  $('#totalCost').val(sumString);
}


function save() {
  db.person.fullName = $('#person').val();
  db.person.address = $('#address').val();
  Δperson.set(db.person);
}

function add() {
  var name = $('#name').val();
  var count = $('#amount').val();
  var value = $('#value').val();
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var item = {};
  item.name = name;
  item.count = count;
  item.value = value;
  item.room = room;
  item.condition = condition;
  item.date = date;

  Δitems.push(item);
}