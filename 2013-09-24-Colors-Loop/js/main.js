var colors = []

// debugger;
var response = prompt('Enter a color:');
var total_length = null;

while(response)
{
  colors.push(response);
  response = prompt('Enter a color:');
}



for(var count = 0; count < colors.length; count++)
{
  console.log("You typed in color: "+colors[count]);
  //statements here;
}

debugger;

for(var count = (colors.length - 1); count >= 0; count--)
{
  total_length += colors[count].length;
}
var avg = total_length / colors.length;

console.log("total_length: "+total_length);
console.log("avg: "+avg);