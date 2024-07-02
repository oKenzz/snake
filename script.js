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

let timer;

// TODO: Point system

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
  document.addEventListener("keypress", (e) => restart(e))
}

const setDirection = (e) => {
  if (e.key == "w" && snake.direction != "DOWN") {
    snake.setDirection("UP");
  } else if (e.key == "a" && snake.direction != "RIGHT") {
    snake.setDirection("LEFT");
  } else if (e.key == "s" && snake.direction != "UP") {
    snake.setDirection("DOWN");
  } else if (e.key == "d" && snake.direction != "LEFT") {
    snake.setDirection("RIGHT");
  }
}

const renderBlank = (x, y) => {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black"
  ctx.clearRect(x * 50 + 1, y * 50 + 1, gridSize - 2, gridSize - 2);
}

const initializeEntities = () => {
  snake = new Snake(1, 5);
  food = new Food(7, 5);
}

const checkFoodCollision = () => {
  if (snake.head.x == food.x && snake.head.y == food.y) {
    return true;
  }
  return false;
}

const generateCoordinates = () => {
  const rows = canvas.height / gridSize;
  const columns = canvas.width / gridSize;
  const allCoordinates = new Set();
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      allCoordinates.add(`${row},${column}`);
    }
  }

  for (let part of snake.body) {
    const x = part.x;
    const y = part.y;
    allCoordinates.delete(`${x},${y}`);
  }
  return allCoordinates;
}

const spawnFood = () => {
  const availableCoordinates = generateCoordinates();
  const coordinatesArray = Array.from(availableCoordinates);

  // Select a random index from the array
  const randomIndex = Math.floor(Math.random() * coordinatesArray.length);

  // Get the random coordinate string and split it to get x and y
  const [randomX, randomY] = coordinatesArray[randomIndex].split(',').map(Number);
  food = new Food(randomX, randomY);
}

const gameLoop = () => {
  try {
    snake.update();
    foodCollisionDetected = checkFoodCollision();
    if (foodCollisionDetected) {
      spawnFood();
      snake.grow();
    }
  } catch (error) {
    console.log(error.message);
    clearInterval(timer);
  }
}

const start = () => {
  setupCanvas();
  initializeEntities();
  setupEventListeners();
  timer = setInterval(gameLoop, 115);
}

const restart = (e) => {
  if (e.code == "Space") {
    clearInterval(timer);
    start();
  }
}

start();
