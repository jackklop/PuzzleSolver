class Chromosome {
  constructor(x, y) {
    this.width = x;
    this.height = y;
    this.board = [];
    this.precision = 0;
    for (let i = 0; i < x; i++) {
      this.board.push([]);
    }
    getRandomBoard(this.board, x);
  }

  updatePrecision(target) {
    let count = 0;
    let str = this.toString();
    for (let i = 0; i < target.length; i++) {
      if (target[i] === str[i]) count++;
    }
    this.precision = count / target.length;
  }

  updateChromosome(a, b, spl_i) {
    let board_to_update = [];
    a.board.forEach(() => board_to_update.push([]));
    let index = 0;
    for (let i = 0; i < a.board.length; i++) {
      for (let j = 0; j < a.board[i].length; j++) {
        if (index < spl_i) {
          board_to_update[i][j] = a.board[i][j];
        } else {
          board_to_update[i][j] = b.board[i][j];
        }
        index++;
      }
    }
    this.board = board_to_update;
  }

  mutate(rate) {
    if (Math.random() < rate) {
      randomizeBoard(this.board);
    }
  }

  toString() {
    return convertBoardToString(this.board);
  }
}
