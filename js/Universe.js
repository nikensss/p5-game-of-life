class Universe {
  constructor() {
    this.cells = [];
  }

  getCells() {
    return this.cells;
  }

  init(cellSize, width, height) {
    for (let y = 0; y < height; y += cellSize) {
      for (let x = 0; x < width; x += cellSize) {
        this.cells.push(new Cell(x, y, cellSize));
      }
    }
    this.interconnectCells();
  }

  isCellClicked(x, y) {
    return typeof this.cells.find((c) => c.isAt(x, y)) !== "undefined";
  }

  click(x, y) {
    this.cells.find((c) => c.isAt(x, y))?.click();
  }

  update() {
    this.cells.forEach((c) => c.prepareNextState());
    this.cells.forEach((c) => c.update());
  }

  draw() {
    this.cells.forEach((c) => c.draw());
  }

  interconnectCells() {
    this.cells.forEach((c) => {
      const [x, y] = c.location();
      c.neighbours.tl =
        this.cells.find((_c) => {
          const [_x, _y] = _c.location();
          return x - _x === CELL_SIZE && y - _y === CELL_SIZE;
        }) || null;

      c.neighbours.t =
        this.cells.find((_c) => {
          const [_x, _y] = _c.location();
          return _x - x === 0 && y - _y === CELL_SIZE;
        }) || null;

      c.neighbours.tr =
        this.cells.find((_c) => {
          const [_x, _y] = _c.location();
          return _x - x === CELL_SIZE && y - _y === CELL_SIZE;
        }) || null;

      c.neighbours.l =
        this.cells.find((_c) => {
          const [_x, _y] = _c.location();
          return x - _x === CELL_SIZE && y - _y === 0;
        }) || null;

      c.neighbours.r =
        this.cells.find((_c) => {
          const [_x, _y] = _c.location();
          return _x - x === CELL_SIZE && y - _y === 0;
        }) || null;

      c.neighbours.bl =
        this.cells.find((_c) => {
          const [_x, _y] = _c.location();
          return x - _x === CELL_SIZE && _y - y === CELL_SIZE;
        }) || null;

      c.neighbours.b =
        this.cells.find((_c) => {
          const [_x, _y] = _c.location();
          return _x - x === 0 && _y - y === CELL_SIZE;
        }) || null;

      c.neighbours.br =
        this.cells.find((_c) => {
          const [_x, _y] = _c.location();
          return _x - x === CELL_SIZE && _y - y === CELL_SIZE;
        }) || null;
    });
  }
}
