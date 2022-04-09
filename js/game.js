console.log("hello world!");

class Game {
  constructor(create, draw) {
    this.draw = draw;
    this.create = create;
    this.player = null;
    this.obstacle = null;
    this.obstacleArr = [];
    this.movementTimer = null;
    this.timer = 0;
  }

  // create player element - with class name "player" and draw
  start() {
    this.player = new Player();
    this.player.domElement = this.create("player");
    this.draw(this.player);
    this.runGame();
    this.displayDetails();
    
   
  }

  runGame() {
    this.movementTimer = setInterval(() => {
      this.obstacleArr.forEach((obstacle) => {
        obstacle.moveLeft();
        this.draw(obstacle);
        this.detectCollision(obstacle);
      });

      if (this.timer % 5 === 0) {
        const newObstacle = new Obstacle();
        newObstacle.domElement = this.create("obstacle");
        this.obstacleArr.push(newObstacle);
      }
      this.gameOver()
      this.timer++

    },100);
  }

  pauseGame() {}

  movePlayer(direction) {
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

  detectCollision(item) {
    if (
        this.player.positionX < item.positionX + item.width &&
        this.player.positionX + this.player.width > item.positionX &&
        this.player.positionY < item.positionY + item.height &&
        this.player.height + this.player.positionY > item.positionY
      ) {

       this.player.life--;
       this.displayDetails();
     console.log("collision detected")
     //   this.itemArr.splice(this.itemArr.indexOf(item), 1);
     //   obstacle.domElement.remove();
      }
  //    if (this.player.life === -1) {
  //      this.gameOver();
      
  }

  shootWeapon() {}

  deleteOutOfScreen(item) {
    if (item.positionY === 0) {
        this.obstacleArr.splice(this.obstacleArr.indexOf(obstacle), 1);
        obstacle.domElement.remove();
      }
    }
  

  gameOver() {
      if (this.player.life === -1){
    alert("Game Over");
    location.reload();
  }
}

  displayDetails() {
    let lifeLeft = this.player.life;
    document.getElementById("life").textContent = lifeLeft;
  }
  // display life, score and time
}

class Player {
  constructor() {
    this.width = 5;
    this.height = 5;
    this.positionX = 0;
    this.positionY = 50;
    this.domElement = null;
    this.life = 3;
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

class Obstacle {
  constructor() {
    this.positionX = 85;
    this.positionY = Math.floor(Math.random() * 70);
    this.domElement = null;
    this.width = 5;
    this.height = 5;
  }

  moveLeft() {
    this.positionX--;
  }
}
