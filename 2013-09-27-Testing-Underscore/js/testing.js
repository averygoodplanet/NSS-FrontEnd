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

test( "Filter 'A'-beginning Strings", function () {
  var strings = ["apple", "hello", "there", "a", "the", "cat", "Aardvark", "elephant", "encyclopedia"];
  var expected = ["apple", "a", "Aardvark"];
  deepEqual(filter_a_strings(strings), expected, "strings should begin with letter 'a'");
});

test( "Find String", function () {
  var strings = ["apple", "hello", "there", "a", "the", "cat", "Aardvark", "elephant", "encyclopedia"];
  //example of multiple assertions in one test.
  deepEqual(find_string(strings, "elephant"), "elephant", "Should find and return 'elephant' ");
  deepEqual(find_string(strings, "cat"), "cat", "Should find and return 'cat' ");
  deepEqual(find_string(strings, "Aardvark"), "Aardvark", "Should find and return 'the' ");
  //a "negative test" below
  deepEqual(find_string(strings, "not here"), undefined, "Should find and return 'the' ");
});

test( "Find Strings Ending in a particular letter", function () {
  var strings = ["dog", "cats", "lion", "tigers"];
  //example of multiple assertions in one test.
  deepEqual(find_string_ending_letter(strings, "s"), "cats", "Should find and return ending in s ");
  deepEqual(find_string_ending_letter(strings, "z"), undefined, "Should not find string ending in z ");
});

