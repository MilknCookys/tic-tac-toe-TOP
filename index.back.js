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

  const resetBoard = () => {
    board = [
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
  };

  const displayBoard = () => {
    for (cell of board) {
      console.log(cell.getState());
    }
  };

  function setToken(index, token) {
    board[index].setState(token);
  }

  const checkWin = () => {
    checkRow(0);
    checkRow(1);
    checkRow(2);
    checkRow(3);
    checkRow(4);
    checkRow(5);
    checkRow(6);
    checkRow(7);
    checkRow(8);
  };

  const checkRow = (startIndex) => {
    if (!(startIndex === 0 || startIndex === 3 || startIndex === 6)) {
      console.log(`Index Error: ${startIndex}`);
    } else {
      tokenValue = board[startIndex].getState();

      if (
        board[startIndex].getState() === tokenValue &&
        board[startIndex + 1].getState() === tokenValue &&
        board[startIndex + 2].getState() === tokenValue
      ) {
        console.log("Round win");
      } else {
        console.log("Round not won");
      }
    }
  };

  return { displayBoard, setToken, checkWin };
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

  const getActivePlayer = () => {
    return activePlayer;
  };

  function startGame() {
    while (true) {}
  }

  return { getActivePlayer };
}

function Cell() {
  let state = ".";

  const setState = (newState) => {
    state = newState;
  };

  const getState = () => {
    return state;
  };

  return { getState, setState };
}

Gameboard.displayBoard();

Gameboard.checkWin();

Gameboard.setToken(0, "X");
Gameboard.setToken(1, "X");
Gameboard.setToken(2, "X");

console.log("----------------------------------------------");

Gameboard.displayBoard();

Gameboard.checkWin();

console.log("----------------------------------------------");

Gameboard.setToken(0, "O");
Gameboard.setToken(1, "X");
Gameboard.setToken(2, "O");

Gameboard.displayBoard();

Gameboard.checkWin();
