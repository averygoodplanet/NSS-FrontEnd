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