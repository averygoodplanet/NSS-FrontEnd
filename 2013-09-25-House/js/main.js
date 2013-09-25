var rooms = [];
var another = "";
var window_price = 250;
var sq_ft_price = 200;
var house = {};

// function total(propertyname, array)
// {
//   var sum = 0;
//   for(var i = 0; i < array.length; i++)
//   {
//     sum += array[i].propertyname;
//     console.log(array[i].propertyname);
//   }
//   return sum;
// }

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
*/

house.number_rooms = rooms.length;
house.total_area = total_area();
house.total_windows = total_windows();
house.windows_cost = house.total_windows * window_price;
house.area_cost = house.total_area * sq_ft_price;
house.total_cost = house.windows_cost + house.area_cost;










