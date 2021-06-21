const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getField = (index) => board[index];
  const setField = (index, value) => board[index] = value;
  const newBoard = () => {
    for(let i = 0; i < board.length; i++) {
      board[i] = "";
    }};
  return {board, getField, setField, newBoard};
})();

const player = (symbol, name) => {
  return {symbol, name};
}

// to play the game
const displayController = (() => {

  //player one enter name
  const playerOne = player("X", "Aaron");
  //player two enter name or select AI (make sure not same name and not "")
  const playerTwo = player("O", "Trinh");
  let currentTurn = playerOne.name;
  let winner = "";

  // gets the symbol of the current turn
  const getCurrentTurn = (name) => {
    if (name === playerOne.name) {
      return playerOne.symbol;
    }
    else {
      return playerTwo.symbol;
    }
  }

  //change turns
  const changeTurn = (name) => {
    if (name === playerOne.name) {
      currentTurn = playerTwo.name;
    }
    else {
      currentTurn = playerOne.name;
    }
  }

  // current Turn status display
  const displayTurn = (name) => {
    const turn = document.getElementById('turn');
    turn.innerHTML = `${name}'s turn`
  }

  //removes all board elements
  const clearBoard = () => {
    const allFields = document.getElementsByClassName('field');
    while(allFields[0]) {
      allFields[0].parentNode.removeChild(allFields[0]);
    }
    const allButtons = document.getElementsByClassName('buttons');
    while(allButtons[0]) {
      allButtons[0].parentNode.removeChild(allButtons[0]);
    }
  }

  // logic to check for winner
  /* 0 1 2
     3 4 5
     6 7 8 */
  const checkWinner = () => {
    const allEqual = arr => arr.every(val => val === arr[0]);
    const win1 = [gameBoard.getField(0), gameBoard.getField(1), gameBoard.getField(2)];
    const win2 = [gameBoard.getField(3), gameBoard.getField(4), gameBoard.getField(5)];
    const win3 = [gameBoard.getField(6), gameBoard.getField(7), gameBoard.getField(8)];
    const win4 = [gameBoard.getField(0), gameBoard.getField(3), gameBoard.getField(6)];
    const win5 = [gameBoard.getField(1), gameBoard.getField(4), gameBoard.getField(7)];
    const win6 = [gameBoard.getField(2), gameBoard.getField(5), gameBoard.getField(8)];
    const win7 = [gameBoard.getField(0), gameBoard.getField(4), gameBoard.getField(8)];
    const win8 = [gameBoard.getField(2), gameBoard.getField(4), gameBoard.getField(6)];
    const tie = "Tie";
    if ((allEqual(win1) && !win1.includes("")) || 
        (allEqual(win2) && !win2.includes("")) || 
        (allEqual(win3) && !win3.includes("")) || 
        (allEqual(win4) && !win4.includes("")) || 
        (allEqual(win5) && !win5.includes("")) || 
        (allEqual(win6) && !win6.includes("")) || 
        (allEqual(win7) && !win7.includes("")) || 
        (allEqual(win8) && !win8.includes(""))) {
      console.log(currentTurn);
      winner = currentTurn;
      return currentTurn;
    }
    else if (!gameBoard.board.includes("")){
      console.log(tie);
      return tie;
    }
  }
  const displayWinner = (winner) => {
    const turn = document.getElementById('turn');
    if (winner === "Tie") {
      turn.innerHTML = "It's a Tie!";
    }
    else {
      turn.innerHTML = `${winner} Wins! Congrats!`
    }
  }

  const resetGame = () => {
    gameBoard.newBoard();
    winner = "";
    clearBoard();
    displayTurn(currentTurn);
    displayBoard();
  }

  // creates the board 
  const displayBoard = () => {
    const boardContainer = document.getElementById('boardContainer');
    const newGameButtons = () => {
      const newGameContainer = document.getElementById('newGame');
      let btnRematch = document.createElement("button");
      btnRematch.innerHTML = "Rematch";
      btnRematch.classList = "buttons";
      btnRematch.id = "btnRematch";
      btnRematch.onclick = function () {
        resetGame();
      };
      newGameContainer.appendChild(btnRematch);
    }

    const place = (field) => {
      if(gameBoard.getField(field) === ""){
        gameBoard.setField(field, getCurrentTurn(currentTurn));
        clearBoard();
        if(checkWinner() === currentTurn){
          displayWinner(currentTurn);
          displayBoard();
          newGameButtons();
          return;
        }
        else if(checkWinner() === "Tie"){
          displayWinner("Tie");
          displayBoard();
          newGameButtons();
          return;
        }
        else{
          changeTurn(currentTurn);
          displayTurn(currentTurn);
          displayBoard();
        }
      }
    }
  
    for (let i = 0; i < 9; i++){
      let field = document.createElement("div");
      field.classList = "field";
      field.id = `field${i}`;
      field.innerHTML = gameBoard.getField(i);
      if (winner === ""){
        field.onclick = function () {
          place(i);
        }
      }
      boardContainer.appendChild(field);
    }
  }

  displayBoard();
  displayTurn(currentTurn);

  //if end, display a button that shows "New game"
  

})();