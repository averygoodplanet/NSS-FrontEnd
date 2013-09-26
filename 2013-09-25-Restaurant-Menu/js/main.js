var menu = [];
var menu_types = ["side", "veggies", "chicken", "beef", "shrimp", "appetizer", "beverage"];
var another_item = "";


function user_creates_items ()
{
  do
  {
  var item = {};
  item.Name = prompt("Name of the item: ");
  item.Type = prompt("Type of item (e.g. side, veggies, chicken, beef, shrimp, appetizer, beverage): ");
  item.price = parseFloat(prompt("Price?: "));
  item.calories = parseFloat(prompt("Calories?: "));
  item.ingredients = prompt("Ingredients?: ");
  menu.push(item);
  another_item = prompt("Enter anything to add another item, otherwise just press enter.");
  } while(another_item);
}

function show_item (item) //e.g. item --> "- Shrimp curry (shrimp peppers curry powder) $2.99"
{
  var item_statement = "- "+item.Name+" ("+item.ingredients+") $"+item.price;
  return item_statement;
}

function print_items_by_type ()
{
  for(type in menu_types)
  {
    console.log(menu_types[type]);
    for(item in menu)
    {
      if(menu[item].Type == menu_types[type])
      {
        console.log(show_item(menu[item]));
      }
    }
  }
}

user_creates_items();
console.log("Our Menu:");
print_items_by_type();
console.log("Number menu items: "+menu.length);
console.log("Number of sections on our menu: "+menu_types.length);
/* menu_types.length assumes that each hard-coded menu_type will be used
at least once */
