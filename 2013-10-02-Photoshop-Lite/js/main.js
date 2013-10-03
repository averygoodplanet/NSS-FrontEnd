'use strict';
//JSHint: using strict version of Javascript

$(document).ready(initialize);

function clearInputAndFocus () {
  $('#color').val('');
  $('#color').focus('');
}

function addColor() {
  var $box = $('<div>');
  var boxColor = $('#color').val();
  $box.addClass('box');
  $box.css('background-color', boxColor);
  $('#colors').prepend($box);
  clearInputAndFocus();
}

function brushClicked() {
  alert('the brush was clicked');
}

function boxClicked() {
  //converting  this-DOM object into jQuery object;
  var $box = $(this);
  var color = $box.css('background-color');
  $('#brush').css('background-color', color);
}

function addBox() {
  var numberBoxes = parseInt($('#amount').val());
  for(var i = 0; i < numberBoxes; i++){
    $('#boxes').prepend($pixel);
    var pixelColor = $('#brush').css('background-color');
    var $pixel = $('<div>');
    $pixel.css('background-color', pixelColor);
    $pixel.addClass('pixel');
  }
}

function initialize() {
  clearInputAndFocus();
  $('#addColor').click(addColor);
  $('#brush').click(brushClicked);
  //because boxes are created after initialized...
  //$('parent_selector').on('name of event', 'child selector', name_of_function);
  $('#colors').on('click', '.box', boxClicked);
  //on Enter keypress call addColor function.
  $('#color').keypress(function (event) {
    if(event.which === 13){
      addColor();
    }
  });

  $('#add_box').click(addBox);
}