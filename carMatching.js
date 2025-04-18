// Car images for the game
const carImages = [
    'https://www.carlogos.org/car-logos/ferrari-logo.png',
    'https://www.carlogos.org/car-logos/lamborghini-logo.png',
    'https://www.carlogos.org/car-logos/porsche-logo.png',
    'https://www.carlogos.org/car-logos/bmw-logo.png',
    'https://www.carlogos.org/car-logos/mercedes-benz-logo.png',
    'https://www.carlogos.org/car-logos/audi-logo.png',
    'https://www.carlogos.org/car-logos/maserati-logo.png',
    'https://www.carlogos.org/car-logos/bugatti-logo.png'
];

// Game state variables
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let timeElapsed = 0;
let timer = null;
let matchedPairs = 0;

// DOM elements
const gameBoard = document.querySelector('.game-board');
const movesDisplay = document.getElementById('moves');
const timeDisplay = document.getElementById('time');
const restartButton = document.getElementById('restart-btn');

// Initialize game
function initGame() {
    // Create card pairs and shuffle them
    const cardPairs = [...carImages, ...carImages];
    const shuffledCards = shuffleArray(cardPairs);
    
    // Create card elements
    shuffledCards.forEach((img, index) => {
        const card = createCard(img, index);
        gameBoard.appendChild(card);
    });

    // Start timer
    startTimer();
}

// Create a card element
function createCard(imgSrc, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'Car Logo';
    
    cardBack.appendChild(img);
    card.appendChild(cardFront);
    card.appendChild(cardBack);

    card.addEventListener('click', flipCard);
    return card;
}

// Flip card function
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First card flipped
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Second card flipped
    secondCard = this;
    moves++;
    movesDisplay.textContent = moves;
    checkForMatch();
}

// Check if cards match
function checkForMatch() {
    const isMatch = firstCard.querySelector('img').src === secondCard.querySelector('img').src;

    if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === carImages.length) {
            setTimeout(() => {
                alert(`Congratulations! You won in ${moves} moves and ${timeElapsed} seconds!`);
                stopTimer();
            }, 500);
        }
    } else {
        unflipCards();
    }
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// Unflip unmatched cards
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

// Reset board state
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Timer functions
function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;
        timeDisplay.textContent = timeElapsed;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

// Restart game
function restartGame() {
    stopTimer();
    timeElapsed = 0;
    moves = 0;
    matchedPairs = 0;
    timeDisplay.textContent = '0';
    movesDisplay.textContent = '0';
    gameBoard.innerHTML = '';
    initGame();
}

// Event listeners
restartButton.addEventListener('click', restartGame);

// Start the game
initGame();