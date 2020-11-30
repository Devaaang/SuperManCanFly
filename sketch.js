var superHero ; 
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;


function preload(){
  superManImage = loadImage ("PinClipa.png");
  villianImage = loadImage ("ghost-standing.png");
  coinImage = loadImage ("PinClip.png");
  groundImage = loadImage ("grounddd.jpg");
  gameOverImage = loadImage ("gameover.jpg");
  restartImage = loadImage ("PinClipart.png");
}

function setup() {
  createCanvas = (1000,1000)
  ground = createSprite(180,180,1000,1000);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  superMan = createSprite(50,200,5,5);
  superMan.addImage(superManImage);
  superMan.scale = 0.2;
  
  gameOver = createSprite (200,190,1000,1000);
  gameOver.addImage (gameOverImage);
  gameOver.scale = 1.0
  
  restart = createSprite(200,330);
  restart.addImage(restartImage);
  restart.scale = 0.1;
  
  enemyGroup = new Group ();
  coinGroup = new Group ();
  
}

function draw() {
  
  if (gameState === PLAY) {
    Enemy ();
    coins ();
    superMan.visible = true;
    
    gameOver.visible = false;
    restart.visible = false;
    
    if (keyDown("down")) {
      superMan.y = superMan.y+3 ;
    }
    
    if (keyDown("up")) {
      superMan.y = superMan.y-3;
    }
      
    if (ground.x<0) {
    ground.x = ground.width/2;
   }
    
    if (coinGroup.isTouching(superMan)) {
      coinGroup.destroyEach ();
      score = score + 1;
    }
    
    
    if (enemyGroup.isTouching(superMan)) {
      gameState = END;
    }
  }
  
  if (gameState === END) {
   gameOver.visible = true;
   restart.visible = true;
    ground.x=0;
    enemyGroup.destroyEach();
    coinGroup.destroyEach();
    superMan.visible=false;
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
    
  }
  
  drawSprites ();
  
   text ("Score: " + score,300,30);
  
}

function coins() {
  if(World.frameCount%200===0) {
    coin = createSprite(400,200,20,20);
    coin.addImage(coinImage);
    coin.y=Math.round(random(100,300));
    coin.velocityX = -7;
    coin.setLifetime = 50;
    coin.scale = 0.1;
    
    coinGroup.add(coin);
  }
}

function Enemy() {
  if(World.frameCount%200===0) {
    enemy = createSprite(400,200,20,20);
    enemy.addImage(villianImage);
    enemy.y=Math.round(random(99,399));
    enemy.velocityX = -5;
    enemy.setLifetime = 50;
    enemy.scale = 0.3;
    
    
    enemyGroup.add(enemy);
  }
}

function reset(){
  gameState= PLAY;
  enemyGroup.destroyEach();
  coinGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
}

