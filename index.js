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
      if (indexNum >= 0 && indexNum <= 2) {
        return (
          Gameboard.getCellState(0) === Gameboard.getCellState(1) &&
          Gameboard.getCellState(0) === Gameboard.getCellState(2)
        );
      } else if (indexNum >= 3 && indexNum <= 5) {
        return (
          Gameboard.getCellState(3) === Gameboard.getCellState(4) &&
          Gameboard.getCellState(3) === Gameboard.getCellState(5)
        );
      } else if (indexNum >= 6 && indexNum <= 8) {
        return (
          Gameboard.getCellState(6) === Gameboard.getCellState(7) &&
          Gameboard.getCellState(6) === Gameboard.getCellState(8)
        );
      } else {
        return false;
      }
    }

    function checkCol(indexNum) {
      if (indexNum >= 0 && indexNum <= 6) {
        return (
          Gameboard.getCellState(0) === Gameboard.getCellState(3) &&
          Gameboard.getCellState(0) === Gameboard.getCellState(6)
        );
      } else if (indexNum >= 1 && indexNum <= 7) {
        return (
          Gameboard.getCellState(1) === Gameboard.getCellState(4) &&
          Gameboard.getCellState(1) === Gameboard.getCellState(7)
        );
      } else if (indexNum >= 2 && indexNum <= 8) {
        return (
          Gameboard.getCellState(2) === Gameboard.getCellState(5) &&
          Gameboard.getCellState(2) === Gameboard.getCellState(8)
        );
      } else {
        return false;
      }
    }

    function checkDiag(indexNum) {
      if (indexNum % 2 !== 0) {
        return false;
      }

      if (
        Gameboard.getCellState(0) === Gameboard.getCellState(4) &&
        Gameboard.getCellState(0) === Gameboard.getCellState(8) &&
        Gameboard.getCellState(0) !== "."
      ) {
        return true;
      }

      if (
        Gameboard.getCellState(2) === Gameboard.getCellState(4) &&
        Gameboard.getCellState(2) === Gameboard.getCellState(6) &&
        Gameboard.getCellState(2) !== "."
      ) {
        return true;
      }

      return false;
    }

    if (
      checkRow(indexNum) === true ||
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

  const playRound = (index, domCell) => {
    Gameboard.setToken(index, Gamecontroller.getActivePlayer().token);

    // Check for win

    domCell.textContent = Gameboard.getCellState(index);

    Gamecontroller.setActivePlayer();

    Gameboard.displayBoard();

    if (Gameboard.checkWin(index) === true) {
      DomLink.drawWinner(getActivePlayer().name);
    }

    if (Gameboard.checkTie() === true) {
      DomLink.drawTie();
    }
  };

  return { getActivePlayer, setActivePlayer, playRound };
})();

const DomLink = (function () {
  for (let i = 0; i < 9; i++) {
    let cell = document.getElementById(`cell${i}`);
    cell.addEventListener("click", cellClick);
  }

  function cellClick(event) {
    index = event.target.getAttribute("data-id");

    Gamecontroller.playRound(index, event.target);

    event.target.removeEventListener("click", cellClick);
  }

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

  return { drawWinner, drawTie };
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
