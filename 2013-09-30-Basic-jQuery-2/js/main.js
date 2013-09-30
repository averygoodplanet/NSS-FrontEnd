$(document).ready(initialize);

function make_green(){
  $("#green").css("background-color", "green");
}

function count_characters(){
  // debugger;
  var name = $('#name_txt').val();
  var name_length = name.length;
  $("#name_div").text(name + "is " + name_length + " characters long.");
}

function initialize(){
  $("#button1").click(make_green);
  $("#name_btn").click(count_characters);
}