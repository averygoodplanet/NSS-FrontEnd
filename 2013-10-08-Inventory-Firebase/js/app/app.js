'use strict';

var  Δdb;
var Δitems; //database copy of items
var items; //local copy of items

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);

  Δdb = new Firebase('https://inventory-ph.firebaseio.com/');
  Δitems = Δdb.child('items');

  Δdb.once('value', receivedDbData);
  Δitems.on('child_added', childAdded);
}

function childAdded(snapshot) {
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
}

function receivedDbData(snapshot) {
  var inventory = snapshot.val();
  $('#person').val(inventory.fullName);
  $('#address').val(inventory.address);

  items = [];

  for(var property in inventory.items){
    var item = inventory.items[property];
    items.push(item);
  }
}

function save() {
  var fullName = $('#person').val();
  var address = $('#address').val();
  var inventory = {};
  inventory.fullName = fullName;
  inventory.address = address;
  Δdb.update(inventory);
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