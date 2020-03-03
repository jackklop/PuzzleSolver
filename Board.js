let board_template = [
  [3, 2, 1, 4, 1],
  [3, 2, 1, 3, 3],
  [3, 3, 2, 1, 4],
  [3, 1, 2, 3, 3],
  [1, 4, 4, 3, "G"]
];

// let board_template = [
//     [2, 2, 2, 4, 3],
//     [2, 2, 3, 3, 3],
//     [3, 3, 2, 3, 3],
//     [4, 3, 2, 2, 2],
//     [1, 2, 1, 4, 'G'] ,
// ]

let board_for_hill_climbing = [];

class Board {
  constructor(w, h) {
    this.board;
    this.reset();
    this.w = w / this.board[0].length;
    this.h = h / this.board.length;
  }

  generateRandomBoard() {
    let board_size = parseInt(prompt("Enter the n", "5"));
    // let board_size = parseInt(Math.random() * 4) * 2 + 5;
    let new_board_template = [];
    for (let i = 0; i < board_size; i++) {
      new_board_template.push([]);
    }
    getRandomBoard(new_board_template, board_size);
    board_template = new_board_template;
    this.w = width / new_board_template[0].length;
    this.h = height / new_board_template.length;
    updateParagraph("");
    board.reset();
  }

  getBoard() {
    return this.board;
  }

