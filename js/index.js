const cells = [];
const CELL_SIZE = 12;

function setup() {
  const WIDTH = 800;
  const HEIGHT = 800;
  createCanvas(WIDTH, HEIGHT);

  for (let y = 0; y < HEIGHT; y += CELL_SIZE) {
    for (let x = 0; x < WIDTH; x += CELL_SIZE) {
      cells.push(new Cell(x, y, CELL_SIZE));
    }
  }

  interconnectCells(cells);
}

function draw() {
  frameRate(15);

  background(0);
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
