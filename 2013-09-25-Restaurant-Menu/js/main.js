var menu = [];
var another_item = "";
// debugger;


  do
  {
  var item = {};
  item.Name = prompt("Name of the item: ");
  item.Type = prompt("Type of item (e.g. side, veggies, chicken, chicken breast, beef, shrimp, appetizer, beverage): ");
  item.price = parseFloat(prompt("Price?: "));
  item.calories = parseFloat(prompt("Calories?: "));
  item.ingredients = prompt("Ingredients?: ");
  menu.push(item);
  another_item = prompt("Enter anything to add another item, otherwise just press enter.");
  } while(another_item);

console.log(menu);