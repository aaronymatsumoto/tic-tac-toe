const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getField = (index) => board[index];
  const setField = (index, value) => board[index] = value;
  const newBoard = () => ["", "", "", "", "", "", "", "", ""];
  return {board, getField, setField, newBoard};
})();

const player = (symbol) => {
  return {symbol};
}

const displayBoard = () => {
  const boardContainer = document.getElementById('boardContainer');
  const place = (field) => {
    if(gameBoard.getField(field) === ""){
      gameBoard.setField(field, "O"); //update this
      clearBoard();
      displayBoard();
    }
    else {
      return;
    }
  }

  for (let i = 0; i < 9; i++){
    let field = document.createElement("div");
		field.classList = "field";
    field.id = `field${i}`;
    field.innerHTML = gameBoard.getField(i);
    field.onclick = function () {
      place(i);
    }
		boardContainer.appendChild(field);
  }
}


//removes all board elements
const clearBoard = () => {
  const allFields = document.getElementsByClassName('field');
  while(allFields[0]) {
    allFields[0].parentNode.removeChild(allFields[0]);
  }
}



// to play the game
const displayController = (() => {
  //player one enter name
  const playerOneName = "Aaron";
  const playerOne = player("X", playerOneName);
  //player two enter name or select AI
  const playerTwoName = "Trinh";
  const playerTwo = player("O", playerOneName);
  //randomize who goes first
  //for now player 1 goes first
  let currentTurn = playerOneName;

  //change turns

  gameBoard.setField(0, "X");
  console.log(gameBoard.board);
  console.log(playerOne.symbol);

  displayBoard();
})();