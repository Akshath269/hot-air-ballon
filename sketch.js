
var balloon
var pos;
var db;

function preload() {
  background1=loadImage("images/Hot Air Ballon-01.png")
   hotballoon=loadImage("images/Hot Air Ballon-02.png")
}



function setup() {
  createCanvas(500,500);
  balloon=createSprite(400, 200);
  balloon.addImage( hotballoon)
  balloon.scale=0.5
  
  db = firebase.database();


  // .ref() .on() .val() .set()

  //.ref()- where should i go
  
  var balloonpositionRef = db.ref('balloon/position');

  //var ballpositionRef = db.ref('ballon/height'); for project

  //.on() - listner who looks at the ref for some change
  balloonpositionRef.on("value", readPosition )



}

function draw() {
  background(background1);  
  
  if(keyDown(LEFT_ARROW)){
    changePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(1,0);
}
else if(keyDown(UP_ARROW)){
    changePosition(0,-1);
}
else if(keyDown(DOWN_ARROW)){
    changePosition(0,+1);
}
else if(keyDown(BACKSPACE)){
  balloon.scale= balloon.scale - 0.1;
}
else if(keyDown(ESCAPE)){
  balloon.scale= balloon.scale + 0.1;
}
  drawSprites();
}

function changePosition(x,y){
  var changeref=db.ref('balloon/position')
  changeref.set({
      'x': pos.x + x,
      'y': pos.y + y
  })
  
}

function readPosition(data){
  pos = data.val(); //.val - from database to your comp. MESSNGER
  console.log(pos);
  balloon.x = pos.x;
  balloon.y=pos.y;
}
