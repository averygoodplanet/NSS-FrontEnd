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
  else
  {
    return result;
  }
}