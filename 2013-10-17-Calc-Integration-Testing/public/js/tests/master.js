'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  //code that you need to run before a test.
}

function teardownTest(){
  //code that you need to run after a test finishes.
}

//where an event is involved, use asyncTest
asyncTest('Calculate 2 numbers', function(){
  //number of assertions
  //NOTE: Disable your Chrome plugins before running the test, or will get Source: 0 error.
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');

  //NOTE: a div is used because an input box doesn't create a DOMChanged event (it has a different event).
  $('#result').on('DOMChanged', function() {
    deepEqual($('#op1').val(), '', 'op1 should be blank');
    deepEqual($('#op2').val(), '', 'op2 should be blank');
    deepEqual($('#operator').val(), '', 'operator should be blank');
    deepEqual($('#result').text(), '6', 'result should be 6');
    start(); //end of test signified by start();
  });

  //execute clicks last
  $('#calculate').trigger('click');
});

asyncTest('Paper Trail', function() {
  expect(1);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');
  //first loads before setting up listener

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');

  //starts listening here after initial DOMChanged event.
  $('#history').on('DOMChanged', function() {
    deepEqual($('#history > li').length, 2, 'should be two <li>');
    deepEqual($('#history > li:first-child > span').length, 4, 'should be four spans in first li');
    deepEqual($('#history > li:nth-child(2) > span').length, 4, 'should be four spans in second li');
    //other tests
    start();
  });

  $('#calculate').trigger('click');
});
