const cells = [];
const WIDTH = 800;
const HEIGHT = WIDTH;
const TOTAL_CELLS = 100;
const CELL_SIZE = WIDTH / TOTAL_CELLS;

function setup() {
  createCanvas(WIDTH, HEIGHT);

  for (let y = 0; y < HEIGHT; y += CELL_SIZE) {
    for (let x = 0; x < WIDTH; x += CELL_SIZE) {
      cells.push(new Cell(x, y));
    }
  }

  interconnectCells(cells);
}

function draw() {
  frameRate(60);

  background(220);
  cells.forEach((c) => c.draw());
  cells.forEach((c) => c.prepareNextState());
  cells.forEach((c) => c.updateNextState());
}

function interconnectCells(cells) {
  console.log("interconnecting...");

  cells.forEach((c) => {
    const [x, y] = c.location();
    c.neighbours.tl =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return x - _x === CELL_SIZE && y - _y === CELL_SIZE;
      }) || null;

    c.neighbours.t =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return _x - x === 0 && y - _y === CELL_SIZE;
      }) || null;

    c.neighbours.tr =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return _x - x === CELL_SIZE && y - _y === CELL_SIZE;
      }) || null;

    c.neighbours.l =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return x - _x === CELL_SIZE && y - _y === 0;
      }) || null;

    c.neighbours.r =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return _x - x === CELL_SIZE && y - _y === 0;
      }) || null;

    c.neighbours.bl =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return x - _x === CELL_SIZE && _y - y === CELL_SIZE;
      }) || null;

    c.neighbours.b =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return _x - x === 0 && _y - y === CELL_SIZE;
      }) || null;

    c.neighbours.br =
      cells.find((_c) => {
        const [_x, _y] = _c.location();
        return _x - x === CELL_SIZE && _y - y === CELL_SIZE;
      }) || null;
  });

  console.log("done interconnecting!");
}
