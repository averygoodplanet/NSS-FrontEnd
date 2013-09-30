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

test("square", function (){
  deepEqual( square(3), 9, "squaring 3");
  deepEqual( square(5), 25, "squaring 5");
});

test("area", function (){
  deepEqual( area(3, 5), 15, "area of 3 and 5");
  deepEqual( area(7, 5), 35, "area of 7 and 5");
});

test("volume", function() {
  deepEqual( volume(3, 5, 2), 30, "volume of 3, 5, 2");
  deepEqual( volume(7, 5, 2), 70, "volumen of 7, 5, 2");
});

test("power", function() {
  deepEqual(power(2, 0), 1, "2 to 0th power");
  deepEqual(power(2, 1), 2, "2 to 1th power");
  deepEqual(power(2, 2), 4, "2 to 2nd power");
  deepEqual(power(2, 3), 8, "2 to 3rd power");
  deepEqual(power(2, -1), 0.5, "2 to -1 power");
  deepEqual(power(2, -2), 0.25, "2 to -2 power");
  deepEqual(power(9, -3), 0.0013717421124828531, "9 to -3 power");
});

test("greeting", function() {
  deepEqual(greeting("hello", "janet"), "hello, janet!", "greeting janet");
});