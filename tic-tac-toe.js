/*
Factory function wrapped inside an IIFE to create a Gameboard object,
containing a board array used to store the contents of the game board,
and two methods to be able to update the board or get the contents of the board.
*/
const board = (function createGameboard () {
  /*
  rowIndex = Math.trunc(i / 3);
  colIndex = i % 3;
  */
  const board = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ];

  const updateBoard = function(index, num) {
    if (index >= board.length && index < 0) {
      console.error('Error: Index out of range.', `Input: ${index}`);
      return null;
    } else if (board[index] != 0) {
      console.error('Error: Index already occupied.', `Input: ${index}`);
      return null;
    } else {
      board[index] = num;
    }

    return board;
  };

  return { board, updateBoard };
})();

/*
Function to create player objects to interface with the Gameboard object
*/
function createPlayer (num) {
  const getName = () => this.name;
  const setName = function(name) {
    this.name = name;
  }
  const getNum = () => num;
  const getMove = (index) => index;

  return { getName, setName, getNum, getMove };
}

const gameController = (function createGameController () {
  const boardObj = board;
  const players = [createPlayer(1), createPlayer(2)];
  let activePlayer = players[0];
  const getActivePlayer = () => activePlayer;
  const updateActivePlayer = function() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const squares = document.querySelectorAll('.board-container .square');
  const clickHandler = e => {
    const index = e.target.id.slice(-1);
    const response = boardObj.updateBoard(index, getActivePlayer().getNum());

    if (response != null) {
      renderer(boardObj);
      if (gameWon()) {
        removeClickListeners();
        console.log('Hooray! The game is over!');

        (function() {
          const scoreDisplay = document.querySelector('.score-container');
          scoreDisplay.textContent = `Player ${getActivePlayer().getNum()} won!`
        })();
      } else {
        updateActivePlayer();
      }
    }
  }

  squares.forEach(square => {
    square.addEventListener('click', clickHandler);
  });

  function removeClickListeners() {
    squares.forEach(square => {
        square.removeEventListener('click', clickHandler);
    });
  }

  const gameWon = function () {
    return checkRows() || checkCols() || checkDiagonals();
  };
  /*
  Below is stupid math because I decided to use a 1-Dimensional array to represent
  a 2-Dimensional board.
  */
  const checkRows = function () {
    for (let i = 0; i <= 6; i += 3) {

      const row = [];

      for (let j = 0; j <= 2; j++) {
        const index = i + j;
        row.push(boardObj.board[index]);
      }

      if (allEquals(row)) {
        return true;
      };
    }

    return false;
  };
  const checkCols = function () {
    for (let i = 0; i <= 2; i++) {

      const row = [];

      for (let j = 0; j <= 6; j += 3) {
        const index = i + j;
        row.push(boardObj.board[index]);
      }

      if (allEquals(row)) {
        return true;
      };
    }

    return false
  };
  const checkDiagonals = function () {
    let row = [];

    for (let i = 0; i <= 8; i += 4) {
      row.push(boardObj.board[i]);
    }

    if (allEquals(row)) {
      return true
    }

    row = [];

    for (let j = 2; j <= 6; j += 2) {
      row.push(boardObj.board[j]);
    }

    return allEquals(row);
  };
  function allEquals (array) {
    return array.every((val) => {
      return (val === array[0] && val != 0);
    });
  }

  return { boardObj, players, getActivePlayer, gameWon };
})();

const renderer = function(board) {
  board.board.forEach((value, index, array) => {
    const square = document.getElementById(`square-${index}`);
    const symbol = getSymbol(value);

    square.textContent = symbol;
  });
  function getSymbol (num) {
    if (num === 0) {
      return '';
    } else if (num === 1) {
      return 'X';
    } else {
      return 'O';
    }
  };

  return { getSymbol };
};
