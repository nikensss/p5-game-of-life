class Stats {
  constructor(cells) {
    this.current = {
      value: 0,
      ref: document.getElementById("stats-current"),
    };
    this.max = {
      value: Number.MIN_SAFE_INTEGER,
      ref: document.getElementById("stats-max"),
    };
    this.min = {
      value: Number.MAX_SAFE_INTEGER,
      ref: document.getElementById("stats-min"),
    };

    this.cells = cells;

    console.log({ current: this.current });
  }

  update() {
    if (!this.cells) return;
    const count = this.cells.filter((c) => c.isAlive()).length;
    if (this.max.value < count) this.max.value = count;
    if (this.min.value > count) this.min.value = count;
    this.current.value = count;
  }

  show() {
    this.current.ref.innerText = `Current: ${this.current.value}`;
    this.max.ref.innerText = `Max: ${this.max.value}`;
    this.min.ref.innerText = `Min: ${this.min.value}`;
  }
}