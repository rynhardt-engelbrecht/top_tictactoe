const renderer = function(board) {
  console.log(board);
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
