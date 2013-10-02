$(document).ready(initialize);

function makingBoxes() {
  var numberBoxes = parseInt($('#amount').val());
  var box_array = [];
  for(var i = 0; i < numberBoxes; i++) {
    var box = $('<div>');
    box.addClass('box');
    $("#boxes").append(box);
  }
}

function initialize() {
  $('#make_boxes').click(makingBoxes);
}