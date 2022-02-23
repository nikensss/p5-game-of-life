const cells = [];
const TOTAL_CELLS = 100;
const WIDTH = 800;
const HEIGHT = WIDTH;
const CELL_SIZE = WIDTH / TOTAL_CELLS;
const cellSize = () => WIDTH / TOTAL_CELLS;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  for (let y = 0; y < HEIGHT; y += CELL_SIZE) {
    for (let x = 0; x < WIDTH; x += CELL_SIZE) {
      cells.push(new Cell(x, y, cellSize()));
    }
  }

  interconnectCells(cells);
}

function draw() {
  frameRate(30);

  background(220);
  cells.forEach((c) => c.draw());
  cells.forEach((c) => c.prepareNextState());
  cells.forEach((c) => c.updateNextState());
}

function mouseClicked() {
  const [x, y] = [mouseX, mouseY];
  const clickedCell = cells.find((c) => c.isAt(x, y));
  clickedCell?.lazarus();
}

function findCell(x, y) {
  return cells.find((c) => c.isAt(x, y));
}

function interconnectCells(cells) {
  console.log("interconnecting...");

  cells.forEach((c) => {
    const [x, y] = c.location();
    c.neighbours.tl =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return x - _x === cellSize() && y - _y === cellSize();
      }) || null;

    c.neighbours.t =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return _x - x === 0 && y - _y === cellSize();
      }) || null;

    c.neighbours.tr =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return _x - x === cellSize() && y - _y === cellSize();
      }) || null;

    c.neighbours.l =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return x - _x === cellSize() && y - _y === 0;
      }) || null;

    c.neighbours.r =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return _x - x === cellSize() && y - _y === 0;
      }) || null;

    c.neighbours.bl =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return x - _x === cellSize() && _y - y === cellSize();
      }) || null;

    c.neighbours.b =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return _x - x === 0 && _y - y === cellSize();
      }) || null;

    c.neighbours.br =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return _x - x === cellSize() && _y - y === cellSize();
      }) || null;
  });

  console.log("done interconnecting!");
}
