'use strict';

// Firebase Schema
var Δdb;

// Local Schema
var db = {};
db.locations = [];
db.map = null;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://vacation-app.firebaseio.com');
  var Δlocations = Δdb.child('locations');
  Δlocations.on('child_added', dbLocationAdded);
  initMap(36, -86, 5);
}

function dbLocationAdded() {

}

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
