// setup canvas
//code provided from --- https://github.com/mdn/learning-area/blob/master/javascript/oojs/bouncing-balls/main.js
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}
