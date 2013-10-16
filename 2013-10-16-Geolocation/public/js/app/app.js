'use strict';

// Firebase Schema
var Δdb, Δpositions;

// Local Schema (defined in keys.js)

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δpositions.on('child_added', dbPositionAdded);
  initMap(36, -86, 5);
  $('#start').click(clickStart);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function dbPositionAdded(snapshot) {
  console.log('snapshot in dbPositionAdded: ');
  console.log(snapshot.val());
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function clickStart(){
  //determine our location
  var geoOptions = { enableHighAccuracy: true, maximumAge: 1000, timeout: 60000};

  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function geoSuccess(location) {
  var position = {};
  position.latitude = location.coords.latitude;
  position.longitude = location.coords.longitude;
  position.altitude = location.coords.altitude || 0;
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a');
  Δpositions.push(position);
}

function geoError() {
  console.log('Sorry, no position available.');
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
