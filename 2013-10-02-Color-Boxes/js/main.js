$(document).ready(initialize);

function makeColorBoxes() {
  var colorstring = $('#colorstring').val();
  console.log(colorstring);
  var colors = colorstring.split(', ');
  for(i in colors){
    var $box = $('<div>');
    $box.addClass('box');
    $box.css('background-color', colors[i]);
    $box.text(colors[i]);
      if(colors[i] == 'white' || colors[i] == 'yellow')
        $box.css('color', 'black');
    $('#boxes').append($box);
  }
}


function clearInput() {
  $('#colorstring').val('');
}








function initialize() {
  $('#colorbutton').click(makeColorBoxes);
  $('#colorstring').val('');
  // a UX featuer (user-experience)
  // on load, the cursor is already in the form
  $('#colorstring').focus();
  $('#clearinput').click(clearInput);
}