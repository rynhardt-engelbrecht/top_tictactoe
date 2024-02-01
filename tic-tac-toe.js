/*
Factory function wrapped inside an IIFE to create a Gameboard object,
containing a board array used to store the contents of the game board,
and two methods to be able to update the board or get the contents of the board.
*/
const squares = document.querySelectorAll('.board-container .square');
const startButton = document.querySelector('.start-button');
const restartButton = document.querySelector('.restart-button');
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

  const resetBoard = function() {
    for (let i = 0; i < board.length; i++) {
      board[i] = 0;
    }
  };

  return { board, updateBoard, resetBoard };
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

  const clickHandler = e => {
    const index = e.target.id.slice(-1);
    const response = boardObj.updateBoard(index, getActivePlayer().getNum());

    if (response != null) {
      renderer(boardObj);
      if (winChecker.gameWon(boardObj)) {
        winSequence();
      } else if (winChecker.gameTied(boardObj)) {
        alert('The game resulted in a tie!');

        restartButton.classList.remove('hidden');
      } else {
        updateActivePlayer();
      }
    }
  }

  function removeClickListeners() {
    squares.forEach(square => {
        square.removeEventListener('click', clickHandler);
    });
  }

  const winSequence = function () {
    removeClickListeners();
    console.log('Hooray! The game is over!');

    const winningNum = getActivePlayer().getNum();
    const winningPlayer = document.querySelector(`#player-${winningNum}`);
    alert(`${winningPlayer.value} wins the game!`);

    restartButton.classList.remove('hidden');
  };
  const startSequence = function (e) {
    e.preventDefault();

    const playerOne = document.querySelector('#player-1');
    const playerTwo = document.querySelector('#player-2');

    if (playerOne.value === '' || playerTwo.value === '') {
      alert('Please fill in both player names.');
      return false;
    } else {
      boardObj.resetBoard();
      renderer(boardObj);

    squares.forEach(square => {
      square.addEventListener('click', gameController.clickHandler);
    });

    gameController.players[0].setName(playerOne.value);
    gameController.players[1].setName(playerTwo.value);

    startButton.classList.add('hidden');
    restartButton.classList.add('hidden');
    }

  }

  return { boardObj, players, getActivePlayer, clickHandler, winSequence, startSequence };
})();

startButton.addEventListener('click', e => gameController.startSequence(e));
restartButton.addEventListener('click', e => gameController.startSequence(e));
