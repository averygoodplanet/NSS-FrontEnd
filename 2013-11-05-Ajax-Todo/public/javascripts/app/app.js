$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  $('form#priority').on('submit', submitPriority);
  $('form#todo').on('submit', submitTodo);
  $('.delete').on('click', clickDelete);
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
    htmlAddToDo(data);
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

function htmlAddToDo(data){
  console.log(data);
  var row = '<tr></tr>';
  var $row = $(row);
  $row.attr('data-id', data._id);
  $row.css('background-color', data.priority.color);
  var tdTitle = '<td>' + data.title + '</td>';
  var tdDueDate = '<td>' + moment(data.dueDate).format('ddd, MMMM Do YYYY') + '</td>';
  var tdPriorityName = '<td>' + data.priority.name + '</td>';
  var tdDelete = "<td><input type='button' class='button radius small' value='Delete'></td>";
  $row.append(tdTitle, tdDueDate, tdPriorityName, tdDelete);
  $('#todos tbody').append($row);
}

function clickDelete(){
  //remove row from html page
  var clickedButton = $(this);
  var $thisRow = clickedButton.parent().parent();
  $thisRow.remove();
  // var idString = clickedButton.parent().parent().data('id');
  // debugger;
}