const winChecker = (function () {
  const gameWon = function (boardObj) {
    return checkRows(boardObj) || checkCols(boardObj) || checkDiagonals(boardObj);
  };
  /*
  Below is stupid math because I decided to use a 1-Dimensional array to represent
  a 2-Dimensional board.
  */
  const checkRows = function (boardObj) {
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
  const checkCols = function (boardObj) {
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
  const checkDiagonals = function (boardObj) {
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

  return { gameWon };
})();
