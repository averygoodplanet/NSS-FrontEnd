var rooms = [];
var another = "";
var window_price = 250;
var sq_ft_price = 200;
var pool_gallon_price = 0.25;
var house = {};

function total_area()
{
  var sum = 0;
  for(var i = 0; i < rooms.length; i++)
  {
    sum += rooms[i].area;
  }
  return sum;
}

function total_windows()
{
  var sum = 0;
  for(var i = 0; i < rooms.length; i++)
  {
    sum += rooms[i].number_windows;
  }
  return sum;
}

function pool_gallons(diameter, depth)
{
  // pi r squared
  var radius = diameter / 2;
  var circle_area = Math.PI * Math.pow(radius, 2);
  var cubic_volume = circle_area * depth;
  console.log("cubic_volume: "+cubic_volume);
  return cubic_volume * 7.48052; // 7.48052 gallons per cubic foot.
}

function display()
{
  for(property in house)
  {
    if( house[property] instanceof Array != true)
    {
          console.log(property + ": "+house[property]);
    }
    else
    {
      console.log(property + " (an Array):");
      for(var i = 0; i < house[property].length; i++)
      {
        console.log(house[property][i]);
      }
    }
  }
}

do
{
  var room = {};
  room.Name = prompt("Name of the room?:");
  room.Length = parseFloat(prompt("Length of the room?"));
  room.Width = parseFloat(prompt("Width of room?"));
  room.area = room.Length * room.Width;
  room.number_windows = parseInt(prompt("Number of windows?"));
  rooms.push(room);
  another = prompt("If you want to add another room type 'Y', otherwise blank: ");
} while (another == "Y");

/* Done:
1. Get room objects from users.
2. Room objects contain: Name, Length, Width, area, number_windows.
3. Pushed room objects (with properties) to array called rooms.
4. Calculated and assigned the following to house object: number_rooms, total_area, total_windows.
5. If statement prompt let's user decide whether to add a pool.
6. Get pool diameter and depth as floats and assign pool object as house.pool property.
7. pool_volume function determines pool volume in gallons
8. Everything works (including pool) except for need to display results.
*/
if(prompt("To add a pool, type 'Y':") == 'Y')
{
  var pool = {};
  pool.diameter = parseFloat(prompt("What's the pool's diameter in feet?"));
  pool.depth = parseFloat(prompt("How deep is the pool in feet?"));
  //add a function call here to a function that calculates volume of pool in gallon
  //then determine price of pool as $0.25 * gallons. $0.25 will be inside pool_gallon_price.
  pool.volume = pool_gallons(pool.diameter, pool.depth);
  pool.cost = pool.volume * pool_gallon_price;
  house.pool = pool;
}

house.rooms = rooms;
house.number_rooms = rooms.length;
house.total_area = total_area();
house.total_windows = total_windows();
house.windows_cost = house.total_windows * window_price;
house.area_cost = house.total_area * sq_ft_price;
house.total_cost = house.windows_cost + house.area_cost;

display();






