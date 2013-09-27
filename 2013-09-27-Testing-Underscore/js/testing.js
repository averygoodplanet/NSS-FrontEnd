test( "Filter Even Numbers", function () {
  var numbers = _.range(10);
  var expected = _.range(0, 10, 2);  // 0, 2, 4, 6, 8;
  deepEqual(filter_evens(numbers), expected, "Message goes here i.e. testing the filter_evens function");
});

test( "Filter Odd Numbers", function () {
  var numbers = _.range(10);
  var expected = [1, 3, 5, 7, 9];
  deepEqual(filter_odds(numbers), expected, "Testing the filter_odds function");
});

test( "Filter Short Strings", function () {
  var strings = ["hello", "there", "a", "the", "cat", "elephant", "encyclopedia"];
  var expected = ["a", "the", "cat"];
  deepEqual(filter_short_strings(strings), expected, "Testing short strings under 4 characters");
});