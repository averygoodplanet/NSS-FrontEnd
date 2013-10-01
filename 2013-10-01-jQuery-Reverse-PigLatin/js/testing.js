test("to_pig_latin", function() {
  deepEqual(to_pig_latin("hello"), "elloha", "hello to pig latin");
});

test("comma_string_to_pl", function() {
  deepEqual(comma_string_to_pl("hello, nashville, code"), "elloha, ashvillena, odeca", "changing converting comma string to array pig latin");
});

test("reverse_word_order", function() {
  deepEqual(reverse_word_order("elloha, ashvillena, odeca"), "odeca, ashvillena, elloha", "reverse_word_order");
});

test("make_semicolon_string", function() {
  deepEqual(make_semicolon_string("bill, harry, todd"), "bill; harry; todd", "make comma separated string to semicolon string");
});