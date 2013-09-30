$(document).ready(initialize);

function make_green(){
  $("#green").css("background-color", "green");
}

function initialize(){
  $("#button1").click(make_green);
}