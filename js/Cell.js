class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alive = Math.random() < 0.2;
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
    this.nextState = () => {};
  }

  location() {
    return [this.x, this.y];
  }

  draw() {
    fill(this.alive ? "white" : "black");
    rect(this.x, this.y, CELL_SIZE, CELL_SIZE);
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

  prepareNextState() {
    const neighbours = Object.values(this.neighbours).filter((n) => n);
    const aliveNeighbours = neighbours.filter((n) => n.isAlive()).length;

    if (this.isAlive() && (aliveNeighbours < 2 || aliveNeighbours > 3)) {
      this.nextState = () => this.kill();
    }

    if (!this.isAlive() && aliveNeighbours === 3) {
      this.nextState = () => this.heal();
    }
  }

  updateNextState() {
    this.nextState();
  }
}
