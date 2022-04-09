console.log("hello world!");

class Game {
    constructor(create, draw) {
    this.player = null;
    this.draw = draw;
    this.create = create;
    
}

// create player element - with class name "player" and draw
start(){
    this.player = new Player();
    this.player.domElement = this.create("player"); 
    this.draw(this.player);
    this.runGame();
}

runGame(){
}

pauseGame(){}

movePlayer(direction){
    if (direction === "left" && this.player.positionX > 0) {
        this.player.moveLeft();
      } else if (direction === "right" && this.player.positionX < 95) {
        this.player.moveRight();
      } else if (direction === "up" && this.player.positionY < 95) {
        this.player.moveUp();
      } else if (direction === "down" && this.player.positionY > 0) {
        this.player.moveDown();
      }
      this.draw(this.player);
}

detectCollision(){}

shootWeapon(){}

deleteCollision(){}

gameOver(){}

displayDetails(
    // display life, score and time
){}

}

class Player {
    constructor(){
        this.width = 5
        this.height = 15
        this.positionX = 0
        this.positionY = 50
        this.domElement = null;
    }

    moveLeft() {
        this.positionX--;
      }
    
      moveRight() {
        this.positionX++;
      }
    
      moveDown() {
        this.positionY--;
      }
    
      moveUp() {
        this.positionY++;
      }
}

class Obstacles{
    constructor() {
        this.positionX = 90;
        this.positionY = Math.floor(Math.random() * 70);
        this.domElement = null;
        this.width = 5;
        this.height = 5;
      }

      moveLeft() {
        this.positionX--;
      }
}