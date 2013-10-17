'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  //code that you need to run before a test.
  initialize(null, true);
}

function teardownTest(){
  //code that you need to run after a test finishes.
}

//where an event is involved, use asyncTest
test('Calculate 2 numbers', function(){
  //number of assertions
  //NOTE: Disable your Chrome plugins before running the test, or will get Source: 0 error.
  // see issue at https://github.com/jquery/qunit/issues/278
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#op1').val(), '', 'op1 should be blank');
  deepEqual($('#op2').val(), '', 'op2 should be blank');
  deepEqual($('#operator').val(), '', 'operator should be blank');
  deepEqual($('#result').text(), '6', 'result should be 6');
});

test('Paper Trail', function() {
  expect(21);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#history > ul > li').length, 2, 'should be two <li>');

  deepEqual($('#history > uL > li:first-child > span').length, 5, 'should be five spans in first li');
  deepEqual($('#history > ul > li:nth-child(2) > span').length, 5, 'should be five spans in second li');

  deepEqual($('#history > ul > li:first-child > span:first-child').text(), '7', 'should be 7 in first span top');
  deepEqual($('#history > ul > li:first-child > span:nth-child(2)').text(), '*', 'should be * in 2nd span top');
  deepEqual($('#history > ul > li:first-child > span:nth-child(3)').text(), '8', 'should be 8 in 3rd span top');
  deepEqual($('#history > ul > li:first-child > span:nth-child(4)').text(), '=', 'should be = in 4th span top');
  deepEqual($('#history > ul > li:first-child > span:nth-child(5)').text(), '56', 'should be 56 in 5th span top');

  deepEqual($('#history > ul > li:nth-child(2) > span:first-child').text(), '3', 'should be 3 in first span 2nd row');
  deepEqual($('#history > ul > li:nth-child(2) > span:nth-child(2)').text(), '+', 'should be + in 2nd span 2nd row');
  deepEqual($('#history > ul > li:nth-child(2) > span:nth-child(3)').text(), '2', 'should be 2 in 3rd span 2nd row');
  deepEqual($('#history > ul > li:nth-child(2) > span:nth-child(4)').text(), '=', 'should be = in 4th span 2nd row');
  deepEqual($('#history > ul > li:nth-child(2) > span:nth-child(5)').text(), '5', 'should be 5 in 5th span 2nd row');

  ok($('#history > ul > li:first-child > span:nth-child(1)').hasClass('op1'), 'should be op1 class in 1st span 1st row');
  ok($('#history > ul > li:first-child > span:nth-child(2)').hasClass('operator'), 'should be operator class in 2nd span 1st row');
  ok($('#history > ul > li:first-child > span:nth-child(3)').hasClass('op2'), 'should be op2 class in 3rd span 1st row');
  ok($('#history > ul > li:first-child > span:nth-child(5)').hasClass('result'), 'should be result class in 5th span 1st row');

  ok($('#history > ul > li:nth-child(2) > span:nth-child(1)').hasClass('op1'), 'should be op1 class in 1st span 1st row');
  ok($('#history > ul > li:nth-child(2) > span:nth-child(2)').hasClass('operator'), 'should be operator class in 2nd span 1st row');
  ok($('#history > ul > li:nth-child(2) > span:nth-child(3)').hasClass('op2'), 'should be op2 class in 3rd span 1st row');
  ok($('#history > ul > li:nth-child(2) > span:nth-child(5)').hasClass('result'), 'should be result class in 5th span 1st row');
});

test('Remove Button feature', function() {
  expect(4);

  //create three (3) rows.
  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('9');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  //clicking remove button which should remove the second row (i.e. 9*2=18).
  $('#history > ul > li:nth-child(2) > .remove').trigger('click');

  deepEqual($('#history > ul > li').length, '2', 'only 2 rows should remain after clicking remove');
  deepEqual($('#history > ul > li:nth-child(2) > span:nth-child(1)').text(), '3', 'first span in second row should now be 3');
  deepEqual($('#history > ul > li:nth-child(1)').css('background-color'), 'rgba(0, 0, 0, 0)', 'first row should be white background-color');
  deepEqual($('#history > ul > li:nth-child(2)').css('background-color'), 'blue', 'second row should be blue background-color');
});