var rooms = [];
var another = "";
var window_cost = 250;
var sq_ft_cost = 200;
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
3. Push to array called rooms
4. Calculated: total_area,
*/

house.total_area = total_area();
house.number_rooms = rooms.length;








