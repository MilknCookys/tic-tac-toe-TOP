const prompt = require("prompt");

const Gameboard = (function () {
  let board = [
    Cell(),
    Cell(),
    Cell(),
    Cell(),
    Cell(),
    Cell(),
    Cell(),
    Cell(),
    Cell(),
  ];

  const displayBoard = () => {
    for (cell of board) {
      console.log(cell);
      console.log(cell.getState());
    }
  };

  function setToken(index, token) {
    board[index].setState(token);
  }

  return { displayBoard, setToken };
})();

function gameController() {
  let activePlayer = players[0];

  const players = [
    (player1 = {
      token: "X",
    }),
    (player2 = {
      token: "O",
    }),
  ];

  function startGame() {
    while (true) {}
  }
}

function Cell() {
  let state = "";

  const setState = (newState) => {
    state = newState;
  };

  const getState = () => {
    return state;
  };

  return { getState, setState };
}

Gameboard.displayBoard();

Gameboard.setToken(3, "X");

console.log("----------------------------------------------");

Gameboard.displayBoard();

Gameboard.setToken(1, "O");

console.log("----------------------------------------------");

Gameboard.displayBoard();
