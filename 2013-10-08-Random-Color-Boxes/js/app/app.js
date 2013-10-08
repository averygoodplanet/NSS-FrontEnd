'use strict';
var timer = 0;


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#start').click(start);
}

function start() {
  var delay =  parseInt($('#delay').val(), 10) * 1000;
  timer = setInterval(makeBoxes, delay);
}

function makeBoxes() {
  console.log('timer: '+timer);
}