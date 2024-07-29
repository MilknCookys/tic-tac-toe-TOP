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

  const setToken = (index, token) => {
    board[index].setState(token);
  };

  const displayBoard = () => {
    for (cell of board) {
      console.log(cell.getState());
    }
  };

  const getCellState = (index) => {
    return board[index].getState();
  };

  const checkWin = (index) => {
    indexNum = Number(index);

    function checkRow(indexNum) {
      let row = Math.floor(indexNum / 3) * 3;

      return (
        Gameboard.getCellState(row) === Gameboard.getCellState(row + 1) &&
        Gameboard.getCellState(row) === Gameboard.getCellState(row + 2)
      );
    }

    function checkCol(indexNum) {
      let col = indexNum % 3;

      return (
        Gameboard.getCellState(col) === Gameboard.getCellState(col + 3) &&
        Gameboard.getCellState(col) === Gameboard.getCellState(col + 6)
      );
    }

    function checkDiag(indexNum) {
      if (indexNum % 4 === 0) {
        return (
          Gameboard.getCellState(0) === Gameboard.getCellState(4) &&
          Gameboard.getCellState(0) === Gameboard.getCellState(8)
        );
      } else if (indexNum % 2 === 0) {
        return (
          Gameboard.getCellState(2) === Gameboard.getCellState(4) &&
          Gameboard.getCellState(2) === Gameboard.getCellState(6)
        );
      } else {
        return false;
      }
    }

    if (
      checkRow(indexNum) === true || // Why is this indexNum ??
      checkCol(indexNum) === true ||
      checkDiag(indexNum) === true
    ) {
      console.log("Win!");
      return true;
    } else {
      console.log("No win!");
      return false;
    }
  };

  const checkTie = () => {
    let checkArray = [];

    for (let i = 0; i < 9; i++) {
      checkArray.push(Gameboard.getCellState(i));
    }
    return checkArray.includes(".") === true ? false : true;
  };

  return {
    setToken,
    resetBoard,
    displayBoard,
    getCellState,
    checkWin,
    checkTie,
  };
})();

const Gamecontroller = (function () {
  const player1 = {
    name: "Bob",
    token: "X",
  };
  const player2 = {
    name: "Marty",
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

  const resetActivePlayer = () => {
    activePlayer = players[0];
  };

  const resetGame = () => {
    for (let i = 0; i < 9; i++) {
      let cell = document.getElementById(`cell${i}`);
      cell.textContent = "";
    }

    Gameboard.resetBoard();
    DomLink.removeResult();
    DomLink.placeEventListeners();
    Gamecontroller.resetActivePlayer();

    console.log("Resetting game...");
  };

  const playRound = (index, domCell) => {
    Gameboard.setToken(index, Gamecontroller.getActivePlayer().token);

    domCell.textContent = Gameboard.getCellState(index);

    Gamecontroller.setActivePlayer();

    Gameboard.displayBoard();

    if (Gameboard.checkWin(index) === true) {
      DomLink.drawWinner(getActivePlayer().name);
      DomLink.removeEventListeners();
    } else if (Gameboard.checkTie() === true) {
      DomLink.drawTie();
    }
  };

  return {
    getActivePlayer,
    setActivePlayer,
    resetActivePlayer,
    resetGame,
    playRound,
  };
})();

const DomLink = (function () {
  for (let i = 0; i < 9; i++) {
    let cell = document.getElementById(`cell${i}`);
    cell.addEventListener("click", cellClick);
  }

  const placeEventListeners = () => {
    for (let i = 0; i < 9; i++) {
      let cell = document.getElementById(`cell${i}`);
      cell.addEventListener("click", cellClick);
    }
  };

  function cellClick(event) {
    index = event.target.getAttribute("data-id");

    Gamecontroller.playRound(index, event.target);

    event.target.removeEventListener("click", cellClick);
  }

  const removeEventListeners = () => {
    for (let i = 0; i < 9; i++) {
      let cell = document.getElementById(`cell${i}`);
      cell.removeEventListener("click", cellClick);
    }
  };

  const drawWinner = (winner) => {
    const gameManagement = document.querySelector("#gameManagement");
    const resultText = document.querySelector("#result");

    resultText.textContent = `${winner} wins!`;

    gameManagement.appendChild(resultText);
  };

  const drawTie = () => {
    const gameManagement = document.querySelector("#gameManagement");
    const resultText = document.querySelector("#result");

    resultText.textContent = `Tie!`;

    gameManagement.appendChild(resultText);
  };

  const removeResult = () => {
    const resultText = document.querySelector("#result");
    resultText.textContent = "";
    resultText.parentElement.removeChild("resultText");
  };

  const btn = document.querySelector("button");

  console.log({ btn });

  btn.addEventListener("click", Gamecontroller.resetGame);

  return {
    placeEventListeners,
    removeEventListeners,
    drawWinner,
    drawTie,
    removeResult,
  };
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
