class Stats {
  constructor(cells) {
    this.current = {
      value: 0,
      ref: document.getElementById('stats-current')
    };

    this.max = {
      value: Number.MIN_SAFE_INTEGER,
      ref: document.getElementById('stats-max')
    };

    this.min = {
      value: Number.MAX_SAFE_INTEGER,
      ref: document.getElementById('stats-min')
    };

    this.clicks = {
      value: 0,
      ref: document.getElementById('stats-clicks')
    };

    this.cells = cells;
  }

  update() {
    if (!Array.isArray(this.cells)) return;
    if (this.cells.some((c) => !c instanceof Cell)) {
      const error = 'Some elements in the "cells" array are not instances of the "Cell" class';
      throw new TypeError(error);
    }

    const count = this.cells.filter((c) => c.isAlive()).length;
    if (this.max.value < count) this.max.value = count;
    if (this.min.value > count) this.min.value = count;
    this.current.value = count;
  }

  click() {
    this.clicks.value += 1;
  }

  show() {
    this.clicks.ref.innerText = `Clicks: ${this.clicks.value}`;
    this.current.ref.innerText = `Current: ${this.current.value}`;
    this.max.ref.innerText = `Max: ${this.max.value}`;
    this.min.ref.innerText = `Min: ${this.min.value}`;
  }
}
