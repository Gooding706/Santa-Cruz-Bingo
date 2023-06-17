// Define the bingo board as a two-dimensional array
const board = [
  ['B1', 'B2', 'B3', 'B4', 'B5'],
  ['I1', 'I2', 'I3', 'I4', 'I5'],
  ['N1', 'N2', 'FREE', 'N4', 'N5'],
  ['G1', 'G2', 'G3', 'G4', 'G5'],
  ['O1', 'O2', 'O3', 'O4', 'O5']
];

let selectedNumbers = [];

function randomizeGridText() {
  const words = ['Umbrella Man', 'Jimmy Panetta', 'Daddy Long Legs', 
                 'City Counsil Member', 'Pacific School Parent',   
                 'Bagelry Employee', 'Get a SuperSilver Coupon',
                 'Redwood Tree', 'Country Gentlemen', 
                 'Celebrity Lookalike', 'Jazz Player', 
                 'Dressed Up Statue', 'Banana Slug', 'Santa Cruz Dot',
                 'Hear A seal',
                ]; // Array of random words
  
  for(let i = 0; i < 5; i++){
    for(let j = 0; j < 5; j++){
      if(board[i][j] != 'FREE')
      board[i][j] = words[Math.floor(Math.random()*words.length)];
    }
  }
}




// Function to start the game
function startGame() {
  // Clear the selectedNumbers array
  selectedNumbers = [];

  randomizeGridText();
  // Generate and display the bingo board
  generateBoard();

  // Enable click event for cells
  enableCellClick();

  resetGame();

  document.getElementById('gamebutt').innerHTML = "Reset Game"
}

// Function to generate and display the bingo board
function generateBoard() {
  const boardContainer = document.getElementById('bingo-board');

  // Clear the previous board
  boardContainer.innerHTML = '';

  for (let row = 0; row < board.length; row++) {
    const tableRow = document.createElement('tr');

    for (let col = 0; col < board[row].length; col++) {
      const tableCell = document.createElement('td');
      tableCell.textContent = board[row][col];
      tableRow.appendChild(tableCell);
    }

    boardContainer.appendChild(tableRow);
  }
}

// Function to enable click event for cells
function enableCellClick() {
  const cells = document.querySelectorAll('#bingo-board td:not(.selected)');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      selectNumber(cell);
    });
  });
}

// Function to handle number selection
// Function to handle number selection
function selectNumber(cell) {
  // Check if the cell is already selected
  if (cell.classList.contains('selected')) {
    return;
  }

  // Add the number to selectedNumbers array
  selectedNumbers.push(cell.textContent);

  // Mark the cell as selected and fill it with red color
  cell.classList.add('selected');
  cell.style.backgroundColor = '#b34037';

  // Disable click event for the selected cell
  cell.removeEventListener('click', selectNumber);

  // Check if the player has won
  if (checkWin()) {
    alert("you win!!!")
  }
}

// Function to disable click event for cells
function disableCellClick() {
  const cells = document.querySelectorAll('#bingo-board td:not(.selected)');
  cells.forEach(cell => {
    cell.removeEventListener('click', selectNumber);
  });
}

// Function to check if the player has won
function checkWin() {
  const cells = Array.from(document.querySelectorAll('#bingo-board td.selected'));

  // Check rows
  for (let row = 0; row < board.length; row++) {
    let count = 0;
    for (let col = 0; col < board[row].length; col++) {
      if (cells.some(cell => cell.textContent === board[row][col])) {
        count++;
      }
    }
    if (count === board[row].length) {
      return true; // Winning condition met
    }
  }

  // Check columns
  for (let col = 0; col < board[0].length; col++) {
    let count = 0;
    for (let row = 0; row < board.length; row++) {
      if (cells.some(cell => cell.textContent === board[row][col])) {
        count++;
      }
    }
    if (count === board.length) {
      return true; // Winning condition met
    }
  }

  // Check diagonal from top-left to bottom-right
  let count = 0;
  for (let i = 0; i < board.length; i++) {
    if (cells.some(cell => cell.textContent === board[i][i])) {
      count++;
    }
  }
  if (count === board.length) {
    return true; // Winning condition met
  }

  // Check diagonal from top-right to bottom-left
  count = 0;
  for (let i = 0; i < board.length; i++) {
    if (cells.some(cell => cell.textContent === board[i][board.length - 1 - i])) {
      count++;
    }
  }
  if (count === board.length) {
    return true; // Winning condition met
  }

  return false; // Winning condition not met
}


// Function to reset the game
function resetGame() {
  // Clear the selectedNumbers array
  selectedNumbers = [];

  // Remove the selected class from all cells
  const cells = document.querySelectorAll('#bingo-board td');
  cells.forEach(cell => {
    cell.classList.remove('selected');
    cell.style.backgroundColor = '#121212';
  });
}