  drawBoard() {
    strokeWeight(3);
    for (let i = 0; i <= this.board.length; i++) {
      line(0, i * this.h, height, i * this.h);
    }
    for (let i = 0; i <= this.board[0].length; i++) {
      line(i * this.w, 0, i * this.w, height);
    }
    textSize(this.w / 2);
    strokeWeight(0);
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        fill(this.board[i][j].col);
        text(
          this.board[i][j].val,
          j * this.w + this.w / 4 - 5,
          i * this.h + this.h / 2 + this.h / 3
        );
      }
    }
    fill("rgba(200,200,200,0.1)");
    rect(this.curr_loc[1] * this.w, this.curr_loc[0] * this.h, this.w, this.h);
  }

  bfs() {
    if (this.q.length !== 0) {
      let cell = this.q.shift();
      if (cell.val === "G") {
        cell.visited = true;
        this.q = [];
        let temp = cell;
        this.reached_goal = true;
        updateParagraph(`The Step it has taken is ${cell.step}`);
        while (temp) {
          temp.col = "rgb(255,0,0)";
          temp = temp.prev;
        }
        this.q = [];
        return;
      }
      cell.visited = true;
      cell.val = cell.step;
      cell.col = "rgb(0,0,0)";

      cell.neighbors.forEach(neighbor_cell => {
        if (!neighbor_cell.visited) {
          if (this.q.findIndex(c => c === neighbor_cell) === -1) {
            neighbor_cell.step = cell.step + 1;
            neighbor_cell.prev = cell;
            this.q.push(neighbor_cell);
          }
        }
      });
    } else {
      if (!this.reached_goal) {
        let unvisited_count = 0;
        for (let i = 0; i < this.board.length; i++) {
          for (let j = 0; j < this.board[i].length; j++) {
            unvisited_count += this.board[i][j].visited ? 0 : 1;
          }
        }
        updateParagraph(
          `Could not reach the goal. The univisted cells count -${unvisited_count}`
        );
      }
      this.showUnvisited();
    }
  }
  hillClimbing() {
    if (this.hillCount === -1) {
      let num = prompt("How many times do you want to run?");
      if (parseInt(num) === NaN) {
        throw new Error("Not a Valid Number");
      }
      this.hillCount = parseInt(num) + 2;
      board_for_hill_climbing = board_template;
      this.current_best = copy_board(board_for_hill_climbing);
      this.prev_min = undefined;
      this.step_taken = undefined;
      this.html = "";
      this.hill_count_index = 0;
      this.start = Date.now();
      this.time = [];
    }
    if (this.hillCount > 0) {
      if (this.q.length !== 0) {
        let cell = this.q.shift();
        if (cell.val === "G") {
          this.reached_goal = true;
          cell.visited = true;
          this.q = [];
          console.log(cell.step);
          if (!this.prev_min) {
            this.prev_min = cell.step;
          }
          this.step_taken = cell.step;
          let temp = cell;
          while (temp) {
            temp.col = "rgb(255,0,0)";
            temp = temp.prev;
          }
          this.q = [];
          return;
        }
        cell.visited = true;
        cell.val = cell.step;
        cell.col = "rgb(0,0,0)";

        cell.neighbors.forEach(neighbor_cell => {
          if (!neighbor_cell.visited) {
            if (this.q.findIndex(c => c === neighbor_cell) === -1) {
              neighbor_cell.step = cell.step + 1;
              neighbor_cell.prev = cell;
              this.q.push(neighbor_cell);
            }
          }
        });
      } else {
        this.hill_count_index++;
        this.hillCount--;
        if (this.hillCount < 1) {
          this.showUnvisited();
          this.html += `The best board we found <br>${this.current_best
            .map(board_row => {
              return board_row.join(" ");
            })
            .join("<br>")}`;
          updateParagraph(this.html + "<br/>" + this.time.join(","));
        } else if (this.hillCount === 1) {
          this.reset(this.current_best);
        } else {
          if (this.reached_goal && this.step_taken < this.prev_min) {
            console.log("Found better board and updating the best board");
            this.current_best = copy_board(board_for_hill_climbing);
            this.html += `At ${
              this.hill_count_index
            }, found better solution from ${this.prev_min} to ${
              this.step_taken
            }, time : ${(Date.now() - this.start) / 1000}s<br>`;
            this.time.push(Date.now() - this.start);
            updateParagraph(this.html);
            this.prev_min = this.step_taken;
          } else {
            this.html += `At ${
              this.hill_count_index
            }, could not find better solution, step taken : ${
              this.reached_goal ? this.step_taken : "Did Not reach the Goal"
            }, time : ${(Date.now() - this.start) / 1000}s<br>`;
            this.time.push(Date.now() - this.start);

            updateParagraph(this.html);
            board_for_hill_climbing = copy_board(this.current_best);
          }
          randomizeBoard(board_for_hill_climbing);
          this.reset(board_for_hill_climbing);
        }
        this.start = Date.now();
      }
    }
  }
  shortestPathFirstSearch() {
    if (this.q.length !== 0) {
      let cell = this.q.shift();
      if (cell.val === "G") {
        // TODO: Deal with Success Case.
        cell.visited = true;
        let temp = cell;
        while (temp) {
          temp.col = "rgb(255,0,0)";
          temp = temp.prev;
        }
        this.q = [];
        return;
      }
      cell.visited = true;
      cell.val = cell.step;
      cell.col = "rgb(0,0,0)";
      let copy_of_q = [];
      cell.neighbors.forEach(n => {
        if (!n.visited) {
          copy_of_q.push(n);
        }
      });
      // When there is no remaining unvisited neighbors.
      if (copy_of_q.length === 0) return;
      // Check if the neighbors already have the Goal.
      let index_found = copy_of_q.findIndex(n => n.val === "G");
      if (index_found !== -1) {
        this.q.push(copy_of_q[index_found]);
      } else {
        copy_of_q.sort((a, b) => b.val - a.val);
        let best_cell = copy_of_q[0];
        best_cell.step = cell.step + 1;
        best_cell.prev = cell;
        this.q.push(best_cell);
      }
    } else {
      this.showUnvisited();
    }
  }
  aStarSearch() {
    if (!this.pQ.isEmpty()) {
      let cell = this.pQ.dequeue();
      cell.visited = true;
      if (cell.val === "G") {
        cell.visited = true;
        this.pQ.q = [];
        let temp = cell;
        while (temp) {
          temp.col = "rgb(255,0,0)";
          temp = temp.prev;
        }
        return;
      }
      cell.visited = true;
      cell.val = cell.step;
      cell.col = "rgb(0,0,0)";

      cell.neighbors.forEach(neighbor_cell => {
        if (!neighbor_cell.visited) {
          if (this.q.findIndex(c => c === neighbor_cell) === -1) {
            neighbor_cell.step = cell.step + 1;
            neighbor_cell.prev = cell;
            let heustic = neighbor_cell.getHeustic(
              this.board[0].length,
              this.board.length
            );
            console.log(heustic);
            this.pQ.enqueue(neighbor_cell, heustic + cell.step);
          }
        }
      });
    } else {
      this.showUnvisited();
    }
  }
  showUnvisited() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (!this.board[i][j].visited) {
          this.board[i][j].val = "X";
        }
      }
    }
  }
  populationApproach() {
    if (this.populationCount === -1) {
      let num = prompt("How many times do you want to run?");
      if (parseInt(num) === NaN) {
        throw new Error("Not a Valid Number");
      }
      this.populationCount = parseInt(num) + 2;
      this.time = [];
      this.population = new Population(
        150,
        convertBoardToString(generateBestBoard(board_template)),
        0.05,
        board_template[0].length,
        board_template.length
      );
    }
    if (this.populationCount > 0) {
      let start = Date.now();
      this.population.naturalSelection();
      this.population.crossOver();
      this.population.displayOnHTML(this.time);
      this.populationCount--;
      this.time.push(Date.now() - start);
    } else if (this.populationCount === 0) {
      this.reset(this.population.getBestChromosome().board);
      board_template = this.population.getBestChromosome().board;
    } else {
    }
  }
  reset(updated_board) {
    let copy_of_board = [];
    if (!updated_board) {
      for (let i = 0; i < board_template.length; i++) {
        copy_of_board.push([]);
        for (let j = 0; j < board_template[i].length; j++) {
          copy_of_board[i][j] = new Cell(j, i, board_template[i][j]);
        }
      }
    } else {
      for (let i = 0; i < updated_board.length; i++) {
        copy_of_board.push([]);
        for (let j = 0; j < updated_board[i].length; j++) {
          copy_of_board[i][j] = new Cell(j, i, updated_board[i][j]);
        }
      }
    }

    this.board = copy_of_board;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (i !== this.board.length && j !== this.board[i].length) {
          this.board[i][j].addNeighbors(this.board, i, j);
        }
      }
    }

    this.curr_loc = [0, 0];
    let curr_cell = this.board[this.curr_loc[0]][this.curr_loc[1]];
    this.q = [curr_cell];
    this.pQ = new PriorityQueue();
    this.pQ.enqueue(curr_cell, 0);
    this.reached_goal = undefined;
    if (!updated_board) {
      this.hillCount = -1;
      this.populationCount = -1;
    }
  }
  makeItMostDifficult() {
    let new_board_template = Array(11)
      .fill()
      .map(() => new Array(11).fill(1));
    new_board_template[10][10] = "G";
    board_template = new_board_template;
    this.w = width / new_board_template[0].length;
    this.h = height / new_board_template.length;
    updateParagraph("");
    board.reset();
  }
}

