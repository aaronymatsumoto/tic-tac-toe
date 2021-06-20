const gameBoard = (() => {
  const board = ["", "X", "O", "3", "4", "5", "6", "7", "8"];
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
  for (let i = 0; i < 9; i++){
    let field = document.createElement("div");
		field.classList = "field";
    field.id = `field${i}`;
    field.innerHTML = gameBoard.getField(i);
		boardContainer.appendChild(field);
  }
  console.log(`done display board`);
}

/*
const place = (field) => {

}
*/

//console.log(gameBoard.getField(4));
gameBoard.setField(0, "X");
console.log(gameBoard.board);

const playerOne = player("X");
const playerTwo = player("O");
console.log(playerOne.symbol);

displayBoard();
