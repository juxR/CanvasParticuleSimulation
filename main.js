document.addEventListener("DOMContentLoaded", function(event) {

/**
*
* Global variables
*
**/
function init(){
    var canvas  = document.getElementById('canvas');
    var context  = canvas.getContext('2d');
    var canvasCenterX = canvas.width / 2;
    var canvasCenterY = canvas.height / 2;
    var mousePosition = {
        x:rand(0, canvas.width),
        y:rand(0, canvas.height),
    };


/**
*
* Circles
*
**/
var aCircles = pushCircles(20);
drawCircles(aCircles);

window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 30);
  };
})();

circlesFollowMouse(aCircles)
function pushCircles(numberOfCirclesToDraw){
    var aCircles = [];
    for(var i = 1; i<=numberOfCirclesToDraw; i++){
        aCircles.push(
        {
            speed:null,
            baseSpeed:rand(1000,5000) / 1000,
            acceleration: Math.round(rand(4,10)) / 100,
            radians : 0,
            backgroundColor:generateColor(),
            borderColor:generateColor(),
            maxSpeed: Math.round(rand(5,15)),
            positionX:Math.round(rand(0,canvas.width)),
            positionY:Math.round(rand(0,canvas.height)),
            radius:rand(10,15),

        }
        );

    }
    return aCircles;
}
function animate(shapes, canvas, context, startTime) {



        for (var i = 0; i < shapes.length; i++) {
            manageSpeed(shapes, i);

            manageRotation(shapes, i);
        };


        context.clearRect(0, 0, canvas.width, canvas.height);

        drawCircles(shapes);


        requestAnimFrame(function() {
          animate(shapes, canvas, context, startTime);
      });
    }
    function manageRotation(shapes, i){
      var dx = mousePosition.x - canvasCenterX;
      var dy = mousePosition.y - canvasCenterY;
      shapes[i].radians = Math.atan2(dy,dx)
  }
  function manageSpeed(shapes, i){
    var onX = false;
    var onY = false;

         // console.log(shapes[i].speed);

         if(typeof shapes[i].speed =="undefined"){
            shapes[i].speed = shapes[i].baseSpeed;
        }

        shapes[i].speed = getSpeedByAcceleration(shapes[i].speed,shapes[i].acceleration,shapes[i].maxSpeed);


         // var speed = shapes[i].speed;

         if(shapes[i].positionX < (mousePosition.x - shapes[i].radius)){
            if(shapes[i].positionX +    shapes[i].speed < (mousePosition.x - shapes[i].radius)){
                shapes[i].positionX +=    shapes[i].speed;
            }

        }else if( shapes[i].positionX > (mousePosition.x +  shapes[i].radius)){
            if(shapes[i].positionX -    shapes[i].speed > (mousePosition.x + shapes[i].radius)){
                shapes[i].positionX -=    shapes[i].speed;
            }

        }else{

           onX = true;

       }


       if(shapes[i].positionY < (mousePosition.y - shapes[i].radius)){
        if(shapes[i].positionY +    shapes[i].speed < (mousePosition.y - shapes[i].radius)){
            shapes[i].positionY +=    shapes[i].speed;
        }

    }else if( shapes[i].positionY > (mousePosition.y +  shapes[i].radius)){
        if(shapes[i].positionY -    shapes[i].speed > (mousePosition.y + shapes[i].radius)){
            shapes[i].positionY -=    shapes[i].speed;
        }

    }else{
        onY = true;

    }

    if(onX && onY){
        shapes[i].speed = shapes[i].baseSpeed;
    }
}
function drawCircles (aCircles){
    for (var i = 0; i<aCircles.length; i++) {
        context.beginPath();
        context.arc(aCircles[i].positionX, aCircles[i].positionY, aCircles[i].radius, 0, 2 * Math.PI, false);
        context.fillStyle = aCircles[i].backgroundColor;
        context.fill();
        context.lineWidth = 5;
        context.strokeStyle = aCircles[i].borderColor;
        context.stroke();
    };
}

canvas.addEventListener('mousemove',function(e){
    mousePosition = getMousePos(canvas, e);
    // circlesFollowMouse(aCircles, mousePos);
},false);
function generateColor(){
    return '#' + (function co(lor){   return (lor +=
      [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
    && (lor.length == 6) ?  lor : co(lor); })('');
}
function circlesFollowMouse(aCircles){
    // for (var i = 0; i < aCircles.length; i++) {
    //     aCircles[i].positionX = mousePos.x;
    //     aCircles[i].positionY = mousePos.y;

    // };

    animate(aCircles, canvas, context, getStartTime());
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: Math.round(evt.clientX - rect.left),
      y: Math.round(evt.clientY - rect.top)
  };
}
function getSpeedByAcceleration(speed, acceleration, maxSpeed){


 var newSpeed = speed + (acceleration / 10);
 if(newSpeed >= maxSpeed){
    newSpeed = maxSpeed;
    // console.log('Max speed reach');
}
return newSpeed;
}
function rand(firstNumber, secondNumber){
    return Math.floor((Math.random() * secondNumber) + firstNumber);
}


function  getStartTime(){
    return (new Date()).getTime();
}
}

init();
});