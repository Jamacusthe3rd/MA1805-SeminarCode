//setting up initial values
let tileMap = []
let tilesX = 10
let tilesY = 10
let tileSize = 50
let textures = []
let player1 
let leftOrRightLeg = true
let leg = 1

let graphicMap = [
//    THESE ARE OUR Y VALUES
// 0  1  2  3  4  5  6  7  8  9
	[3, 3, 3, 2, 0, 0, 0, 1, 1, 1], // 0
	[3, 3, 3, 2, 0, 0, 0, 1, 1, 1], // 1
	[3, 3, 3, 2, 0, 0, 0, 1, 1, 1], // 2
	[3, 3, 3, 2, 0, 0, 0, 1, 1, 1], // 3
  [2, 2, 2, 2, 0, 0, 0, 1, 1, 1], // 4
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 5   THESE ARE OUR X VALUES
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 6
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 7
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 8
  [0, 0, 0, 0, 0, 0, 0, 1, 1, 1]  // 9
]

let tileRules = [
  //    THESE ARE OUR Y VALUES
  // 0  1  2  3  4  5  6  7  8  9
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 0
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 1
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 2
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 3
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 4
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 5   THESE ARE OUR X VALUES
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 6
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 7
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1], // 8
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1]  // 9
  ]


class Tile { //creates class for a tile
  constructor(texture, tileX, tileY, tileSize, tileID) {
    this.texture = texture; //texture of tile in tileMap grid
    this.tileX = tileX; //x position of tile in tileMap grid
    this.tileY = tileY; //y position of tile in tileMap grid
    this.tileSize = tileSize; //size of tiles in pixels
    this.xPos = this.tileX * this.tileSize; //x pixel position of tile in canvas
    this.yPos = this.tileY * this.tileSize; //y pixel position of tile in canvas
    this.tileID = tileID;
    this.isMoving = false;
  }

  display() {
    noStroke()
    image(this.texture, this.xPos, this.yPos, tileSize, tileSize)
  }

  debugGrid() { //used to display the x and y of the tiles in the tileMap scale (not default pixel scale), along with the tiles IDs

    let xPadding = 2 //pads text so it displays within the box (x axis)
    let yCoordinatePadding = 8 //pads coordinate text so it displays within the box (y axis) but above ID text
    let yIDPadding = 18 //pads ID text so it displays within the box (y axis) and below the coordinate text

    //All Text Settings
    strokeWeight(1)
    stroke("black")
    fill("yellow")

    //display X and Y coordinate Text
    textSize(8)
    text("X: " + this.tileX + ", Y: " + this.tileY, this.xPos +xPadding, this.yPos + yCoordinatePadding)

    //Display tileID text
    textSize(10)
    text("ID: " + this.tileID, this.xPos + xPadding, this.yPos + yIDPadding)

    //Create rect around tile
    noFill()
    stroke("yellow")
    rect(this.xPos, this.yPos, this.tileSize, this.tileSize)
  }

  displayMessage() { //adds a message to specified tiles

    let xPadding = 2 //pads text so it displays within the box (x axis)
    let yPadding = 40 //pads message so it displays withing the box and below the ID text

    // display message text
    strokeWeight(1)
    stroke("black")
    fill("white")
    textSize(10)
    text("Accessed!", this.xPos + xPadding, this.yPos + yPadding)
  }


}

class Player {
  constructor(currentSpriteGroup, startX, startY, tileRules){
    this.currentSpriteGroup = currentSpriteGroup
    this.currentSprite = this.currentSpriteGroup[0]
    this.tileX = startX
    this.tileY = startY
    this.speed = 0.2
    this.tileSize = tileSize
    this.tileRules = tileRules

  }

  move() {
    if ((keyIsDown(87))||(keyIsDown(65))||(keyIsDown(83))||(keyIsDown(68))){
      this.isMoving = true
    }
    else{
      this.isMoving = false
    }
    if (keyIsDown(87) == true){
      this.currentSpriteGroup = sprites.knight_up
      this.tileY -= this.speed
    }
    else{
      if (keyIsDown(65) == true){
      this.currentSpriteGroup = sprites.knight_left
      this.tileX -= this.speed
    }
      else{
        if (keyIsDown(83) == true){
        this.currentSpriteGroup = sprites.knight_down
        this.tileY += this.speed
      }
        else{
          if (keyIsDown(68) == true){
          this.currentSpriteGroup = sprites.knight_right
          this.tileX += this.speed
        }
      }
    }
  }
  if (this.isMoving){
    setInterval(function () {leftOrRightLeg = !leftOrRightLeg}, 1000)
    if (leftOrRightLeg){
      leg = 1
    }
    else{
      leg = 2
    }
    this.currentSprite = this.currentSpriteGroup[leg]
  }
  else{
    this.currentSprite = this.currentSpriteGroup[0]
  }
}

  display (){
    //player sprite     //player x  //player y   //width   //height
    image(this.currentSprite,this.tileX,this.tileY,tileSize,tileSize*2)
  }

}

function preload() {
  textures[0] = loadImage('sprites/tile_grass.png')
  textures[1] = loadImage('sprites/tile_water.png')
  textures[2] = loadImage('sprites/tile_wood.png')
  textures[3] = loadImage('sprites/tile_stone.png')


  sprites = {
    knight_up: [loadImage('sprites/knight_up_still.png'),loadImage('sprites/knight_up_leftlegwalk.png'),loadImage('sprites/knight_up_rightlegwalk.png')],
    knight_left: [loadImage('sprites/knight_left_still.png'),loadImage('sprites/knight_left_leftlegwalk.png'),loadImage('sprites/knight_left_rightlegwalk.png')],
    knight_down: [loadImage('sprites/knight_down_still.png'),loadImage('sprites/knight_down_leftlegwalk.png'),loadImage('sprites/knight_down_rightlegwalk.png')],
    knight_right: [loadImage('sprites/knight_right_still.png'),loadImage('sprites/knight_right_leftlegwalk.png'),loadImage('sprites/knight_right_rightlegwalk.png')],
  }
  
}

function setup() {
  createCanvas(500,500);
  let tileID = 0
  for (let tileX = 0; tileX < tilesX; tileX++) {
    tileMap[tileX] = []
    for (let tileY = 0; tileY < tilesY; tileY++) {
      let texture = graphicMap[tileY][tileX]
      tileMap[tileX][tileY] = new Tile(textures[texture], tileX, tileY, tileSize, tileID) //creates a tile object for every 50 pixels down and every 50 pixels right
      tileID++
    }
  }
  player1 = new Player(sprites.knight_down, 100, 100, tileRules)
}

function draw() {
  background(0);
  for (let tileX = 0; tileX < tilesX; tileX++) {
    for (let tileY = 0; tileY < tilesY; tileY++) {
      tileMap[tileX][tileY].display()
      //tileMap[tileX][tileY].debugGrid() //displays the x and y of the tile in the tileMap scale (not default pixel scale), along with the tile ID
      
    }
    player1.move()
    player1.display()
  }

  //tileMap[5][6].displayMessage()//adding a message to specified tiles
}