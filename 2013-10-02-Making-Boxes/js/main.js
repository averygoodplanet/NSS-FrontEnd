$(document).ready(initialize);

function makingBoxes() {
  var numberBoxes = parseInt($('#amount').val());
  var box_array = [];
  var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  for(var i = 0; i < numberBoxes; i++) {
    var $box = $('<div>');
    $box.addClass('box');
    $box.css('background-color', colors[i%7]);
    $box.css('border-radius', _.random(0, 50));
    $("#boxes").append($box);
  }
}

function initialize() {
  $('#make_boxes').click(makingBoxes);
}