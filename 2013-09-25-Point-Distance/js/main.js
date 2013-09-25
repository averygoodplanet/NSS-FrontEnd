var points = [];
var distance = 0;

//Prompt user for x-coordinate and y-coordinate for two (2) points.
for(var i = 0; i < 2; i++)
{
  var point = {};
  point.x = parseFloat(prompt("Enter x-coordinate for point 1: "));
  point.y = parseFloat(prompt("Enter y-coordinate for point 1: "));
  points.push(point);
}

console.log("points: "+points);

distance = Math.sqrt((Math.pow((points[0].x - points[1].x),2))+(Math.pow((points[0].y - points[1].y),2)));

console.log("distance: "+distance);