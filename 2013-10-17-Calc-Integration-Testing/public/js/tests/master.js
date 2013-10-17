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
  expect(8);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  deepEqual($('#history > ul > li').length, 2, 'should be two <li>');
  deepEqual($('#history > uL > li:first-child > span').length, 5, 'should be four spans in first li');
  deepEqual($('#history > ul > li:nth-child(2) > span').length, 5, 'should be four spans in second li');
  deepEqual($('#history > ul > li:first-child > span:first-child').text(), '7', 'should be 7 in first span top');
  deepEqual($('#history > ul > li:first-child > span:nth-child(2)').text(), '*', 'should be * in 2nd span top');
  deepEqual($('#history > ul > li:first-child > span:nth-child(3)').text(), '8', 'should be 8 in 3rd span top');
  deepEqual($('#history > ul > li:first-child > span:nth-child(4)').text(), '=', 'should be = in 4th span top');
  deepEqual($('#history > ul > li:first-child > span:nth-child(5)').text(), '56', 'should be 56 in 5th span top');


});
