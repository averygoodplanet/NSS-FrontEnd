'use strict';

$(document).ready(initialize);

function addTask() {
  var $newRow = $('<tr>');

  var dueDateString = $('#dueDate').val();
  var $dueDateCell = $('<td>');
  $dueDateCell.text(dueDateString);

  var taskString = $('#task').val();
  var $taskCell = $('<td>');
  $taskCell.text(taskString);

  var colorString = $('#colorInput').val();
  var $colorCell = $('<td>');
  var $divInsideColorCell = $('<div>');
  $divInsideColorCell.css('background-color', colorString);
  $divInsideColorCell.css('height', '20px');
  $divInsideColorCell.css('width', '20px');
  $colorCell.append($divInsideColorCell);

  var $doneCell = $('<td>');
  var $checkboxInDoneCell = $('<input>');
  $checkboxInDoneCell.attr('type', 'checkbox');
  $checkboxInDoneCell.attr('class', 'checkbox');
  $doneCell.append($checkboxInDoneCell);

  var $removeCell = $('<td>');
  var $removeButton = $('<input>');
  $removeButton.attr('type', 'button');
  $removeButton.attr('value', 'Delete');
  $removeButton.attr('class', 'delete');
  $removeCell.append($removeButton);

  var $arrowsCell = $('<td>');
  var $upArrow = $('<img>');
  $upArrow.attr('src', 'images/upArrow.jpg');
  $upArrow.attr('class', 'up');
  var $downArrow = $('<img>');
  $downArrow.attr('src', 'images/downArrow.jpg');
  $downArrow.attr('class', 'down');
  $arrowsCell.append($upArrow, $downArrow);

  $newRow.append($dueDateCell, $taskCell, $colorCell, $doneCell, $removeCell, $arrowsCell);

  $('table').append($newRow);
}










function initialize () {
  $('#addTask').click(addTask);
}