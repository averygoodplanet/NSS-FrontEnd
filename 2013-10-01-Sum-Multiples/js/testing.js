// test("userinput_to_a_b", function(){
//   deepEqual(userinput_to_a_b("5,3"), [5, 3], " '5,3' in input field to [5, 3] ");
// });

test("a_to_range",  function () {
  deepEqual(a_to_range(5), [1,2,3,4,5], "converting 5 to [1,2,3,4,5]");
});

test("make_multiples_array", function() {
  deepEqual(make_multiples_array(), [3,6,9,12,15], "converting 5,3 to [3,6,9,12,15]");
});