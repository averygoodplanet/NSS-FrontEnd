'use strict';

$(document).ready(initialize);

var nukeCount = 0;
var arrowsCount = 0;

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
  createArrows($tr);
}

function createArrows($currentRow) {
  //adds 1 header column on first row creation.
  if(arrowsCount < 1){
    $('table').children().children().first().append('<td>');
  }

  arrowsCount += 1;
  var $cell = $('<td>');
  var $imgUp = $('<img>');
  var $imgDown = $('<img>');
  $imgUp.attr('src', 'images/upArrow.jpg');
  $imgDown.attr('src', 'images/downArrow.jpg');
  $imgUp.attr('class', 'up');
  $imgDown.attr('class', 'down');
  $cell.append($imgUp, $imgDown);
  $currentRow.append($cell);
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

function actionArrow() {
  var $arrow = $(this);
  var $thisRow = $arrow.parent().parent();
  var $cloneThisRow = $arrow.parent().parent().clone();
  var arrowClass = $arrow.attr('class');
  var $previousRow = $arrow.parent().parent().prev();
  var $nextRow = $arrow.parent().parent().next();
  if(arrowClass === 'up'){
    if(!$previousRow.hasClass('home')){
      $previousRow.before($cloneThisRow);
      $thisRow.remove();
    }
  } else if(arrowClass === 'down') {
    $nextRow.after($cloneThisRow);
    $thisRow.remove();
  } else {

  }
}

function initialize() {
  $('#add').click(addRow);
  $('table').on('click', '.rsvp', rsvp);
  $('table').on('click', '.nuke', actionNuke);
  $('table').on('click', '.up, .down', actionArrow);
}