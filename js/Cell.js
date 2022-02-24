class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.alive = Math.random() < 0.12345;
    this.neighbours = {
      tl: null,
      t: null,
      tr: null,
      l: null,
      r: null,
      bl: null,
      b: null,
      br: null,
    };
    this.clicked = false;
    this.nextState = () => {};
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

  isAtNeighbour() {
    return this.getNeighbours().some((n) => n.isMouseOver());
  }

  isMouseOver() {
    return this.isAt(mouseX, mouseY);
  }

  click() {
    this.clicked = true;
  }

  getFillColor() {
    if (this.isMouseOver()) return "grey";
    if (this.isAtNeighbour()) return "lightgrey";

    return this.isAlive() ? "white" : "black";
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
  }

  kill() {
    this.alive = false;
  }

  lazarus() {
    for (const cell of [this, ...this.getNeighbours()]) {
      Math.random() < 0.5 ? cell.heal() : cell.kill();
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
  }
}
