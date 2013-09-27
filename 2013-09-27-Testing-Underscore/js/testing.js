test( "Filter Even Numbers", function () {
  var numbers = _.range(10);
  var expected = _.range(0, 10, 2);  // 0, 2, 4, 6, 8;
  deepEqual(filter_evens(numbers), expected, "Message goes here i.e. testing the filter_evens function");
});
