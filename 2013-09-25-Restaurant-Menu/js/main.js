var menu = [];

debugger;
console.log("Hello");

var item = {};
item.Name = prompt("Name of the item: ");
item.Type = prompt("Type of item (e.g. side, veggies, chicken, chicken breast, beef, shrimp, appetizer, beverage): ");
item.price = parseFloat(prompt("Price?: "));
item.calories = parseFloat(prompt("Calories?: "));
item.ingredients = prompt("Ingredients?: ");
menu.push(item);

console.log("menu: "+menu);