'use strict';
var timer = 0;


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#start').click(start);
  $('#stop').click(stop);
}

function start() {
  var delay =  parseInt($('#delay').val(), 10) * 1000;
  timer = setInterval(makeBoxes, delay);
}

function stop() {
  clearInterval(timer);
  timer = 0;
}

function makeBoxes() {
  console.log('timer: '+timer);
  var dimensionsString = $('#dimensions').val();
  var dimensions = dimensionsString.split(', ');
  var length = parseFloat(dimensions[0]);
  var width = parseFloat(dimensions[1]);
  var $box = $('<div>');
  $box.addClass('box');
  $box.css('height', length);
  $box.css('width', width);
  $('#colors').prepend($box);
}