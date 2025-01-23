const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let timerInterval; 
let timerSeconds = 1; 

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//#region "Обработка ходов"
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

window.addEventListener('load', () => {
    const savedGameState = JSON.parse(localStorage.getItem('gameState'));
    const savedCurrentPlayer = localStorage.getItem('currentPlayer');
    const savedGameActive = localStorage.getItem('gameActive');
    
    if (savedGameState) {
        gameState = savedGameState;
        currentPlayer = savedCurrentPlayer || 'X';
        gameActive = savedGameActive === 'true';
        render();
    }
});
//#endregion

//#region "Методы управления игрой"
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    if (timerInterval === undefined) {
        startTimer();
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.style.backgroundImage = currentPlayer === 'X' ? "url('Image/Cross.png')" : "url('Image/Zero.png')";
    clickedCell.classList.add('taken');

    checkResult();
}

function checkResult() {
    let roundWon = winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });

    if (roundWon) {
        gameActive = false;
        clearInterval(timerInterval); 
        showMessage("Победа");

        const winningCombination = winningConditions.find(condition => {
            const [a, b, c] = condition;
            return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        });

        if (winningCombination) {
            winningCombination.forEach(index => {
                cells[index].style.backgroundColor = currentPlayer === 'X' ? 'rgba(207, 237, 230, 1)' : 'rgba(243, 187, 208, 1)';
            });
        }

        return;
    }

    if (!gameState.includes('')) {
        gameActive = false;
        clearInterval(timerInterval); 
        showMessage("Ничья!");
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateLocalStorage();
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState.fill('');
    timerSeconds = 0; 
    clearInterval(timerInterval); 
    timerInterval = undefined; 

    cells.forEach(cell => {
        cell.style.backgroundImage = '';
        cell.classList.remove('taken');
        cell.style.backgroundColor = ''; 
    });

    document.querySelector('.timer').innerText = '0:00'; 

    updateLocalStorage();
    closeModal();
}

function updateLocalStorage() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
    localStorage.setItem('currentPlayer', currentPlayer);
    localStorage.setItem('gameActive', gameActive);
}

function render() {
    gameState.forEach((cell, index) => {
        if (cell) {
            cells[index].classList.add('taken');
            cells[index].style.backgroundImage = cell === 'X' ? "url('Image/Cross.png')" : "url('Image/Zero.png')";
        }
    });
}

function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    const tabLinks = document.querySelectorAll('.tabs a');
    tabLinks.forEach(link => {
        link.classList.remove('active');
    });

    document.getElementById(tabId).classList.add('active');

    const activeLink = document.querySelector(`.tabs a[data-tab="${tabId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}
//#endregion

//#region " Скрипты UI элементов"
function startTimer() {
    timerInterval = setInterval(() => {
        timerSeconds++;
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        document.querySelector('.timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }, 1000);
}

function switchPage(url) {
    window.location.href = url; 
    resetGame(); // временно тут
}

function exitToMenu() {
    resetGame();
    // допилить выход из сессии 
}

function showMessage(message) {
    document.getElementById('modalMessage').innerText = message; 
    setTimeout(() => {
        document.getElementById('RestartWindow').style.display = "block"; 
    }, 500/*dalay*/); 
}

function closeModal() {
    document.getElementById('RestartWindow').style.display = "none"; 
}

// обработчик событий для вкладок
document.querySelectorAll('.tabs a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); 
        const tabId = link.getAttribute('data-tab');
        showTab(tabId);
    });
});
//#endregion