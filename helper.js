export const renderBlank = (x, y, canvas, gridSize) => {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black"
  ctx.clearRect(x * 50 + 1, y * 50 + 1, gridSize - 2, gridSize - 2);
}
