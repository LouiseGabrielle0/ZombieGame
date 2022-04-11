class Game {
  constructor(create, draw) {
    this.draw = draw;
    this.create = create;
    this.player = null;
    this.obstacle = null;
    this.bonus = null;
    this.weapon = null;
    this.obstacleArr = [];
    this.bonusArr = [];
    this.shotArr = [];
    this.movementTimer = null;
    this.timer = 0;
    this.run = false;
    this.shootTimerId = null;
  }

  // items to be displayed on the initial screen

  start() {
    this.player = new Player();
    this.player.domElement = this.create("player");
    this.draw(this.player);
    this.displayDetails();
  }

  // allow the game to begin - create and loading moving zombies and stationary bonuses

  runGame() {
    this.movementTimer = setInterval(() => {
      this.obstacleArr.forEach((obstacle) => {
        obstacle.moveLeft();
        this.draw(obstacle);
        this.detectCollision(obstacle);
        this.deleteOutOfScreen(obstacle);
        this.detectShot(obstacle);
      });

      this.bonusArr.forEach((bonus) => {
        this.draw(bonus);
        this.deleteOutOfScreen(bonus);
        this.detectCollision(bonus);
        this.detectShot(bonus);
      });

      this.shotArr.forEach((shot) => {
        this.draw(shot);
        shot.moveRight();
        this.deleteOutOfScreen(shot);
      })

      if (this.timer % 5 === 0) {
        const newObstacle = new Obstacle();
        newObstacle.domElement = this.create("obstacle");
        this.obstacleArr.push(newObstacle);
      }

      if (this.timer % 25 === 0) {
        const newBonus = new Bonus();
        newBonus.domElement = this.create("bonus");
        this.bonusArr.push(newBonus);
      }

      this.timer++;
    }, 100);
  }

  pauseGame() {
    clearInterval(this.movementTimer);
  }

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
      switch (item.domElement.className) {
        case "obstacle":
          this.player.life--;
          this.displayDetails();
          this.obstacleArr.splice(this.obstacleArr.indexOf(item), 1);
          item.domElement.remove();
          break;
        case "bonus":
          this.player.score += 10;
          this.displayDetails();
          this.bonusArr.splice(this.bonusArr.indexOf(item), 1);
          item.domElement.remove();
          console.log(this.player.score);
          break;
      }
    }
    if (this.player.life === -1) {
      this.gameOver();
      s;
    }
  }

  shootWeapon() {
    let playerPositionX = this.player.positionX;
    let playerPositionY = this.player.positionY;

    const newShot = new Weapon(playerPositionX, playerPositionY);
    newShot.domElement = this.create("shot");
    this.shotArr.push(newShot);
    this.draw(newShot);
  }

  detectShot(item) {
    this.shotArr.forEach((shot) => {
      if (
        shot.positionX < item.positionX + item.width &&
        shot.positionX + shot.width > item.positionX &&
        shot.positionY < item.positionY + item.height &&
        shot.height + shot.positionY > item.positionY
      ) {
        switch (item.domElement.className) {
          case "obstacle":
            console.log("zombie hit")
            this.player.score += 10;
            this.displayDetails();
            this.obstacleArr.splice(this.obstacleArr.indexOf(item), 1);
            item.domElement.remove();
            break;
          case "bonus":
            console.log("bonus hit")
            this.player.score -= 10;
            this.displayDetails();
            this.bonusArr.splice(this.bonusArr.indexOf(item), 1);
            item.domElement.remove();
            break;
        }
      }
    });
  }

  obstacleShot(item) {}
  // delete elements when out of bounds - note might change this two methofds - detect out of screen and delete so can be reused elsewhere in the board

  deleteOutOfScreen(item) {
    if (item.positionX === 0 || item.positionX === 90) {
      item.domElement.remove();
      switch (item.domElement.className) {
        case "obstacle":
          this.obstacleArr.splice(this.obstacleArr.indexOf(item), 1);
          break;
        case "shot":
          this.shotArr.splice(this.shotArr.indexOf(item), 1);
      }
    }
  }

  //end game

  gameOver() {
    alert("Game Over");
    document.location.reload();
    clearInterval(this.movementTimer);
    return;
  }
  //Allow the restart option

  reloadPage() {
    document.location.reload();
  }

  // Game info available on page for user to see

  displayDetails() {
    let lifeLeft = this.player.life;
    document.getElementById("life").textContent = lifeLeft;

    let score = this.player.score;
    document.getElementById("score").textContent = score;
    // display life, score and time
  }
}

class Player {
  constructor() {
    this.width = 3.3;
    this.height = 5.1;
    this.positionX = 0;
    this.positionY = 50;
    this.domElement = null;
    this.life = 3;
    this.score = 0;
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

class Weapon extends Player {
  constructor(positionX, positionY) {
    super();
    this.positionX = positionX;
    this.positionY = positionY;
    this.domElement = null;
    this.width = 1;
    this.height = 1;
  }

  moveRight() {
    this.positionX++;
  }
}

class Obstacle {
  constructor() {
    this.positionX = 85;
    this.positionY = Math.floor(Math.random() * 60);
    this.domElement = null;
    this.width = 2;
    this.height = 8;
  }

  moveLeft() {
    this.positionX--;
  }
}

class Bonus {
  constructor() {
    this.positionX = Math.floor(Math.random() * 85);
    this.positionY = Math.floor(Math.random() * 60);
    this.domElement = null;
    this.width = 2;
    this.height = 3.5;
  }
}
