class TicTacToe {
    constructor() {
        this.board = document.getElementById('gameBoard');
        this.restartButton = document.getElementById('restartButton');
        this.xCounter = document.getElementById('xCounter');
        this.oCounter = document.getElementById('oCounter');
        this.currentPlayer = 'X';
        this.gameBoard = Array(9).fill('');
        this.gameActive = true;
        this.xWins = 0;
        this.oWins = 0;

        this.initializeBoard();
        this.restartButton.addEventListener('click', () => this.restartGame());
    }

    initializeBoard() {
        this.board.innerHTML = '';
        this.board.addEventListener('click', event => this.handleCellClick(event));
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.index = i;
            this.board.appendChild(cell);
        }
        this.updateCounters();
    }

    handleCellClick(event) {
        const cell = event.target;
        const index = cell.dataset.index;

        if (cell.className.includes('cell') && !this.gameBoard[index] && this.gameActive) {
            this.gameBoard[index] = this.currentPlayer;
            cell.textContent = this.currentPlayer;

            if (this.checkWinner()) {
                alert(`Player ${this.currentPlayer} wins!`);
                this.currentPlayer === 'X' ? this.xWins++ : this.oWins++;
                this.updateCounters();
                this.gameActive = false;
            } else if (this.gameBoard.every(cell => cell !== '')) {
                alert('It\'s a draw!');
                this.gameActive = false;
            } else {
                this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return this.gameBoard[a] && this.gameBoard[a] === this.gameBoard[b] && this.gameBoard[a] === this.gameBoard[c];
        });
    }

    restartGame() {
        this.gameBoard.fill('');
        this.gameActive = true;
        this.currentPlayer = 'X';
        this.initializeBoard();
    }

    updateCounters() {
        this.xCounter.textContent = `X Wins: ${this.xWins}`;
        this.oCounter.textContent = `O Wins: ${this.oWins}`;
    }
}

new TicTacToe();
