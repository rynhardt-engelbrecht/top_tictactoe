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

  const getBoard = () => board;
  const updateBoard = function(index, symbol) {
    if (index < board.length && index >= 0) {
      board[index] = symbol;
    } else {
      console.error('Error: Index out of range.');
    }

    return board;
  };

  return { getBoard, updateBoard };
})();

// function createPlayer (name, symbol) {
//   return { name, symbol }
// }

// function createGame (boardObj, players) {
//   return { boardObj, players }
// }
