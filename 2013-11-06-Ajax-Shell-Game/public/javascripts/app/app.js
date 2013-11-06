$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#game').on('submit', submitGame);
}


//-----------------------------------------------------------------//
//-----------------------------------------------------------------//
function submitGame(e) {
  //this is the form submitted
  var url = $(this).attr('action') + '?player=' + $('input[name="player"]').val();
  console.log(url);
  // /games/start?player=bob
  sendGenericAjaxRequest(url, {}, 'post', null, e, function(data, status, jqXHR){
    //executed after response is received from server.
    console.log(data);
  });
}




//-----------------------------------------------------------------//
//-----------------------------------------------------------------//

function sendGenericAjaxRequest(url, data, verb, altVerb, event, successFn){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb;
  $.ajax(options);
  if(event) event.preventDefault();
}

//-----------------------------------------------------------------//
//-----------------------------------------------------------------//