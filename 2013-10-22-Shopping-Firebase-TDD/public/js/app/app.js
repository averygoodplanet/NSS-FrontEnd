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
  db.cart = db.pagination = {};
  db.products = [];
  db.customers = [];
  db.orders = [];
  db.cart.products = [];
  db.cart.totals = {};
  db.cart.totals.count = db.cart.totals.amount = db.cart.totals.weight = db.cart.totals.shipping = db.cart.totals.grand = 0;
  db.revenue = 0;
  db.pagination.currentPage = 1;
  db.pagination.perPage = 5;
  Δproducts.on('child_added', dbLoadProduct);
  Δcustomers.on('child_added', dbLoadCustomer);
}

function turnHandlersOn(){
  $('#add-product').on('click', clickAddProduct);
  $('#previous').on('click', clickPrevious);
  $('#next').on('click', clickNext);
  $('#add-customer').on('click', clickAddCustomer);
  $('select#select-customer').on('change', changeCustomer);
  $('tbody').on('click', '.product-image', clickProductImage);
}

function turnHandlersOff(){
  $('#add-product').off('click', clickAddProduct);
  $('#previous').off('click', clickPrevious);
  $('#next').off('click', clickNext);
  $('#add-customer').off('click', clickAddCustomer);
  $('select#select-customer').off('change', changeCustomer);
  $('tbody').off('click', '.product-image', clickProductImage);
}

// -------------------------------------------------------------------- //

function dbLoadProduct(snapshot) {
  var obj = snapshot.val();
  //product.salePrice function is reconstructed here.
  var product = new Product(obj.name, obj.image, obj.weight, obj.price, obj.off);
  product.id = snapshot.name();
  db.products.push(product);
  displayThisPageProducts();
}

function dbLoadCustomer(snapshot) {
  var obj = snapshot.val();
  var customer = new Customer(obj.image, obj.name, obj.isDomestic);
  customer.id = snapshot.name();
  db.customers.push(customer);
  AddCustomerToSelect(customer);
  db.cart.customer = customer;
}

//------------------------------------------------------------------------//
function AddCustomerToSelect (customer) {
  var option = '<option></option>';
  var $option = $(option);
  $option.text(customer.name);
  $option.attr('value', customer.name);
  $('#select-customer').prepend($option);
}

function changeCustomer() {
  //get customer name or value from option
  var customerNameText = $('select#select-customer option:selected')[0].value;

  //find customer object in db.customers from the customer name.
  var customerObject = _.find(db.customers, function(customer){return (customer.name === customerNameText);});
  //assign customer object to db.cart.customer
  db.cart.customer = customerObject;
}

function updateCartTotals() {
  //db.cart.totals.* was initialized in initializeDatabase function.
  //in this function, will want to before += lastproduct.x

  //get last product from ordered array db.cart.products
  var arrayLength = db.cart.products.length;
  var lastProduct = db.cart.products[arrayLength - 1];
  console.log(lastProduct);
  // will need a Quantity variable on products in db.cart.products
  /*
  .off: 10
  .price: 100
  .salePrice: function salePrice(){
  .weight: 2
  */

  /*
  db.cart.totals.count
  db.cart.totals.amount
  db.cart.totals.weight
  db.cart.totals.shipping
  db.cart.totals.grand
  */
}

//------------------------------------------------------------------------//
function displayThisPageProducts(){
  //for products on this page only, display product
  var pageNumber = db.pagination.currentPage;
  var perPage = db.pagination.perPage;
  var startIndex = ((pageNumber -1) * perPage);
  var endIndex = (pageNumber * perPage) - 1;
  $('#products tr').not('.headerRow').remove();
  //make loop through index to display each product; also checks that i < db.products.length
  for(var i = startIndex; (i <= endIndex) && (i < db.products.length); i++){
    htmlLoadProduct(db.products[i]);
  }
}

function htmlLoadProduct(product) {
  var row = '<tr><td class="product-name"></td><td class="product-image"><img></td><td class="product-weight"></td><td class="product-price"></td><td class="product-off"></td><td class="product-sale"></td></tr>';
  var $row = $(row);
  var displaySalePrice = '$' + (product.salePrice()).toFixed(2);
  $row.children('.product-name').text(product.name);
  $row.children('.product-image').children('img').attr('src', '../img/'+product.image);
  $row.children('.product-weight').text(product.weight);
  $row.children('.product-price').text(product.price);
  $row.children('.product-off').text(product.off);
  $row.children('.product-sale').text(displaySalePrice);
  $('#products').append($row);
}

function htmlResetRadioButtons(){
  //index = 0, 1 ...
  //dom is dom object i.e. <input></input>
  $('input[name="address"]').each(function(index, dom){
    dom.checked = false;
  });
}

function htmlDisplayCart() {
  console.log('htmlDisplayCart function called');
  // db.cart.products
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

function clickAddCustomer(){
  var customerImage = getValue('#customer-image');
  var customerName = getValue('#customer-name');
  var isDomestic = $('#domestic')[0].checked;
  var customer = new Customer(customerImage, customerName, isDomestic);
  htmlResetRadioButtons();
  Δcustomers.push(customer);
}

function clickProductImage() {
  //get product name from image clicked by DOM traversal
  var productName = $(this).parent().children('.product-name').text();

  //see if product is already in db.cart.products[i]
  var productFoundInCart = _.find(db.cart.products, function (cartProduct){return (cartProduct.name === productName);});
  if(productFoundInCart){
    //if product is already in db.cart.products[i], then increment that object's quantity
    var productIndexInCart = db.cart.products.indexOf(productFoundInCart);
    db.cart.products[productIndexInCart].quantity += 1;
  } else {
    //if product is not in db.cart.products[i], then find product object in db.products,
    //set its quantity to 1, and push object to db.cart.products
    var productObject = _.find(db.products, function(product){return (product.name === productName);});
    productObject.quantity = 1;
    db.cart.products.push(productObject);
  }
  updateCartTotals();
  htmlDisplayCart();
}

function clickPrevious() {
  //decrement current pagenumber
  db.pagination.currentPage -= 1;
  //display this page's products
  displayThisPageProducts();
  //call function to hide or show Next and Previous as appropriate;
  hideShowButtons();
}

function clickNext() {
  //increment current page
  db.pagination.currentPage += 1;
  //display this page's products
  displayThisPageProducts();
  //call function to hide or show Next and Previous as appropriate;
  hideShowButtons();
}

function hideShowButtons() {
  /*this function will properly hide or unhide Next and Previous buttons
  based on whether the current page is first, last, or middle page */
  var firstPageNumber = 1;
  var lastPageNumber = Math.ceil(db.products.length / db.pagination.perPage);
  var currentPageNumber = db.pagination.currentPage;
  if(currentPageNumber === firstPageNumber){
    console.log('on page 1');
    $('#previous').addClass('hidden');
  } else if(currentPageNumber < lastPageNumber){
    console.log('on a middle page');
    $('#previous, #next').removeClass('hidden');
  } else if(currentPageNumber === lastPageNumber){
    console.log('on the last page');
    $('#next').addClass('hidden');
  } else {
    alert('see hideShowButtons if-else statement.');
  }
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

function Customer(customerImage, customerName, isDomestic) {
  this.image = customerImage;
  this.name = customerName;
  this.isDomestic = isDomestic;
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
