$(document).ready(initialize);

function convert_to_piglatin(word) {
  return word.slice(1) + word[0] + "a";
}

function displayresult() {
  var original = $('#original').val();
  var piglatin = convert_to_piglatin(original);
  $('#piglatin').text(piglatin);
}

function initialize(){
  $('#pig').click(displayresult);
}