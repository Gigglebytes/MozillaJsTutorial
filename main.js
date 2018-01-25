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
//add a draw() method to the Ball()'s prototype i.e. all future balls
Ball.prototype.draw = function() {
  ctx.beginPath();//begin drawing on <canvas>
  ctx.fillStyle = this.color;//color of ball
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);//draw circle
  ctx.fill();//end drawing
}

//update method for ball movement
Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {//right
    this.velX = -(this.velX);//reverse x direction
  }

  if ((this.x - this.size) <= 0) {//left
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {//top
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {//bottom
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
}

var balls = [];

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < 25) {
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20)
    );
    balls.push(ball);
  }

  for (var i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}
//begin animation
loop();

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
