function square(x)
{
  var area = Math.pow(x, 2);
  return area;
}

// console.log("Square 5: "+square(5));

function cube(x)
{
  return x * (square(x));
}

// console.log("Cube 5: "+cube(5));

function area_rect(width, height)
{
  return width * height;
}

// console.log("Area rectangle 3 by 4: "+area_rect(3,4));

function area_triangle(width, height)
{
  return 0.5 * area_rect(width, height);
}

// console.log("Area triangle 3 by 4: "+area_triangle(3,4));

function area_circle(radius)
{
  return Math.PI * Math.pow(radius, 2);
}

// console.log("area_of_circle(7): "+area_circle(7));

function cuft_to_gallons(cubic_feet)
{
  return (7.48052) * cubic_feet;
}

function volume_cylinder(radius, depth)
{
  return cuft_to_gallons(depth * area_circle(radius));
}

var diameter = 30;
var depth = 9;

console.log("You have " + volume_cylinder((diameter / 2), depth) + ' gallons of water in your pool.');


