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
  expect(3);

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
});
