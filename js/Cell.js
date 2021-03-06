class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.alive = Math.random() < 0.12345;
    this.everAlive = this.alive;
    this.lastAlive = 0;

    this.neighbours = {
      tl: null,
      t: null,
      tr: null,
      l: null,
      r: null,
      bl: null,
      b: null,
      br: null
    };

    this.clicked = false;
    this.nextState = () => null;
  }

  getNeighbours() {
    return Object.values(this.neighbours).filter((n) => n instanceof Cell);
  }

  location() {
    return [this.x, this.y];
  }

  isAt(x, y) {
    const isAtColumn = x >= this.x && x < this.x + this.size;
    const isAtRow = y >= this.y && y < this.y + this.size;

    return isAtColumn && isAtRow;
  }

  isCursorAtNeighbour() {
    return this.getNeighbours().some((n) => n.isUnderCursor());
  }

  isUnderCursor() {
    if (mouseX === 0 && mouseY === 0) return false;

    return this.isAt(mouseX, mouseY);
  }

  click() {
    this.clicked = true;
  }

  getFillColor() {
    if (this.isAlive()) return 'white';

    if (this.isUnderCursor()) return 'grey';

    if (this.isCursorAtNeighbour()) return 'darkgrey';

    if (!this.everAlive) return 'black';

    return 255 / (1 + this.lastAlive);
  }

  draw() {
    noStroke();
    fill(this.getFillColor());
    ellipseMode(CORNER);
    circle(this.x, this.y, this.size);
  }

  isAlive() {
    return this.alive;
  }

  heal() {
    this.alive = true;
    this.everAlive = true;
    this.lastAlive = 0;
  }

  kill() {
    this.alive = false;
  }

  lazarus(depth = 0) {
    if (depth > 3) return;
    for (const cell of [this, ...this.getNeighbours()]) {
      if (cell.isAlive()) continue;
      if (Math.random() < 0.5) cell.heal();
      if (Math.random() < 0.2) cell.lazarus(depth + 1);
    }
  }

  prepareNextState() {
    if (this.clicked) {
      this.nextState = () => this.lazarus();
      this.clicked = false;
      return;
    }

    const neighbours = Object.values(this.neighbours).filter((n) => n);
    const aliveNeighbours = neighbours.filter((n) => n.isAlive()).length;

    if (this.isAlive() && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
      this.nextState = () => this.kill();
    }

    if (!this.isAlive() && aliveNeighbours === 3) {
      this.nextState = () => this.heal();
    }
  }

  update() {
    this.nextState();
    if (!this.isAlive()) this.lastAlive += 1;
  }
}
