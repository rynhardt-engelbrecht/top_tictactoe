# Tic-Tac-Toe

This project is a simple browser implementation of the
classic [Tic-Tac-Toe](https://en.wikipedia.org/wiki/Tic-tac-toe) game.
As per the [Project: Tic-Tac-Toe](https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe) lesson in The Odin Project's Full Stack Javascript curriculum.
The goal of this project was to make use of factory functions and modular JS,
and using as few global variables as possible, to make this program.

As a minor side-challenge, I completed this program using a 1-Dimensional array to
represent the board instead of a 2-Dimensional array. This made it much easier to
check squares that are diagonally adjacent, but slightly harder to check squares that
were vertically or horizontally adjacent. But, the row index and column index of any square
could be accessed like so:

 - Row index: Math.trunc(i / 3)
 - Column index: i % 3

Although this wasn't used at all or necessary, just some stupid math because I decided to
do a pointless little challenge. It was fun to figure out though.
