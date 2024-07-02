const canvas = document.getElementById('board');
const gridSize = 50;
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  RIGHT: { x: 1, y: 0 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 }
}

let snake;
let food;

const setupCanvas = () => {
  canvas.setAttribute("width", "600");
  canvas.setAttribute("height", "600");
  const rows = canvas.height / gridSize;
  const columns = canvas.width / gridSize;
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = '#99FF8E';

  for (let row = 0; row < rows; row++) {
    ctx.beginPath();
    ctx.moveTo(0, row * gridSize);
    ctx.lineTo(canvas.width, row * gridSize);
    ctx.stroke();
  }

  for (let column = 0; column < columns; column++) {
    ctx.beginPath();
    ctx.moveTo(column * gridSize, 0);
    ctx.lineTo(column * gridSize, canvas.height);
    ctx.stroke();
  }
};

const setupEventListeners = () => {
  document.addEventListener("keypress", (e) => setDirection(e))
}

const setDirection = (e) => {
  switch (e.key) {
    case "w":
      snake.setDirection("UP");
      break;
    case "a":
      snake.setDirection("LEFT");
      break;
    case "s":
      snake.setDirection("DOWN");
      break;
    case "d":
      snake.setDirection("RIGHT");
      break;
    default:
      break;
  }
}

const renderBlank = (row, col) => {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black"
  ctx.clearRect(row * 50 + 1, col * 50 + 1, gridSize - 2, gridSize - 2);
}

const initializeEntities = () => {
  snake = new Snake(1, 5);
  food = new Food(7, 5);
}

checkFoodCollision = () => {
  if (snake.head.x == food.x && snake.head.y == food.y) {
    return true;
  }
  return false;
}

gameLoop = () => {
  try {
    snake.update();
    console.log(checkFoodCollision());
  } catch (error) {
    console.log(error.message);
    clearInterval(timer);
  }
}

setupCanvas();
initializeEntities();
setupEventListeners();

const timer = setInterval(gameLoop, 500);
