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
  equal($('table#cart thead tr:nth-child(1) th').length, 6, 'shopping cart should have 6 columns headers');
  ok($('#purchase').length, 'purchase button should be visible');
});

test('Add Items to Shopping Cart', function(){
  expect(19);

  //setup
  //create some customers
  createTestCustomer('Bob', 'bob.png', true);
  createTestCustomer('Sally', 'sally.png', false);

  //select customer from drop-down
  $('#select-customer').val('Sally');
  //create some products
  createTestProduct('iPad Air', 'ipad-air.png', 1, 500, 10); // sale price = 450
  createTestProduct('iPhone 5s', 'iphone-5s.png', 0.5, 200, 0); // sale price = 200
  createTestProduct('Apple TV', 'apple-tv.png', 1.5, 100, 5); // sale price = 95
  //  2 x iphone 5s
  $('#products tr:nth-child(3) .product-image img').trigger('click');
  $('#products tr:nth-child(3) .product-image img').trigger('click');

  //1 ipad air
  $('#products tr:nth-child(2) .product-image img').trigger('click');

  //1 Apple TV
  $('#products tr:nth-child(4) .product-image img').trigger('click');

  //assertions
  equal(db.cart.customer.name, 'Sally', 'shopping cart should belong to Sally');
  ok(db.cart.customer instanceof Customer, 'Sally should be a customer');
  equal(db.cart.products.length, 4, 'should be 4 items in shopping cart');
  ok(db.cart.products[0] instanceof Product, 'first item in products should be a Product');
  equal(db.cart.totals.count, 4, 'should have chosen four items');
  equal(db.cart.totals.amount, 945, 'total before shipping 945');
  equal(db.cart.totals.weight, 3.5, 'weight total should be 3.5');

  //  domestic $0.50 per lb; international $1.50 per lb
  equal(db.cart.totals.shipping, 5.25, 'shipping total 5.25');
  equal(db.cart.totals.grand, 950.25, 'total amount should be 950.25');

  //lump same items into 1 row (1 header row, 3 object-kind row, 1 footer row)
  equal($('#cart thead tr').length, 1, 'cart should have 1 header row');
  equal($('#cart tbody tr').length, 3, 'cart should have 3 body rows');
  equal($('#cart tfoot tr').length, 1, 'should be a footer');

  equal($('#cart tbody tr:nth-child(1) .product-name').text(), 'iPhone-5s', 'name should be iPhone 5s');
  equal($('#cart tbody tr:nth-child(1) .product-count').text(), '2', 'count should be 2');

  equal($('#cart tfoot tr #cart-count').text(), '4', '#cart-count should be four');
  equal($('#cart tfoot tr #cart-amount').text(), '$945.00', '#cart-amount should be $945.00');
  equal($('#cart tfoot tr #cart-weight').text(), '3.5 lbs', '#cart-weight should be 3.5 lbs');
  equal($('#cart tfoot tr #cart-shipping').text(), '$5.25', '#cart-shipping should be $5.25');
  equal($('#cart tfoot tr #cart-grand').text(), '$950.25', '#cart-grand should be $950.25');
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
