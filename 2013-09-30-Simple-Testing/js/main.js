function add_three(number){
  return number + 3;
}

function square(number){
  return Math.pow(number, 2);
}

function area(length, width){
  return length * width;
}

function volume(length, width, height){
  return height * (area(length, width));
}

function power(number, exponent) {
  var result = 1;
  if(exponent > 0)
  {
    result = number;
    for(var i = 0; i < (exponent - 1); i++)
    {
      result *= number;
    }
    return result;
  }
  else if(exponent == 0)
  {
    return result;
  }
  else //if exponent less than zero.
  {
    for(var i = 0; i < (Math.abs(exponent)); i++)
    {
      result *= (1 / number);
    }
    return result;
  }
}

function greeting(salutation, name)
{
  return salutation + ", "+name+"!";
}

function pig_latin(word)
{
  return word.slice(1) + word.slice(0,1) + "a";
}

function pig_greeting(salutation, name)
{
  return pig_latin(salutation) + ", " + pig_latin(name) + "!";
}

function pig_sentence(sentence)
{
  var word_array = sentence.split(" ");
  var pig_word_array = [];
  for(var i = 0; i < word_array.length; i++)
  {
    pig_word_array.push(pig_latin(word_array[i]));
  }
  return pig_word_array.join(" ");
}