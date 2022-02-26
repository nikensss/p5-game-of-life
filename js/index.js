const CELL_SIZE = 12;
const universe = new Universe();
const stats = new Stats(universe.getCells());

function setup() {
  const WIDTH = CELL_SIZE * 67;
  const HEIGHT = CELL_SIZE * 67;

  createCanvas(WIDTH, HEIGHT);

  universe.init(CELL_SIZE, WIDTH, HEIGHT);
}

function draw() {
  background(0);

  stats.update();
  stats.show();

  if (frameCount % 4 === 0) universe.update();

  universe.draw();
}

function mouseClicked() {
  universe.click(mouseX, mouseY);
  if (universe.isCellClicked(mouseX, mouseY)) stats.click();
}
