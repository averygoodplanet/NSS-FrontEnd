$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#game').on('submit', submitGame);
  $('.cup').on('click', clickCup);
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
    htmlStartGame(data);
  });
}

function clickCup() {
  var guess = $(this).data('position');
  var gameId = $('#cups').data('game');
  var url = '/games/' + gameId;
  sendGenericAjaxRequest(url, {guess: guess}, 'post', 'put', null, function(data, status, jqXHR){
    console.log(data);
  });
}

//-----------------------------------------------------------------//
//-----------------------------------------------------------------//
function htmlStartGame(game){
  $('#player').text(game.player);
  $('#cups').attr('data-game', game._id);
  $('#cups').show();
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