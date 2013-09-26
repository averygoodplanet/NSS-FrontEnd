var menu = [];
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

user_creates_items();
console.log(menu);
// console.log(show_item(menu[0]));
