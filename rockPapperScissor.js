//game variables
let playerChoice = '';
let computerChoice = '';
let justFinish = '' ; //flag to signal when button change from go to reset
let playerScore = 0;
let computerScore = 0;

//dom elements
const cards = document.querySelectorAll('.game-container .card');
const displayText = document.getElementById('displayUserText');
const displayComputerText = document.getElementById('displayComputerText');
const startButton = document.getElementById('Start');
const computerCard = document.querySelector('.computer-choice-container .card');
const computerCardTitle = computerCard.querySelector('.card-title');
const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');

// Add click event listeners to all cards
cards.forEach(card => {
    card.addEventListener('click', () => {
        if (!justFinish) {
            // Remove selected class from all cards
            cards.forEach(c => c.classList.remove('selected'));
            // Add selected class to clicked card
            card.classList.add('selected');
            // Store the player's choice
            playerChoice = card.getAttribute('data-choice');
            displayText.textContent = `You chose: ${playerChoice}`;
        }
    });
});

// Start game and reset choice when button is clicked
startButton.addEventListener('click', () => {
    if (!justFinish) {
        if (!playerChoice) {
            displayText.textContent = 'Make your choice!';
        } else {
            computerChoice = getComputerChoice();
            displayComputerText.textContent = `Computer choose: ${computerChoice}`;
            displayText.textContent = `\n${determineWinner(playerChoice, computerChoice)}`;
            updateComputerCard();
            justFinish = true;
            document.body.classList.add('game-finished');
            playerChoice = '';
            startButton.textContent = 'Reset';
        }
    } else resetButton();
});

//Handle computer's card changes
function updateComputerCard() {
    // Update computer's card
    computerCard.setAttribute('data-choice', computerChoice);
    computerCardTitle.textContent = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
    
    // Add image to computer's card
    let existingImg = computerCard.querySelector('img');
    if (existingImg) {
        existingImg.remove();
    }
    const computerImg = document.createElement('img');
    const imgSrc = {
        'rock': './assets/fist.png',
        'paper': 'https://cdn-icons-png.flaticon.com/512/2541/2541988.png',
        'scissor': './assets/scissors.png'
    };
    computerImg.src = imgSrc[computerChoice];
    computerImg.alt = computerChoice;
    computerCard.insertBefore(computerImg, computerCardTitle);
    justFinish = true;
}

//Generate a random choice for the computer
function getComputerChoice() {
    const choices = ["rock", "paper", "scissor"];
    return choices[Math.floor(Math.random() * choices.length)];
}

//determine the winner of the game
function determineWinner(playerChoice, computerChoice) {
    const choices = ["rock", "paper", "scissor"];
    
    if (playerChoice === computerChoice) {
        return "It's a tie!";
    }
    
    if (!choices.includes(playerChoice)) {
        return "Invalid choice. Please select Rock, Paper, or Scissors!.";
    }

    if (
        (playerChoice === "rock" && computerChoice === "scissor") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissor" && computerChoice === "paper")
    ) {
        playerScore++;
        playerScoreElement.textContent = playerScore;
        return "You win bro!!";
    }

    computerScore++;
    computerScoreElement.textContent = computerScore;
    return 'You lose to the computer';
}

//handle reset button after round
function resetButton() {
    cards.forEach(card => card.classList.remove('selected'));
    displayText.textContent = 'Choose your choice!';
    displayComputerText.textContent = '';
    computerCardTitle.textContent = '?';
    computerCard.setAttribute('data-choice', '');
    startButton.textContent = 'Go';
    let existingImg = computerCard.querySelector('img');
    if (existingImg) {
        existingImg.remove();
    }
    justFinish = false;
    document.body.classList.remove('game-finished');
}

// //Handle computer's card changes
// function updateComputerCard() {
//     // Update computer's card
//     computerCard.setAttribute('data-choice', computerChoice);
//     computerCardTitle.textContent = computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1);
    
//     // Add image to computer's card
//     let existingImg = computerCard.querySelector('img');
//     if (existingImg) {
//         existingImg.remove();
//     }
//     const computerImg = document.createElement('img');
//     const imgSrc = {
//         'rock': './assets/fist.png',
//         'paper': 'https://cdn-icons-png.flaticon.com/512/2541/2541988.png',
//         'scissor': './assets/scissors.png'
//     };
//     computerImg.src = imgSrc[computerChoice];
//     computerImg.alt = computerChoice;
//     computerCard.insertBefore(computerImg, computerCardTitle);
//     justFinish = true;
// }

// //Generate a random choice for the computer
// function getComputerChoice() {
//     const choices = ["rock", "paper", "scissor"];
//     return choices[Math.floor(Math.random() * choices.length)];
// }

// //determine the winner of the game
// function determineWinner(playerChoice, computerChoice) {
//     const choices = ["rock", "paper", "scissor"];
    
//     if (playerChoice === computerChoice) {
//         return "It's a tie!";
//     }
    
//     if (!choices.includes(playerChoice)
//     ) {
//         return "Invalid choice. Please select Rock, Paper, or Scissors!.";
//     }

//     if (
//         (playerChoice === "rock" && computerChoice === "scissors") ||
//         (playerChoice === "paper" && computerChoice === "rock") ||
//         (playerChoice === "scissors" && computerChoice === "paper")
//     ) {return "You win bro!!"}

//     return 'You lose to the computer'
// }