'use strict';

var  Δdb;
var Δitems; //database copy of items
var items; //local copy of items

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);

  //db is the root of the database structure
  Δdb = new Firebase('https://inventory-ph.firebaseio.com/');
  Δitems = Δdb.child('items');

  //db.on first time gives you value, then listens and sends whenever changes to data
  Δdb.on('value', receivedDbData);

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

function receivedDbData(snapshot) {
  console.log('receivedDbData is being called');
  var inventory = snapshot.val();
  $('#person').val(inventory.fullName);
  $('#address').val(inventory.address);

  if(inventory.items){
    console.log('Yes, there are items');
    items = inventory.items;
    loadRows();
  } else {
    console.log('No, there are no items');
    items = [];
  }
}

function save() {
  var fullName = $('#person').val();
  var address = $('#address').val();
  var inventory = {};
  inventory.fullName = fullName;
  inventory.address = address;
  Δdb.update(inventory);
  console.log(inventory);
}

function loadRows() {
  for(var i = 0; i < items.length; i++) {
    console.log(items[i]);
    var name = items[i].name;
    var count = items[i].count;
    var value = items[i].value;
    var room = items[i].room;
    var condition = items[i].condition;
    var date = items[i].date;

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
  item.condition = condition;
  item.date = date;

  $('#items').append($row);

  items.push(item);
  Δitems.set(items);
}