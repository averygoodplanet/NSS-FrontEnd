var fs = require('fs');

// input people.json
// output[p1, p2, p3] as array of people objects
// example:
// var people = database.read('people.json');
exports.read = function(filename){
  //data is a string
  var data = fs.readFileSync(filename);
  data = JSON.parse(data);
  return data;
};

// input people.json, data
// output - nothing
// database.write('people.json', [p1, p2, p3])
exports.write = function(filename, data){
  data = JSON.stringify(data);
  fs.writeFileSync(filename, data);
};
