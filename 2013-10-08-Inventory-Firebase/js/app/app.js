'use strict';

var db;
var items;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);

  //db is the root of the database structure
  db = new Firebase('https://inventory-ph.firebaseio.com/');
  items = db.child('items');

  //db.on constantly listens.
  db.on('value', firebaseCallback);

  // written as anonymous function
  // db.on('value', function(snapshot) {
  // console.log(snapshot.val());
  // });
}

function firebaseCallback (snapshot) {
  var inventory = snapshot.val();
  $('#person').val(inventory.fullName);
  $('#address').val(inventory.address);
}

function save() {
  var fullName = $('#person').val();
  var address = $('#address').val();
  var inventory = {};
  inventory.fullName = fullName;
  inventory.address = address;
  db.set(inventory);
  console.log(inventory);
}


function add() {
  var name = $('#name').val();
  var count = $('#amount').val();
  var value = $('#value').val();
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var row = '<tr><td class="name"></td><td class="count"></td><td class="cost"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(name);
  $row.children('.count').text(count);
  $row.children('.cost').text(value);
  $row.children('.room').text(room);
  $row.children('.condition').text(condition);
  $row.children('.date').text(date);

  var item = {};
  item.name = name;
  item.count = count;
  item.value = value;
  item.room = room;

  items.push(item);

  $('#items').append($row);
}