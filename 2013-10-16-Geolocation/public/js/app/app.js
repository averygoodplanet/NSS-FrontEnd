'use strict';

// Firebase Schema
var Δdb, Δpositions;

// Local Schema (db defined in keys.js)

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δpositions.on('child_added', dbPositionAdded);
  initMap(36, -86, 5);
  $('#start').click(clickStart);
  $('#erase').click(clickErase);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function dbPositionAdded(snapshot) {
  var position = snapshot.val();

  //0 is falsy in javascript
  if(db.positions.length) {
    // start-point already exists
  } else {
    // just starting
    htmlAddStartIcon(position);
  }

  db.positions.push(position);
  htmlCenterAndZoom(position);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function htmlAddStartIcon(position){
  var latLng = new google.maps.LatLng(position.latitude, position.longitude);
  var myImage = '/img/monkey.jpg';
  var marker = new google.maps.Marker({map: db.map, position: latLng, icon: myImage});
}

function htmlCenterAndZoom(position){
  db.map.setZoom(19);
  var latLng = new google.maps.LatLng(position.latitude, position.longitude);
  db.map.setCenter(latLng);
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
