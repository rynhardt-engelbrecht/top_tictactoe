/*
Factory function wrapped inside an IIFE to create a Gameboard object,
containing a board array used to store the contents of the game board,
and two methods to be able to update the board or get the contents of the board.
*/
const board = (function createGameboard () {
  /*
  rowIndex = Math.trunc(i);
  colIndex = i % 3;
  */
  const board = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ];

  const updateBoard = function(index, num) {
    if (index < board.length && index >= 0) {
      board[index] = num;
    } else {
      console.error('Error: Index out of range.');
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

      return allEquals(row);
    }
  };
  const checkCols = function () {
    for (let i = 0; i <= 2; i++) {

      const row = [];

      for (let j = 0; j <= 6; j += 3) {
        const index = i + j;
        row.push(boardObj.board[index]);
      }

      return allEquals(row);
    }
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
  const allEquals = function (array) {
    return array.every((val) => {
      return (val === array[0] && val != 0);
    });
  };

  return { boardObj, players, gameWon };
})();
