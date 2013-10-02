$(document).ready(initialize);

function makeColorBoxes() {
  var colorstring = $('#colorstring').val();
  console.log(colorstring);
  var colors = colorstring.split(', ');
  for(i in colors){
    var $box = $('<div>');
    $box.addClass('box');
    $box.css('background-color', colors[i]);
    $('#boxes').append($box);
  }
}









function initialize() {
  $('#colorbutton').click(makeColorBoxes);
}