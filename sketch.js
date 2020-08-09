//Create variables here

var dog,dogImg,happyDog,happyDogImg;
var database;
var foodS,foodStock;
var count = 0;

function preload()
{

  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,20,20);
  dog.addImage("dog",dogImg);
  dog.addImage("happyDog",happyDogImg);
  dog.scale = 0.25;   

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  

}



function draw() {  

  background(46,139,87);


  if(keyWentDown(UP_ARROW)){
     writeStock(foodS)
     dog.changeImage("happyDog",happyDogImg);
  }
  drawSprites();


  //add styles here
  fill("red");
  stroke(2);
  textSize(20);
  text("Note:Press the UP_ARROW KEY to feed the dog",50,100);
  

  fill("red");
  stroke(2);
  textSize(20);
  text("Food remaining :" + count,150,400);


}

function readStock(data){
    foodS = data.val();
};

function writeStock(x){
   if(x<=0){
     x = 0;
   }else{
     x = x-1;
   }

   database.ref('/').update({
     Food:x
   })
   count = x;


};



