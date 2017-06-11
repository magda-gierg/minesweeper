document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
/*var board = {cells:[
  {row:0, col:0, isMine:true, isMarked:false, hidden:true, surroundingMines: 0},
  {row:0, col:1, isMine:false, isMarked:false, hidden:true, surroundingMines: 0},
  {row:0, col:2, isMine:true, isMarked:false, hidden:true, surroundingMines: 0},
  {row:1, col:0, isMine:false, isMarked:false, hidden:true, surroundingMines: 0},
  {row:1, col:1, isMine:false, isMarked:false, hidden:true, surroundingMines: 0},
  {row:1, col:2, isMine:false, isMarked:false, hidden:true, surroundingMines: 0},
  {row:2, col:0, isMine:true, isMarked:false, hidden:true, surroundingMines: 0},
  {row:2, col:1, isMine:false, isMarked:false, hidden:true, surroundingMines: 0},
  {row:2, col:2, isMine:false, isMarked:false, hidden:true, surroundingMines: 0}
]};*/
//var board = createBoard(3);
function startGame () {
  document.getElementById("board").innerHTML="";//Clean the board
  var boardSize = document.getElementById("mySelect").value;//Set the board size
   board = createBoard(boardSize);
  for (i=0; i< board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  document.getElementById('myBtn').addEventListener('click', startGame)
  document.getElementById('board').addEventListener('click', checkForWin);
  document.getElementById('board').addEventListener('contextmenu', checkForWin);
  // Don't remove this function call: it makes the game work!

  lib.initBoard()
}


// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?

function checkForWin () {

  for (i=0; i< board.cells.length; i++) {

    if (board.cells[i].isMine === true && board.cells[i].isMarked === false) {
      return;
    }
    else if (board.cells[i].isMine === false && board.cells[i].hidden === true) {
      return;
    }
  }
  lib.displayMessage('You win!');
  


  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  //  var cell = board.cells[i]
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (j=0; j< surrounding.length; j++) {
    if (surrounding[j].isMine === true) {
      count++;
    }
  }
  return count;
}

function createBoard (size) {
var board = {cells:[]};
for (x=0; x< size; x++) {
  for (y=0; y< size; y++) {
    var random_boolean = Math.random() >= 0.7;
    board.cells.push({row:x, col:y, isMine:random_boolean, isMarked:false, hidden:true})
  }
}
  return board;
}
