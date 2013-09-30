// test( "<name of function>", function() {
//   deepEqual(<actual_value>, <expected_value>, "what this test is doing");
//   deepEqual(<actual_value>, <expected_value>, "testing this function with different arguments");
// });



test( "1 + 1", function() {
  deepEqual( 1 + 1, 2, "adding 1 and 1");
});

test( "nashville[0]", function() {
  deepEqual( "nashville"[0], "n" , "getting first letter from string");
});

test( "add_three", function() {
  deepEqual( add_three(5), 8, "adding three to five");
  deepEqual( add_three(7), 10, "adding three to five");
});