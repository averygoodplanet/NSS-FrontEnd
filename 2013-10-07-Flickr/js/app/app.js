'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
  $('#photos').on('dblclick', '.photo', remove);
  // $('#photos').on('click', '.photo, .photo_enlarge', enlarge);
  $('#photos').on('click', '.photo', selectPhoto);
  $('#save').click(savePhotos);
  $('#clearPhotos').click(clearPhotos);
  $('#deleteSelected').click(deleteSelected);
}

function selectPhoto() {
  var $selectedPhoto = $(this);
  $selectedPhoto.toggleClass('selectedPhoto');
}

function enlarge() {
  var $photo = $(this);
  $photo.toggleClass('photo_enlarge');
}

function remove() {
  var $item = $(this);
  $item.remove();
}

function searchFlickr() {
  var API_KEY = 'f4c1acbf5ca4055d41391a532ca1954d';
  var PER_PAGE = 500;
  var page = 1;

  var query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  // get JSON is asynchronous; results is the callback function; the data is passed to the callback function;
  $.getJSON(url, results);
}


function results(data) {
  for(var i = 0; i < data.photos.photo.length; i++){
    createImage(data.photos.photo[i]);
  }
}

function clearPhotos() {
  $('#photos').empty();
}

function deleteSelected() {
  $('.selectedPhoto').remove();
}

function savePhotos() {
  var $selectedPhotos = $('.selectedPhoto');
  $selectedPhotos.removeClass('selectedPhoto');
  $('#savedPhotos').prepend($selectedPhotos);
}

function createImage(photo) {
  var url = 'url(http://farm' + photo.farm + '.static.flickr.com/'+ photo.server +'/'+ photo.id +'_'+ photo.secret +'_m.jpg)';
  var $div = $('<div>');
  $div.addClass('photo');
  $div.css('background-image', url);
  $div.css('background-size', 'cover');
  $('#photos').prepend($div);
}