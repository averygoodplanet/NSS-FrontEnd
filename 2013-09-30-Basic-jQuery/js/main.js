$(document).ready(initialize);

function initialize() {
  // $("div").css("background-color", "red");
  // $("div").css("font-size", "25px");
  // $("div").css("color", "yellow");

  // var color = prompt("What color?");
  // $('div').css("background-color", color);
  // var size = prompt("What font-size (px)?");
  // $('div').css("font-size", size+"px");

  // var selector = prompt('Which div?');
  // var cls = prompt('Class to add?');
  // var new_text = prompt('What would you like to say?');
  // $(selector).text(new_text);
  // $(selector).addClass(cls);

  // var selector_to_hide = prompt("Which node do you want to hide?");
  // $(selector_to_hide).hide();
  function change_div_text(){
    var name = $('#name').val();
    var color = $('#color').val();
    $('#b').text(name).css("background-color", color);
    //chaining
  }

  $("#clicker").click(change_div_text); //**You are registering an event handler--do not put parens after alertme.
  //.click(alert_me) -- run alert_me on click.
  //.click(alert_me()) -- run alert immediately.
}