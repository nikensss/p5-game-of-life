class Cell {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
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

  isAt(x, y) {
    const isAtColumn = x >= this.x && x < this.x + this.size;
    const isAtRow = y >= this.y && y < this.y + this.size;

    return isAtColumn && isAtRow;
  }

  draw() {
    fill(this.alive ? "white" : "black");
    rect(this.x, this.y, this.size, this.size);
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
    for (const neighbour of Object.values(this.neighbours)) {
      Math.random() < 0.5 ? neighbour.heal() : neighbour.kill();
    }
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
