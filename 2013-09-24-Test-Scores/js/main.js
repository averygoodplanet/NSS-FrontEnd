// Goals:
// 1. Prompt user for 10 test scores.
// 2. Calculate average and standard deviation.
// 3. Display the average and standard deviations.

debugger;
var test_scores = [];
var test_scores_sum = null;
var average = null;
var squared_differences = [];
var squared_differences_sum = null;
var standard_deviation = null;

//Ask for each of ten test scores.
for(var i = 0; i < 10; i++)
{
  test_scores[i] = parseFloat(prompt("Enter test score number "+(i+1)+" now:"));
}

// console.log("test_scores: "+test_scores);

//Get an average by 1) adding all items together in test_scores array, and 2) dividing that sum by array.length

for(var i = 0; i < test_scores.length; i++)
{
  test_scores_sum += test_scores[i];
}

// console.log("test_scores_sum: "+test_scores_sum);

average = test_scores_sum / test_scores.length;

console.log("average: "+average);

// Compute the standard deviation (normal distribution is assumed)

for(var i = 0; i < test_scores.length; i++)
{
  var difference = test_scores[i] - average;
  squared_differences.push(Math.pow(difference, 2));
}

// console.log("test_scores: "+test_scores);
// console.log("squared_differences: "+squared_differences);

//take the square root of the average of squared_differences, and the result will be the standard deviation.

for(var i = 0; i < squared_differences.length; i++)
{
  squared_differences_sum += squared_differences[i];
}

standard_deviation = Math.sqrt((squared_differences_sum / squared_differences.length));

console.log("Standard deviation: "+standard_deviation);