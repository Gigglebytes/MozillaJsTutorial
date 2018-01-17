//code provided from --- https://github.com/mdn/learning-area/blob/master/javascript/oojs/bouncing-balls/main.js
// setup canvas (provided *.js file)
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

/****The following is code added via tutorial progress****/

//Constructor for Balls to be added on the screen
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}
//add a draw() method to the Ball()'s prototype
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

//test code for for javascript console
/*
//instantiate a new Ball object
var testBall = new Ball(50,100,4,4,'blue',10);

//test Ball object by calling its members
testBall.x
testBall.size
testBall.color
testBall.draw
*/
