$(document).ready(initialize);

function addColor() {
  var $box = $('<div>');
  var box_color = $('#color').val();
  $box.addClass('box');
  $box.css('background-color', box_color);
  $('#colors').append($box);
  $('#color').val('');
  $('#color').focus();
}




function initialize() {
  $('#color').val('');
  $('#color').focus();
  $('#addColor').click(addColor);


  //on Enter keypress call addColor function.
  $('#color').keypress(function (event) {
    if(event.which == 13)
      addColor();
  });
}