const board = document.getElementById('gameBoard');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Initialize the game board
function initializeBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
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

// Start the game
initializeBoard();
