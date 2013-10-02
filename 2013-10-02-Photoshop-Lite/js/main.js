$(document).ready(initialize);

function clearInputAndFocus () {
  $('#color').val('');
  $('#color').focus('');
}

function addColor() {
  var $box = $('<div>');
  var box_color = $('#color').val();
  $box.addClass('box');
  $box.css('background-color', box_color);
  $('#colors').prepend($box);
  clearInputAndFocus();
}

function initialize() {
  clearInputAndFocus();
  $('#addColor').click(addColor);

  //on Enter keypress call addColor function.
  $('#color').keypress(function (event) {
    if(event.which == 13)
      addColor();
  });

}