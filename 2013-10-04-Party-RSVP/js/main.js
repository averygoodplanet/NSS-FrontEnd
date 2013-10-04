'use strict';

$(document).ready(initialize);

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
}

function rsvp() {

}


function initialize() {
  $('#add').click(addRow);
  $('table').on('click', '.rsvp', rsvp);
}