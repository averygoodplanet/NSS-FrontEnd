$(document).ready(initialize);

function to_pig_latin(word){
  return word.slice(1) + word[0] + "a";
}

function comma_string_to_pl(string) {
  var word_array = string.split(', ');
  var new_array = [];
  for(i in word_array)
  {
    new_array.push(to_pig_latin(word_array[i]));
  }
  return new_array.join(', ');
}

function reverse_word_order(string) {
  //returns a comma-separated string of reverse word-order
  return string.split(", ").reverse().join(', ')
}

function initialize () {

}