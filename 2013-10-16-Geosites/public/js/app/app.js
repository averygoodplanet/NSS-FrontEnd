'use strict';

// Firebase Schema
var Δdb, Δpositions;

// Local Schema (db = {} is defined in keys.js)
db.positions = [];
db.path = [];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  initMap(36, -86, 5);
  initializePolyline();
  Δpositions.on('child_added', dbPositionAdded);
  $('#start').click(clickStart);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
//            Click Handlers    //
function clickStart() {
  /* getCurrentPosition() makes an asynchronous call, so it's necessary to chain
  program flow through the success callback from getCurrentPosition() rather
  than have additional steps in this function. */
  getCurrentPosition();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
//            Geolocation (thru device)  //

function getCurrentPosition() {
  var geoOptions = {
    enableHighAccuracy: true,
    maximumAge        : 5000,
    timeout           : 30000
  };

  navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
  //calls geoSucess(), an asynchronous function.
}

function geoSuccess(location) {
  console.log('in geoSuccess() function');
  var position = {};
  position.latitude = location.coords.latitude;
  position.longitude = location.coords.longitude;
  Δpositions.push(position);
}

function geoError() {
  alert('Sorry, no position available.');
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
//   Δdb initiated functions  //
function dbPositionAdded(snapshot) {
  var position = snapshot.val();

  //db.positions isn't updated till dbPositionAdded, to keep user's screen
  //from getting ahead of shared database (if in future, multiple shared users).
  db.positions.push(position);

  // positions.length will always be >= 1 in this function
  // if this is the first point, it needs to be tagged to become a start marker.
  if(db.positions.length === 1){
    position.marker = 'start';
  }

  // if a position has a marker property, make marker (... then htmlMakeLine from that function)
  if(position.marker) {
    htmlMakeMarker(position);
  } else {
    htmlAddLine(position);
  }
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
//        Display   //
function htmlMakeMarker(position) {
  var LatLng = new google.maps.LatLng(position.latitude, position.longitude);

  if(position.marker === 'start'){
    var image = '../../img/start.jpg';
  } else if(position.marker === 'site'){
    var image = '../../img/site.jpg';
  } else {
    var image = '../../img/end.jpg';
  }

  var marker = new google.maps.Marker({
    position: LatLng,
    map: db.map,
    icon: image
  });

  htmlAddLine(position);
}

function htmlAddLine(position) {
  console.log('htmlAddLine');
  var LatLng = new google.maps.LatLng(position.latitude, position.longitude);
  db.path.push(LatLng);
  htmlCenterAndZoom(position);
}

function htmlCenterAndZoom(position) {
  console.log('htmlCenterAndZoom');
}

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function initializePolyline() {
  var polyline = new google.maps.Polyline({
    map: db.map,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  db.path = polyline.getPath();
}
