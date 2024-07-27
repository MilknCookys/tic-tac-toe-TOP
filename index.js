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

  const placeToken = (index, token) => {
    board[index].setState(token);
  };

  const displayBoard = () => {
    for (cell of board) {
      console.log(cell.getState());
    }
  };

  return { placeToken, displayBoard };
})();

const Gamecontroller = (function () {
  const player1 = {
    token: "X",
  };
  const player2 = {
    token: "O",
  };
  const players = [player1, player2];
  let activePlayer = players[0];

  const getActivePlayer = () => {
    return activePlayer;
  };

  const setActivePlayer = () => {
    activePlayer === players[0]
      ? (activePlayer = players[1])
      : (activePlayer = players[0]);
  };

  const playRound = (index) => {
    Gameboard.placeToken(index, Gamecontroller.getActivePlayer().token);

    // Check for win

    Gamecontroller.setActivePlayer();
  };

  return { getActivePlayer, setActivePlayer, playRound };
})();

const domLink = (function () {
  const gameboard = document.querySelector("#gameboard");

  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell) => {
    cell.addEventListener("click", (event) => {
      const token = "X";

      cell.textContent = token;

      document.appendChild(cell);
    });
  });

  console.log(gameboard);
})();

function Cell() {
  let state = ".";

  const getState = () => {
    return state;
  };

  const setState = (newState) => {
    state = newState;
  };

  return { getState, setState };
}

// Gameboard.placeToken(3, Gamecontroller.getActivePlayer().token);

// Gameboard.placeToken(0, Gamecontroller.getActivePlayer().token);

// Gameboard.placeToken(8, Gamecontroller.getActivePlayer().token);

// Gameboard.placeToken(5, Gamecontroller.getActivePlayer().token);

// Gameboard.placeToken(1, Gamecontroller.getActivePlayer().token);

// Gameboard.displayBoard();

Gamecontroller.playRound(3);

Gamecontroller.playRound(0);

Gameboard.displayBoard();
