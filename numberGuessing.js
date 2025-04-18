//game variables
const maxAttempts = 5
let gameOver = false
let attemptsLeft = maxAttempts
let secretNumber;

//dom elements
const userInput = document.getElementById("inputField")
const checkAnswer = document.getElementById("checkAnswer")
const result = document.getElementById("result")
const hint = document.getElementById("hint")
const attempts = document.getElementById("attempts")

//functions
function displayAttempts(attemptsLeft) {
    attempts.textContent = `Attempts left: ${attemptsLeft}`;
}
function displayHint(hintStatus) {
    hint.textContent = hintStatus;
}

function displayResult(resultStatus) {
    result.textContent = resultStatus;
}

function startGame() {
    secretNumber = Math.floor(Math.random() * 101);
    console.log(secretNumber);
    attemptsLeft = maxAttempts;
    gameOver = false;
    displayAttempts(attemptsLeft);
    hint.textContent = '';
    result.textContent = '';
}

function checkGuess() {
    if (gameOver) return;
    
    const playerGuess = parseInt(userInput.value);
    
    if (isNaN(playerGuess)) {
        displayResult('Please enter a valid number!');
        return;
    }

    attemptsLeft--;

    if (playerGuess < secretNumber) {
        displayResult('Too low');
        if (secretNumber - playerGuess <= 10) {
            displayHint('You are close though');
        }
    } else if (playerGuess > secretNumber) {
        displayResult('Too high');
        if (playerGuess - secretNumber <= 10) {
            displayHint('You are close though');
        }
    } else {
        displayResult('You got it!');
        gameOver = true;
        return;
    }

    if (attemptsLeft === 0) {
        gameOver = true;
        displayResult(`You ran out of attempts, the number was ${secretNumber}`);
    } else {
        displayAttempts(attemptsLeft);
    }
}

// Initialize game
startGame();

// Check the answer when button is clicked
checkAnswer.addEventListener('click', checkGuess);
