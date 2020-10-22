PLAY=1;
END=0;
var gameState = PLAY;
var monkey , monkey_running
var rock , rockImage , rockGroup
var banana , bananaImage , bananaGroup
var ground
var score = 0
var time

function preload(){
  
  
    
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
 
  rockImage = loadImage("obstacle.png")
 
}



  
function setup() {
  
  createCanvas(600,400);
  
  monkey = createSprite(60,365)
  monkey.addAnimation("theMonkey",monkey_running);
  monkey.scale=0.1;
  
monkey.debug = true;
  
  ground = createSprite(300,380,1200,1.2)
  
  bananaGroup = new Group();
  rockGroup = new Group();
  
}


function draw() {
  background("cyan");
  
  
  
  stroke("white");
  textSize(20);
  text("Score = "+score,350,50);
  
  stroke("black");
  textSize(20);
  time=Math.ceil(frameCount/frameRate());
  text("Survival Time = "+time,50,50)
  
  ground.velocityX=-3;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    monkey.y=monkey.y+1
  
  monkey.collide(ground);
  
  if(keyDown("space")&& monkey.y > 340&&
    gameState === PLAY) {
        monkey.velocityY = -20;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  
  
  var randomYPositionForBanana = Math.round(random(100,300));
  if(frameCount%80===0){
    banana = createSprite(650,randomYPositionForBanana)
    banana.addImage("bananas",bananaImage)
    banana.scale=0.1;
    banana.velocityX=-3
    bananaGroup.add(banana);
    banana.lifetime = 700;
  
}

if (bananaGroup.isTouching(monkey))  
{
    score = score + 1;
    banana.destroy();
}
  
  
  var randomXPositionForRock = Math.round(random(630,650));
    if(frameCount%300===0){
    rock = createSprite(randomXPositionForRock,365)
    rock.addImage("rocks",rockImage);
    rock.scale=0.1;
    rock.velocityX=-3
 rockGroup.add(rock);
      rock.lifetime = 700;
    }    

if (rockGroup.isTouching(monkey)&&
 gameState === PLAY) 
{
gameState = END;
World.allSprites.setVelocityEach(0,0);
}
  

  
  if (gameState === END){
    bananaGroup.destroyEach();
    rockGroup.destroyEach();
    monkey.destroy();
    ground.destroy();
    textSize(20);
    stroke("red");
    text("Game finished !",230,200);
     textSize(20);
    stroke("red");
    text("Your score is " + score,235,240);
    time = 0;
    textHider = createSprite(200,37,2000,80);
    textHider.shapeColor = "cyan";
    
  }
  

  
  drawSprites();
}






