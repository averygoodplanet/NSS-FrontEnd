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
  item.price = parseInt((prompt("Price?: "))*100);
  //storing price as number of cents to avoid having e.g. $1.1098374948.
  item.calories = parseFloat(prompt("Calories?: "));
  item.ingredients = prompt("Ingredients?: ");
  menu.push(item);
  another_item = prompt("Enter anything to add another item, otherwise just press enter.");
  } while(another_item);
}

function show_item (item) //e.g. item --> "- Shrimp curry (shrimp peppers curry powder) $2.99"
{
  var item_statement = "- "+item.Name+" ("+item.ingredients+") $"+((item.price/100).toFixed(2));
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

function total_cost()
{
  var sum = 0;
  for(i in menu)
  {
    sum += menu[i].price;
  }
  return ((sum/100).toFixed(2));
}

function total_calories()
{
  var sum = 0;
  for(i in menu)
  {
    sum += menu[i].calories;
  }
  return sum;
}


user_creates_items();
console.log("Our Menu:");
print_items_by_type();
console.log("Number menu items: "+menu.length);
console.log("Number of sections on our menu: "+menu_types.length);
console.log("Total calories of all items: "+total_calories());
console.log("Average calories per item: "+( (total_calories()) / menu.length ) );
/* menu_types.length assumes that each hard-coded menu_type will be used
at least once, i.e. it always display "appetizer" even if no items in menu with item.type = "appetizer" */
console.log("Total cost of all items: $"+total_cost());
console.log("Average item cost: $"+((total_cost())/menu.length));

