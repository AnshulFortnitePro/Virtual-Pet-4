//Create variables here
var dog,saddog,happydog;
var foodObj;
var foodS, foodStock;
var fedTime,lastFed,feed,addFood;
var gameState;

function preload()
{
	//load images here
  saddog = loadImage("dog1.png");
  happydog = loadImage("dog2.png");
  garden=loadImage("Garden.png");
washroom=loadImage("WashRoom.png");
bedroom=loadImage("BedRoom.png");
livingroom = loadImage("Living Room.png");

}

function setup() {
	createCanvas (displayWidth - 400, 500);
  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(800,250,150,150);
  dog.addImage(saddog);
  dog.scale = 0.3;

  food = createButton("Feed the dog");
  food.position(745,70);
  food.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(845,70);
  addFood.mousePressed(addFoods);
}


function draw() {  
 

  
  background("cyan");

  foodObj.display();
  

  if(foodS == 0){

    dog.addImage(happydog);
    this.image.visible = false;
  }
  else{
    dog.addImage(saddog);
    this.image.visible = true;
  }

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  noStroke();
  fill("red");
  textSize(25);
  if(lastFed >=12){
    text ("Last Feed: "+lastFed%12+"PM",80,450);
   }
   else{
     text("Last Feed : "+lastFed+"AM",80,450);
   }

   if(gameState === 1){

    dog.addImage(happyDog);
    dog.scale = 1.0;
    dog.y = 250;
   }

   if(gameState === 2){
     dog.addImage(sadDog);
     dog.scale = 1.0;
     this.image.visible = false;
     dog.y =250;
   }

   var Bath = createButton("Bath Time");
   Bath.position(580,70);
   if(Bath.mousePressed(function(){
     gameState =3;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===3){
     dog.addImage(washroom);
     dog.scale = 0.7;
     this.image.visible = false;

   }
   var Sleep = createButton("Lets Sleep");
   Sleep.position(660,70);
   if(Sleep.mousePressed(function(){
     gameState =4;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===4){
     dog.addImage(bedroom);
     dog.scale = 0.7;
     this.image.visible = false;

   }
   var Play = createButton("Play Time");
   Play.position(500,70);
   if(Play.mousePressed(function(){
     gameState =5;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===5){
     dog.addImage(livingroom);
     dog.scale = 0.7;
     this.image.visible = false;

   }
 
   var PlayInGarden = createButton("Outdoor Time");
   PlayInGarden.position(400,70);
   if(PlayInGarden.mousePressed(function(){
     gameState =6;
     database.ref('/').update({'gameState':gameState});
   }));
   if(gameState===6){
     dog.addImage(garden);
     dog.scale =0.7;
     this.image.visible = false;

   }
 
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){
  database.ref('/').update({
    food : x
  })
}

function feedDog() {
  dog.addImage(happydog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime : hour()
  })

}


function addFoods(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState: gameState
  })
}
