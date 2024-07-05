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
let points = 0;

let timer;

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

  const randomIndex = Math.floor(Math.random() * coordinatesArray.length);

  const [randomX, randomY] = coordinatesArray[randomIndex].split(',').map(Number);
  food = new Food(randomX, randomY);
}

const gameLoop = () => {
  try {
    snake.update();
    foodCollisionDetected = checkFoodCollision();
    if (foodCollisionDetected) {
      points += 1;
      console.log(points);
      snake.grow();
      spawnFood();
    }
  } catch (error) {
    console.log(error.message);
    clearInterval(timer);
    console.log("You got " + points + " points");
  }
}

const start = () => {
  points = 0;
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

const setSnakeDirection = () => {
  let snakeUp = 0;
  let snakeRight = 0;
  let snakeDown = 0;
  let snakeLeft = 0;

  switch (snake.direction) {
    case "UP":
      snakeUp = 1;
      break;
    case "RIGHT":
      snakeRight = 1;
      break;
    case "DOWN":
      snakeDown = 1;
      break;
    case "LEFT":
      snakeLeft = 1;
      break;
    default:
      break;
  }
  return [snakeUp, snakeRight, snakeDown, snakeLeft];
}

const checkFoodProximity = () => {
  let foodUp = 0;
  let foodRight = 0;
  let foodDown = 0;
  let foodLeft = 0;

  const dx = snake.head.x - food.x;
  const dy = snake.head.y - food.y;

  if (dx == 1) {
    foodLeft = 1;
  } else if (dx == -1) {
    foodRight = 1;
  }

  if (dy == 1) {
    foodUp = 1;
  } else if (dy == -1) {
    foodDown = 1;
  }

  return [foodUp, foodRight, foodDown, foodLeft];
}

const distanceToFood = () => {
  const dx = Math.abs(snake.head.x - food.x);
  const dy = Math.abs(snake.head.y - food.y);

  const distance = Math.sqrt(dx ** 2 + dy ** 2);

  return distance;
}

const checkDanger = () => {
  let dangerUp = 0;
  let dangerRight = 0;
  let dangerDown = 0;
  let dangerLeft = 0;
  const head = snake.head;

  if (head.x == 0) {
    dangerUp = 1;
  } else if (head.x == 11) {
    dangerDown = 1;
  } else if (head.y == 0) {
    dangerLeft = 1;
  } else if (head.y == 11) {
    dangerRight = 1;
  }

  for (let part of snake.body) {
    const dx = head.x - part.x;
    const dy = head.y - part.y;

    if (dx == 1) {
      dangerLeft = 1;
    } else if (dx == -1) {
      dangerRight = 1;
    }

    if (dy == 1) {
      dangerUp = 1;
    } else if (dy == -1) {
      dangerDown = 1;
    }
  }

  return [dangerUp, dangerRight, dangerDown, dangerLeft];
}

const getState = () => {
  const dangers = checkDanger();
  const snakeDirections = setSnakeDirection();
  const foodProximity = checkFoodProximity();
  const headPosition = [snake.head.x, snake.head.y];
  const foodPosition = [food.x, food.y];
  const foodDistance = distanceToFood();

  const state = dangers.concat(snakeDirections, foodProximity);
  state.push(headPosition);
  state.push(foodPosition);
  state.push(foodDistance);

  return state;
}

start();
getState();
