var colors = []

debugger;

var response = prompt('Enter a color or quit:');

while(response)
{
  colors.push(response);
  response = prompt('Enter a color:');
}


/*

do {
  colors.push(prompt('Enter a color or quit:'));
} while (response != 'quit');

*/