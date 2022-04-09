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

   
  }

  runGame() {
    this.movementTimer = setInterval(() => {
      this.obstacleArr.forEach((obstacle) => {
        obstacle.moveLeft();
        this.draw(obstacle);
      });

      if (this.timer % 5 === 0) {
        const newObstacle = new Obstacle();
        newObstacle.domElement = this.create("obstacle");
        this.obstacleArr.push(newObstacle);
      }
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

  detectCollision() {}

  shootWeapon() {}

  deleteOutOfScreen(item) {
    if (item.positionY === 0) {
        this.obstacleArr.splice(this.obstacleArr.indexOf(obstacle), 1);
        obstacle.domElement.remove();
      }
    }
  

  gameOver() {}

  displayDetails() {}
  // display life, score and time
}

class Player {
  constructor() {
    this.width = 5;
    this.height = 5;
    this.positionX = 0;
    this.positionY = 50;
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
