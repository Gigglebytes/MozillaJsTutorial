//this file includes modified code for the challenge portion.
//pinky swear I didn't peak at the finished source code.
//// setup canvas
//var pTag = document.getElementById("count");
//pTag.appendChild(1);
var paragraph = document.getElementById('count');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var count = 0;

paragraph.innerHTML = "Ball Count: " + count;

function random(min,max) { //Random number generator
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//Shape Constructor
function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}
//Ball Constructor. Inherits properties from Shape
function Ball(x, y, velX, velY, exists, color, size) {
  Shape.call(this, x, y, velX, velY, exists);
  this.color = color;
  this.size = size;
}

function EvilCircle(x, y, exists, color, size, velX, velY){
  Shape.call(this, x, y, exists);
  this.color = color;
  this.size = size;
  this.velX = velX;
  this.velY = velY;
}

//instantiate prototypes for inheritance
Ball.prototype = EvilCircle.protoype = Object.create(Shape.prototype);//Inherit Shape
Ball.prototype.constructor = Ball;
//EvilCircle.protoype = Object.create(Shape.protoype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function(){
  ctx.beginPath();//begin drawing on <canvas>
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;//color of ball
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);//draw circle
  ctx.stroke();//end drawing
}

EvilCircle.prototype.checkbounds = function(){
  if ((this.x + this.size) >= width) {//right
    this.x = this.x - this.size;
  }

  if ((this.x - this.size) <= 0) {//left
    this.x = this.x + this.size;
  }

  if ((this.y + this.size) >= height) {//top
    this.y = this.y - this.size;
  }

  if ((this.y - this.size) <= 0) {//bottom
    this.y = this.y + this.size;
  }

}
//Bonus Points!
/* Set contols for WASD setup on keyboard
 We set var _this = this; because of the context in which 'this' refers to
 within the scope of the onkeydown function. If we were to reference 'this.x'
 within the scope of the window.onkeydown function we would be attempting to
 set x and y properties on that function and not on the setControls function
 which may produce undesired results.
  */
EvilCircle.prototype.setControls = function(){
  var _this = this;
  //here -- this.x would be the x val/pos of an instantiated EvilCircle Obj
window.onkeydown = function(e) {
  //here -- this.x would be undefined because there is no x property in window
    if (e.keyCode === 65) {
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) {
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {
      _this.y += _this.velY;
    }
  }
}
EvilCircle.prototype.collisionDetect = function(){
  for (var j = 0; j < balls.length; j++) {
    if (balls[j].exists) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        //balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        balls[j].exists = false;
        paragraph.innerHTML = "Ball Count: " + --count;
      }
    }
  }
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
var evilCircle1 = new EvilCircle(
  random(0,width),
  random(0,height),
  true,
  'white',
  10,
  20,
  20
);
evilCircle1.setControls();

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  while (balls.length < 25) {
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      true,
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20)
    );
    balls.push(ball);
    count++;
  }

  for (var i = 0; i < balls.length; i++) {
    if(balls[i].exists){
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }
  }

  evilCircle1.draw();
  evilCircle1.checkbounds();
  evilCircle1.collisionDetect();

  paragraph.innerHTML = "Ball Count: " + count;
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
