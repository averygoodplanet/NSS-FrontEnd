'use strict';

var db;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);
  db = new Firebase('https://inventory-ph.firebaseio.com/');
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
  var amount = $('#amount').val();
  var value = $('#value').val();
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var row = '<tr><td class="name"></td><td class="count"></td><td class="cost"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(name);
  $row.children('.count').text(amount);
  $row.children('.cost').text(value);
  $row.children('.room').text(room);
  $row.children('.condition').text(condition);
  $row.children('.date').text(date);

  $('#items').append($row);
}