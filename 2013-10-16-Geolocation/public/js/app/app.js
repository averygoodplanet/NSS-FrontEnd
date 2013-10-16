'use strict';

// Firebase Schema
var Δdb, Δpositions;

// Local Schema (db defined in keys.js)
db.positions = [];
db.path=[];

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δpositions.on('child_added', dbPositionAdded);
  initMap(36, -86, 5);
  $('#start').click(clickStart);
  $('#erase').click(clickErase);
  Δpositions.remove();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function dbPositionAdded(snapshot) {
  var position = snapshot.val();


  var latLng = new google.maps.LatLng(position.latitude, position.longitude);

  db.positions.push(position);
  db.path.push(latLng);

  if(db.positions.length === 1) {
    htmlAddStartIcon(latLng);
    htmlInitializePolyline();
  }

  db.path.push(latLng);
  $('#debug').text(position.time);
  htmlCenterAndZoom(latLng);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function htmlAddStartIcon(latLng){
  var myImage = '/img/monkey.jpg';
  var marker = new google.maps.Marker({map: db.map, position: latLng, icon: myImage});
}

function htmlCenterAndZoom(latLng){
  db.map.setZoom(19);
  db.map.setCenter(latLng);
}

function htmlInitializePolyline() {
  var polyLine = new google.maps.Polyline({
    map: db.map,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  //this is an MVC array (automatically updates to display);
  db.path = polyLine.getPath();
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function clickStart(){
  //determine our location

  //before I start, remove all old positions.

  var geoOptions = { enableHighAccuracy: true, maximumAge: 1000, timeout: 60000};

  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

function clickErase() {
  Δpositions.remove();
  db.positions = [];
  db.path=[];
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.SATELLITE};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function geoSuccess(location) {
  // alert('position returned');
  var position = {};
  position.latitude = location.coords.latitude;
  position.longitude = location.coords.longitude;
  position.altitude = location.coords.altitude || 0;
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a');
  Δpositions.push(position);
}

function geoError() {
  // alert('Sorry, position request failed.');
  // console.log('Sorry, no position available.');
}



// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  //trim removes leading or following spaces
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
