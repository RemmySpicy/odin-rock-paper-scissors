const roundResult = document.querySelector('.round-result');
const computerScore = document.querySelector('.comp-score');
const playerScore = document.querySelector('.player-score');
const options = document.querySelectorAll('.option');
const resetBtn = document.querySelector('.reset-btn');
const gameEnd = document.querySelector('.game-end');
const pRoundChoice = document.querySelector('.player-round-choice');
const cRoundChoice = document.querySelector('.comp-round-choice')


// win/loss displays
const winEmojis = ['😁', '😎', '😋', '🤩'];
const loseEmojis = ['😕', '😪', '☹', '🤕'];

// score count
let playerWins = 0;
let computerWins = 0;

// win/los remarks
const winRemarks =  [
    'You are da bomb! 💣', 'Good job my nigga', 'Haha, lucky you!', 'Guess who\'s proud? Mommy!',
    'Excellent work!', 'You are a Champ!'
];
const lossRemarks = [
    'Better luck next time!', 'Looserrrrr! 🤪', 'Ligma ⚽⚽🤣', 'Noobieee 🥴'
];

// Play round function call
options.forEach(option => {
    option.addEventListener('click', () => {
        playRound(computerPlay(), playerPlay(option));
        animateRoundResult();
    });
});

// Random number funtion
function randomNum(arr) {
    return Math.floor(Math.random() * arr.length)
}

// Computer input logic 
function computerPlay() {
    let choices = ['rock', 'paper', 'scissors'];
    return choices[randomNum(choices)];
}

// Player selection function
function playerPlay(option) {
    return option.querySelector('span')
    .textContent
    .toLowerCase();
}

// Gameplay function
function playRound(ComputerSelection, playerSelection) {
    if (playerWins > 4 || computerWins > 4) {
        gameEnd.style.transform = 'scale(1)';
        return;
    }
    // console logs for the sake of it
    console.log('player:', playerSelection, ', ', 'comp:', ComputerSelection);

    //Set choices to display
    pRoundChoice.textContent = playerSelection.toUpperCase();
    cRoundChoice.textContent = ComputerSelection.toUpperCase();
    
    // Game logic
    if (ComputerSelection === playerSelection) {
        roundResult.textContent = `It's a draw! You both choose '${playerSelection}'`;
        return;
    } else if (ComputerSelection === 'rock' && playerSelection === 'paper') {
        roundResult.textContent = 'You win! Paper covers Rock';
        scoreIncrement('player');
        return;
    } else if (ComputerSelection === 'rock' && playerSelection === 'scissors') {
        roundResult.textContent = 'You lose! Rock breaks Scissors';
        scoreIncrement('computer');
        return;
    } else if (ComputerSelection === 'paper' && playerSelection === 'scissors') {
        roundResult.textContent = 'You win! Scissors cuts Paper';
        scoreIncrement('player');
        return;
    } else if (ComputerSelection === 'paper' && playerSelection === 'rock') {
        roundResult.textContent = 'You lose! Paper covers Rock';
        scoreIncrement('computer');
        return;
    } else if (ComputerSelection === 'scissors' && playerSelection === 'rock') {
        roundResult.textContent = 'You win! Rock brakes Scissors';
        scoreIncrement('player');
        return;
    } else if (ComputerSelection === 'scissors' && playerSelection === 'paper') {
        roundResult.textContent = 'You lose! Scissors cuts Paper';
        scoreIncrement('computer');
        return;
    }

}


function scoreIncrement(winner) {
    if (winner === 'player') {
        playerWins++;
    } else {
        computerWins++;
    }
    
    // Show result again if player continue game without reset
    if (playerWins > 4 || computerWins > 4) {
        declareWin(winner);
    }

    // Set current score value to display
    computerScore.textContent = computerWins;
    playerScore.textContent = playerWins;

    // console logs for the sake of it
    console.log('Player: ', playerWins)
    console.log('Comp: ', computerWins)
}

// Animate round result
function animateRoundResult() {
    roundResult.style.transform = 'scale(1.1)';
    roundResult.addEventListener('transitionend', () => {
        roundResult.style.transform = 'scale(1)';
    })
}

// Pop up game end screen
function declareWin(winner) {
    gameEnd.style.transform = 'scale(1)';
    gameEnd.style.opacity = '1';
    const reaction = document.querySelector('.reaction');
    const gameResult = document.querySelector('.game-result');

    if (winner === 'player') {
        reaction.textContent = winEmojis[randomNum(winEmojis)];
        gameResult.innerHTML = `You won the game. <br> ${winRemarks[randomNum(winRemarks)]}`;
        console.log('The winner is:', winner)
    } else {
        reaction.textContent = loseEmojis[randomNum(loseEmojis)];
        gameResult.innerHTML = `You lost the game. <br> ${lossRemarks[randomNum(lossRemarks)]}`;
        console.log('The winner is:', winner)
    }
}

// Reset Game function call
resetBtn.addEventListener('click', resetGame);

// Reset game function
function resetGame() {
    playerWins = 0;
    computerWins = 0;
    playerScore.textContent = playerWins;
    computerScore.textContent = computerWins;
    // Set initial result display 
    console.log('clicked reset');
    roundResult.textContent = 'Select your move below to begin!';
    gameEnd.style.transform = 'scale(0)';
    gameEnd.style.opacity = '0';
}

// Remove pop up on window click
window.addEventListener('click', () => {
    if (gameEnd.style.transform == 'scale(1)') {
        gameEnd.style.transform = 'scale(0)';
    }
}, true)