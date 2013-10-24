'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

//Tests in QUnit run in random order.

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  // Reset Global Variables Here
  db.products = [];
  db.customers = [];
  db.orders = [];
  // Clean Out Test Database Here
  Δdb.remove();
}

function teardownTest(){
}

test('Add Product', function(){
  expect(12);

  //setup
  $('#product-image').val('ipad-air.png');
  $('#product-name').val('Ipad Air');
  $('#product-weight').val('1.0');
  $('#product-price').val('499.00');
  $('#product-off').val('10');
  $('#add-product').trigger('click');

  //assertions
  equal(db.products.length, 1, 'products array should have 1 element');
  ok(db.products[0].id, 'id should be populated');
  ok(db.products[0] instanceof Product, 'product should be an instanceof Product');
  equal(db.products[0].image, 'ipad-air.png', 'product should have an image');
  equal(db.products[0].name, 'Ipad Air', 'product should have a name');
  equal(db.products[0].weight, 1.0, 'product should have a weight');
  equal(db.products[0].salePrice(), 449.1, 'product should have a sale price');

  equal($('#products tr').length, 2, '#products table should have two (2) rows');
  equal($('#products tr:nth-child(2) > td').length, 6, 'should be 6 columns in row');
  equal($('#products .product-name').text(), 'Ipad Air', 'name column should be populated');
  equal($('#products .product-sale').text(), '$449.10', 'sale column should be populated');
  //QUnit.close(db.products[0].salePrice(), 449.10, 1, 'sale price should be 449.10 +- 1');
  equal($('#products .product-image img').attr('src'), '../img/ipad-air.png', 'image column should be populated');
});

test('Customer DropDown and Shopping Cart', function(){
  expect(7);

  //setup
  for(var i = 0; i < 5; i++){
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var isDomestic = _.shuffle([true, false])[0];
    createTestCustomer(name, image, isDomestic);
  }

  createTestCustomer('Bob', 'bob.png', true);

  //table headers
  //name, count, subtotal, weight, shippingcost, total(subtotal + shipping cost)

  //assertions
  equal(db.customers.length, 6, 'should have 6 customers');
  equal($('select#select-customer option').length, 6, 'should have 6 option tags');
  equal($('select#select-customer option:nth-child(1)').val(), 'Bob', 'first customer value should be Bob');
  equal($('select#select-customer option:nth-child(1)').text(), 'Bob', 'first customer text should be Bob');
  ok($('table#cart').length, 'shopping cart should be visible');
  equal($('table#cart th').length, 6, 'shopping cart should have 6 columns headers');
  ok($('#purchase').length, 'purchase button should be visible');
});

test('Add Customer', function(){
  expect(7);

  //setup
  $('#customer-image').val('bob.png');
  $('#customer-name').val('Bob Jenkins');
  $('#domestic')[0].checked = true;
  $('#add-customer').trigger('click');

  //assertions
  equal(db.customers.length, 1, 'db.customers should have 1 object');
  ok(db.customers[0] instanceof Customer, 'db.customers[0] should be a Customer object');
  equal(db.customers[0].name, 'Bob Jenkins', 'db.customers[0].name should be Bob Jenkins');
  equal(db.customers[0].image, 'bob.png', 'db.customers[0].image should be bob.png');
  ok(db.customers[0].id, 'id should be present');
  ok(db.customers[0].isDomestic, 'should be domestic');

  ok(!$('#domestic')[0].checked, 'domestic radio button should be unchecked');
});


test('Product Pagination', function() {
  expect(18);

  for(var i = 0; i < 12; i++){
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var weight = Math.random() * 100;
    var price = Math.random() * 1000;
    var off = Math.random() * 100;

    createTestProduct(name, image, weight, price, off);
  }

  equal(db.products.length, 12, 'db.products should have 12 products');
  equal(db.pagination.perPage, 5, 'should be 5 products per page');
  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tbody > tr').length, 6, 'should have 5 products in table');
  equal($('#previous.hidden').length, 1, 'previous button (on first page) should have .hidden');
  equal($('#next:not(.hidden)').length, 1, 'next button (on first page) should exist and not have .hidden');

  $('#next').trigger('click');
  //should now be on page 2
  equal(db.pagination.currentPage, 2, 'should be on second page');
  equal($('#products tbody > tr').length, 6, 'should have 5 products in table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button (on second page) should exist and not hidden');
  equal($('#next:not(.hidden)').length, 1, 'next button (on second page) should exist and not have .hidden');

  $('#next').trigger('click');
  //now on page 3
  equal(db.pagination.currentPage, 3, 'should be on first page');
  equal($('#products tbody > tr').length, 3, 'should have 2 products in table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button (on third page) should not be hidden');
  equal($('#next.hidden').length, 1, 'next button (on third page) should exist and should be hidden');

  $('#previous').trigger('click');
  $('#previous').trigger('click');
  //back on first page
  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tbody > tr').length, 6, 'should have 5 products in table');
  ok($('#previous').hasClass('hidden'), 'previous button (on first page) should have .hidden');
  ok(!$('#next').hasClass('hidden'), 'next button (on first page) should not have .hidden');
});


function createTestProduct(name, image, weight, price, off){
  $('#product-image').val(image);
  $('#product-name').val(name);
  $('#product-weight').val(weight);
  $('#product-price').val(price);
  $('#product-off').val(off);
  $('#add-product').trigger('click');
}

function createTestCustomer(name, image, isDomestic){
  $('#customer-name').val(name);
  $('#customer-image').val(image);

  if(isDomestic){
    $('#domestic')[0].checked = true;
  } else {
    $('#international')[0].checked = true;
  }

  $('#add-customer').trigger('click');
}

// Firebase is synchronous because you have a persistent connection through websockets.
// equal is used for comparison between simple numbers and strings
// deepEqual is for complex types e.g. objects or arrays.
// ok is for boolean test
