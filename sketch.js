var PLAY = 1;
var END = 0;
var PAUSE = 2;
var gameState = PLAY;

var ninja, ninja_running, ninjaLife1,ninjaLife2,ninjaLife3;
var invisibleGround;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var path,pathImg;
var backgroundImg

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var score=0;
var life =3;

var gameOver, restart;


function preload(){
  ninja_running =   loadAnimation("Ninja1.png","Ninja2.png","Ninja3.png","Ninja4.png","Ninja5.png","Ninja6.png");
  ninjaLife1 = loadAnimation("NinjaLife1.png");
  ninjaLife2 = loadAnimation("NinjaLife2.png");
  ninjaLife3 = loadAnimation("NinjaLife3.png");

  heart1Img = loadImage("heart_1.png")
  heart2Img = loadImage("heart_2.png")
  heart3Img = loadImage("heart_3.png")
  
  pathImg = loadImage("GroundImg.png");
  backgroundImg = loadImage("BgImg.jpg")
  
  cloudImage = loadImage("cloud2.png");
  
  obstacle1 = loadImage("Rock1.png");
  obstacle2 = loadImage("Rock2.png");
  obstacle3 = loadImage("Rock3.png");
  obstacle4 = loadImage("Rock4.png");
  obstacle5 = loadImage("Rock5.png");
  obstacle6 = loadImage("Rock6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(900,600);
  path=createSprite(900,500,900,20);
path.addImage(pathImg);
path.scale = 1.8
path.x = path.width/2
path.velocityX = -3;
  ninja = createSprite(50,325,20,50);
  ninja.scale = 1.5
 

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var cloud = createSprite(900,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.8;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 300;
    
    //adjust the depth
    cloud.depth = ninja.depth;
    ninja.depth = ninja.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(900,425);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    obstacle.scale = 10
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  ninja.changeAnimation("running");
  
 
  
  score = 0;
  life = 3;
}