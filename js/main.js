// Create a new element with the className defined

function create(className) {
    const playArea = document.getElementById("container");
    const newElement = document.createElement("div");
    newElement.className = className;

    playArea.appendChild(newElement);

    return newElement;
}

// Draw element to the DOM

function draw(item){
    item.domElement.style.width = item.width + "vw";
    item.domElement.style.height = item.height +  "vh";
    item.domElement.style.left = item.positionX + "vw";
    item.domElement.style.bottom = item.positionY + "vh";
}

const game = new Game(create, draw);

game.start();

document.addEventListener("keydown", function (event) {
    switch (event.key){
      case "ArrowRight":
        game.movePlayer("right");
        break;
      case "ArrowLeft":
        game.movePlayer("left");
        break;
      case "ArrowUp":
        game.movePlayer("up");
        break;
      case "ArrowDown":
        game.movePlayer("down");
        break;
      case "s":
          if (game.run === false){
            game.run = true;
            game.runGame();
          } else if (game.run === true){
            game.run = false;
            game.pauseGame();
          };
          break;
        case " ":
          console.log("pressed to shoot")
          game.shootWeapon();
          break;
      }
    })


