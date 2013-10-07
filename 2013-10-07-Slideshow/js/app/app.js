'use strict';

var photos = [];
var currentIndex = 0;
var timer = 0;
var PER_PAGE = 5;
var page = 1;
var total_pages = 2;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
}

function searchFlickr() {
  var API_KEY = 'f4c1acbf5ca4055d41391a532ca1954d';
  var query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  // get JSON is asynchronous; results is the callback function; the data is passed to the callback function;
  $.getJSON(url, results);
}

function results(data) {
  photos = data.photos.photo;
  timer = setInterval(createImage, 1000);
}

function resetGlobals() {
  page++;
  timer = 0;
  photos = [];
  currentIndex = 0;
}

function createImage() {
  if(currentIndex < photos.length){
    var photo = photos[currentIndex];
    currentIndex++;
    var url = 'url(http://farm' + photo.farm + '.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
    var $div = $('<div>');
    $div.addClass('photo');
    $div.css('background-image', url);
    $div.css('background-size', 'cover');
    $('#photos').prepend($div);
  } else {
    window.clearInterval(timer);
    if(page < total_pages){
      resetGlobals();
      searchFlickr();
    }
  }
}