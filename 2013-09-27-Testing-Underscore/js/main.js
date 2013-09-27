function filter_evens(numbers)
{
  return _.filter(numbers, function(num){return (num % 2) == 0;});
  //in _.filter, the anonymous function returns a boolean expression (i.e. returens true or false)
  // items returning true are add to the list of filtered-items to be retained.
}

function filter_odds(numbers)
{
  return _.filter(numbers, function(num){return (num % 2) != 0;});
}

function filter_short_strings(strings)
{
  return _.filter(strings, function(string){return string.length < 4;});
}

function filter_a_strings(strings)
{
  return _.filter(strings, function(string){ return ((string[0] == 'a') ||  (string[0] =='A'));});
  //alternative solution: "return string[0].toLowerCase() == 'a' "
}

function find_string(strings, looking_for)
{
  return _.find(strings, function(string){return string == looking_for;});
}