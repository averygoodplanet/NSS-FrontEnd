$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('form#priority').on('submit', submitPriority);
  $('form#todo').on('submit', submitTodo);
}

function submitAjaxForm(e, form, successFn){
  // (this) is the form that was submitted
  var url = $(form).attr('action');
  var data = $(form).serialize();
  var options = {};
  //the properties have to be called url, type, and data
  options.url = url;
  options.type = 'POST';
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  //sending of data to Node
  $.ajax(options);
  //e is the event
  e.preventDefault();
}

function submitTodo(e){
  submitAjaxForm(e, this, function(data, status, jqXHR){
    console.log(data);
  });
}


function submitPriority(e) {
  //passing event and successFn to submitAjaxForm();
  // this is the form right now, has to be passed in
  submitAjaxForm(e, this, function(data, status, jqXHR){
    htmlAddPriorityToSelect(data);
  });
}

function htmlAddPriorityToSelect(data){
  var option = '<option></option>';
  var $option = $(option);
  $option.attr('value', data._id);
  $option.text(data.name);
  $option.css('background-color', data.color);
  $('select#priority-select').append($option);
  $('form#priority input').val('');
  $('form#priority input[name="name"]').focus();
}