'use strict';

// -------------------------------------------------------------------- //

// Firebase Schema
var Δdb, Δproducts, Δcustomers, Δorders;

// Local Schema (defined in keys.js)

// -------------------------------------------------------------------- //

$(document).ready(initialize);

function initialize(fn, flag){
  $(document).foundation();
  initializeDatabase();
  turnHandlersOn();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initializeDatabase() {
  Δdb = new Firebase(db.keys.firebase);
  Δproducts = Δdb.child('products');
  Δcustomers = Δdb.child('customers');
  Δorders = Δdb.child('orders');
  db.products = [];
  db.customers = [];
  db.orders = [];
  db.revenue = 0;

  Δproducts.on('child_added', dbLoadProduct);
}

function turnHandlersOn(){
  $('#add-product').on('click', clickAddProduct);
}

function turnHandlersOff(){
  $('#add-product').off('click', clickAddProduct);
}

// -------------------------------------------------------------------- //

function dbLoadProduct(snapshot) {
  console.log('in dbLoadProduct');
  var obj = snapshot.val();
  var product = new Product(obj.name, obj.image, obj.weight, obj.price, obj.off);
  product.id = snapshot.name();
  product.salePrice = product.price * (1 - (product.off * 0.01));
  db.products.push(product);
  htmlLoadProduct(product);
}

function htmlLoadProduct(product) {
  var row = '<tr><td class="product-name"></td><td class="product-image"><img></td><td class="product-weight"></td><td class="product-price"></td><td class="product-off"></td><td class="product-sale"></td></tr>';
  var $row = $(row);
  $row.children('.product-name').text(product.name);
  $row.children('.product-image').children('img').attr('src', '../img/'+product.image);
  $row.children('.product-weight').text(product.weight);
  $row.children('.product-price').text(product.price);
  $row.children('.product-off').text(product.off);
  $row.children('.product-sale').text(product.salePrice);
  $('#products').append($row);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickAddProduct() {
  var name = getValue('#product-name');
  var image = getValue('#product-image');
  var weight = getValue('#product-weight', parseInt);
  var price = getValue('#product-price', parseFloat);
  var off = getValue('#product-off', parseFloat);
  //get info from input fields and place into a product
  var product = new Product(name, image, weight, price, off);
  //cannot push a function to firebase
  delete product.salePrice;
  Δproducts.push(product);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function Product(name, image, weight, price, off) {
  this.name = name;
  this.image = image;
  this.weight = weight;
  this.price = price;
  this.off = off;
  this.salePrice = function salePrice(){
    return this.price * (1 - (this.off * 0.01));
  };
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
