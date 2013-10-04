'use strict';

$(document).ready(initialize);

var nukeCount = 0;

function addRow() {
  var $tr = $('<tr>');
  var $name = $('<td>');
  $name.addClass('name');
  var $food = $('<td>');
  $food.addClass('food');
  var $ctrl = $('<td>');
  $ctrl.addClass('ctrl');

  var $input = $('<input>');
  $input.attr('type', 'text');
  $input.attr('placeholder', 'e.g. Bob, chips');

  var $button = $('<input>');
  $button.attr('type', 'button');
  $button.attr('value', 'RSVP!');
  $button.addClass('rsvp');

  $ctrl.append($input, $button);
  $tr.append($name, $food, $ctrl);
  $('table').append($tr);
  $input.focus();
  createNuke($tr);
}

function createNuke($currentRow) {
  //adds 1 header column on first row creation.
  if(nukeCount < 1){
    $('table').children().children().first().append('<td>');
  }

  nukeCount += 1;
  var $cell = $('<td>');
  var $button = $('<input>');
  $button.attr('type', 'button');
  $button.attr('value', 'Nuke!');
  $button.attr('class', 'nuke');
  $cell.append($button);
  $currentRow.append($cell);
}

function actionNuke() {
  var $nuke = $(this);
  $nuke.parent().parent().remove();
}

function rsvp() {
  var $button = $(this);
  var $textBox = $button.prev();
  var text = $textBox.val();
  var items = text.split(', ');
  var name = items[0];
  var food = items[1];

  // $button.parent().prev().prev().text(name); //alternate syntax;
  $button.parent().siblings('.name').text(name);

  // $button.parent().prev().text(food);  //alternate syntax
  $button.parent().siblings('.food').text(food);
}


function initialize() {
  $('#add').click(addRow);
  $('table').on('click', '.rsvp', rsvp);
  $('table').on('click', '.nuke', actionNuke);
}