let w, h;
let curr_loc;
let q;
let board;
let running_choice = 1;
let algorithm_choice = 0;
let canvas;

function setup() {
  canvas = createCanvas(750, 750);
  canvas.parent("sketch-holder");
  board = new Board(width, height);
  curr_loc = [0, 0];
  q = [];
  let selected_item = document.getElementById(
    running_choice === 0 ? "btn-manual" : "btn-auto"
  );
  selected_item.classList.add("active");
}

function draw() {
  background(255);
  board.drawBoard();
  if (running_choice === 1) {
    runCurrentSelectedFunction();
  }
}
function mouseClicked() {
  if (running_choice === 0) {
    runCurrentSelectedFunction();
  }
}

function setAlgorithmChoice(num) {
  algorithm_choice = num;
  board.reset();
}

function onAutoClick() {
  running_choice = 1;
  let selected_item = document.getElementById("btn-auto");
  let unselected_item = document.getElementById("btn-manual");
  selected_item.classList.add("active");
  unselected_item.classList.remove("active");
  board.reset();
}

function onManualClick() {
  running_choice = 0;
  let selected_item = document.getElementById("btn-manual");
  let unselected_item = document.getElementById("btn-auto");
  selected_item.classList.add("active");
  unselected_item.classList.remove("active");
  board.reset();
}
function runCurrentSelectedFunction() {
  switch (algorithm_choice) {
    case 0: {
      board.bfs();
      break;
    }
    case 1: {
      board.hillClimbing();
      break;
    }
    case 2: {
      board.shortestPathFirstSearch();
      break;
    }
    case 3: {
      board.aStarSearch();
      break;
    }
    case 4: {
      board.populationApproach();
      break;
    }
  }
}
function randomizeTheCurrentBoard() {
  board.generateRandomBoard();
}

function mostChallengingBoard() {
  board.makeItMostDifficult();
}
