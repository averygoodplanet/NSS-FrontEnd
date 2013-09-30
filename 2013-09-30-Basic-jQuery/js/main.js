$(document).ready(initialize);

function initialize() {
  // $("div").css("background-color", "red");
  // $("div").css("font-size", "25px");
  // $("div").css("color", "yellow");

  // var color = prompt("What color?");
  // $('div').css("background-color", color);
  // var size = prompt("What font-size (px)?");
  // $('div').css("font-size", size+"px");

  var selector = prompt('Which div?');
  var cls = prompt('Class to add?');
  var new_text = prompt('What would you like to say?');
  $(selector).text(new_text);
  $(selector).addClass(cls);
}