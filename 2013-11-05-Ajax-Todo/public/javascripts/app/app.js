$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('form#priority').on('submit', submitPriority);
}

function submitPriority(e) {
  // (this) is the form that was submitted
  var url = $(this).attr('action');
  var data = $(this).serialize();


  var options = {};
  //the properties have to be called url, type, and data
  options.url = url;
  options.type = 'POST';
  options.data = data;
  options.success = function(data, status, jqXHR){
    console.log('success');
  };
  options.error = function(jqXHR, status, error){
    console.log('error :(');
  };

  //sending of data to Node
  $.ajax(options);

  //e is the event
  e.preventDefault();
}