/// Functions
function getRandomBoard(board, board_size) {
  for (let i = 0; i < board_size; i++) {
    for (let j = 0; j < board_size; j++) {
      let max_val = findMaxValue(j, i, board_size - 1, board_size - 1);
      board[i][j] = parseInt(max_val * Math.random()) + 1;
    }
  }
  board[board_size - 1][board_size - 1] = "G";
}
function randomizeBoard(board) {
  let y_max = board.length;
  let x_max = board[0].length;
  let random_y = parseInt(y_max * Math.random());
  let random_x = parseInt(x_max * Math.random());
  while (random_x === x_max - 1 && random_y === y_max - 1) {
    random_y = parseInt(y_max * Math.random());
    random_x = parseInt(x_max * Math.random());
  }
  let max_val = findMaxValue(random_x, random_x, x_max - 1, y_max - 1);
  board[random_y][random_x] = parseInt(max_val * Math.random()) + 1;
}
function findMaxValue(x, y, x_max, y_max) {
  let max_between_x_y = Math.max(x_max, y_max);
  let max = parseInt(max_between_x_y / 2);
  max = Math.max(max, x - 0, y - 0, x_max - x, y_max - y);
  return max;
}
function copy_board(board) {
  let copy_of_board = [];
  board.forEach(() => copy_of_board.push([]));
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      copy_of_board[i][j] = board[i][j];
    }
  }
  return copy_of_board;
}
function updateParagraph(p) {
  document.getElementById("detail-p").innerHTML = p;
}

function convertBoardToString(board) {
  return board
    .map(b => b.map(val => String.fromCharCode(val + 96)).join(""))
    .join("")
    .slice(0, -1);
}

function generateBestBoard(board) {
  let best_board = [];
  let y_max = board.length;
  let x_max = board[0].length;
  for (let i = 0; i < board.length; i++) {
    best_board.push([]);
  }

  for (let i = 0; i < y_max; i++) {
    for (let j = 0; j < x_max; j++) {
      best_board[i][j] = x_max - j - 1;
      if (j === x_max - 1) {
        best_board[i][j] = y_max - i - 1;
      }
    }
  }
  return best_board;
}
