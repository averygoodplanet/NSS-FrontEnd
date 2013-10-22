'use strict';

'use strict';

module('Module Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  //code that you need to run before a test.
  initialize(null, true);
}

function teardownTest(){
  //code that you need to run after a test finishes.
}


test('remove positive', function() {
  expect(2);

  //create three (3) rows.
  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calculate').trigger('click');

  $('#op1').val('7');
  $('#op2').val('-8');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#op1').val('9');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calculate').trigger('click');

  $('#removePos').trigger('click');

  deepEqual($('#history > ul > li').length, 1, 'only one row should remain');
  deepEqual($('#history > ul > li:first-child > span:first-child').text(), '7', 'remaining row"s first span should be 7');
});