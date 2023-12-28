const board = document.getElementById('gameBoard');
const restartButton = document.getElementById('restartButton');
const xCounter = document.getElementById('xCounter');
const oCounter = document.getElementById('oCounter');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xWins = 0;
let oWins = 0;

// Initialize the game board
function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
    restartButton.addEventListener('click', restartGame);
    updateCounters();
}

// Handle cell click event
function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');

    // Check if the cell is already occupied or the game is over
    if (!gameBoard[index] && gameActive) {
        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            currentPlayer === 'X' ? xWins++ : oWins++;
            updateCounters();
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            alert('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Restart the game
function restartGame() {
    // Clear the game board
    board.innerHTML = '';
    gameBoard = Array(9).fill('');
    gameActive = true;
    currentPlayer = 'X';

    // Re-initialize the game board
    initializeBoard();
}

// Update X and O counters
function updateCounters() {
    xCounter.textContent = `X Wins: ${xWins}`;
    oCounter.textContent = `O Wins: ${oWins}`;
}

// Start the game
initializeBoard();
