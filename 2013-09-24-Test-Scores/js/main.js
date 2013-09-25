// Goals:
// 1. Prompt user for 10 test scores.
// 2. Calculate average and standard deviation.
// 3. Display the average and standard deviations.

debugger;
var test_scores = [];
var test_scores_sum = 0;
var average = null;
var squared_differences_sum = 0;
var standard_deviation = null;

//Ask for each of ten test scores, and sum the scores:
for(var i = 0; i < 10; i++)
{
  test_scores[i] = parseFloat(prompt("Enter test score number "+(i+1)+" now:"));
  test_scores_sum += test_scores[i];
}

//Get the average test score:
average = test_scores_sum / test_scores.length;

console.log("average: "+average);

// Compute the standard deviation (normal distribution is assumed)

for(var i = 0; i < test_scores.length; i++)
{
  squared_differences_sum += Math.pow((test_scores[i] - average), 2);
}

// console.log("test_scores: "+test_scores);
// console.log("squared_differences: "+squared_differences);

//take the square root of the average of squared_differences, and the result will be the standard deviation.

standard_deviation = Math.sqrt((squared_differences_sum / test_scores.length));

console.log("Standard deviation: "+standard_deviation);