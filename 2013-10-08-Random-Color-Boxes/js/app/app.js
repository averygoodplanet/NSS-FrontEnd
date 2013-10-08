'use strict';
var timer = 0;


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#start').click(start);
  $('#stop').click(stop);
  randomColor();
}

function start() {
  var delay =  parseFloat($('#delay').val(), 10) * 1000;
  timer = setInterval(makeBoxes, delay);
}

function stop() {
  clearInterval(timer);
  timer = 0;
}

//function returns random color
//in "rgba(0,0,0,0)" format
function randomColor(){
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var a = Math.random();
  var colorString = 'rgba(' + r + ', ' + g + ', ' + b + ', ' +a + ')';
  return colorString;
}

function makeBoxes() {
  var dimensionsString = $('#dimensions').val();
  var dimensions = dimensionsString.split(', ');
  var length = parseFloat(dimensions[0]);
  var width = parseFloat(dimensions[1]);
  var $box = $('<div>');
  var color = randomColor();
  $box.addClass('box');
  $box.css('height', length);
  $box.css('width', width);
  $box.css('background-color', color);
  $('#colors').prepend($box);
}