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
    htmlAddPriorityToSelect(data);
    console.log(data);
  };
  options.error = function(jqXHR, status, error){
    console.log('error :(');
  };

  //sending of data to Node
  $.ajax(options);

  //e is the event
  e.preventDefault();
}

function htmlAddPriorityToSelect(data){
  var option = '<option></option>';
  var $option = $(option);
  $option.attr('value', data._id);
  $option.text(data.name);
  $option.css('background-color', data.color);
  $('#priority-select').append($option);
}