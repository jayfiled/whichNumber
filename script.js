'use strict';

const scoreElement = document.querySelector(
  'body > main > section.right > p.label-score.nes-text.is-warning > span'
);
const heartElement = document.querySelector(
  'body > main > section.right > p.label-score.nes-text.is-warning > i'
);
const checkButton = document.querySelector(
  'body > main > section.left.is-rounded > button'
);
const title = document.querySelector('body > header > h1');
const secretNumberText = document.querySelector('body > header > div');
const restartButton = document.querySelector('body > header > button');
let guessedNumber = () => {
  return document.querySelector(
    'body > main > section.left.is-rounded > input'
  );
};

const state = {
  secretNumber: 0,
  generateRandNumber() {
    this.secretNumber = Math.floor(Math.random() * (21 - 1) + 1);
  },
  score: 20,
  highScore: 0,
  makeHighScore(newHigh = '0') {
    this.highScore = parseInt(newHigh);
    document.querySelector(
      'body > main > section.right > p.label-highscore.nes-text.is-success > span'
    ).innerText = this.highScore;
  },
};

state.makeHighScore();
state.generateRandNumber();

function start() {
  console.log(state.secretNumber);

  const displayMessage = message => {
    title.innerText = message;
  };

  const updateScore = () => {
    state.score -= 1;
    scoreElement.innerText = state.score;
    displayMessage(
      guessedNumber().value > state.secretNumber ? 'Too High!!' : 'Too Low!!'
    );

    if (state.score == 0) {
      heartElement.className = 'nes-icon close is-large';
      disableCheckButton();
    } else if (state.score <= 3) {
      heartElement.classList.add('is-empty');
    } else if (state.score <= 7) {
      heartElement.classList.add('is-transparent');
    } else if (state.score <= 15) {
      heartElement.classList.add('is-half');
    }
  };

  const disableCheckButton = () => {
    checkButton.className = 'btn check nes-btn is-disabled';
    checkButton.removeEventListener('click', guessTheNumber);
  };

  const guessTheNumber = () => {
    checkIfWin(guessedNumber().value);
  };

  checkButton.addEventListener('click', guessTheNumber);

  const winGame = guessedNumber => {
    displayMessage('Correct!!!');
    document.querySelector('body').style.backgroundColor = '#27a53c';
    title.className = 'nes-text is-success';
    disableCheckButton();
    secretNumberText.innerText = state.secretNumber;
    if (parseInt(guessedNumber) > state.highScore) {
      state.makeHighScore(state.score);
    }
  };

  const checkIfWin = guessedNumber => {
    parseInt(guessedNumber) == state.secretNumber
      ? winGame(guessedNumber)
      : updateScore();
  };
}

const reset = () => {
  checkButton.className = 'btn check nes-btn is-success';
  state.score = 20;
  scoreElement.innerText = state.score;
  title.innerText = 'Guess My Number!';
  document.querySelector('body').style.backgroundColor = '#222';
  title.className = 'nes-text is-primary';
  guessedNumber().value = null;
  secretNumberText.innerText = '?';
  heartElement.className = 'nes-icon is-large heart';
  state.generateRandNumber();
  start();
};

start();

restartButton.addEventListener('click', reset);

// Decrement score on each incorrect guess
// Check the class on the heart to make it 'deplete' on 15, 7, 0
// <i class="nes-icon is-large heart"></i>
// <i class="nes-icon is-large is-half heart"></i>
// <i class="nes-icon is-large is-transparent heart"></i>
// <i class="nes-icon is-large heart is-empty"></i>
// <i class="nes-icon close is-large"></i>

// disable the check button when correctly guessed
// <button type="button" class="nes-btn is-disabled">Disabled</button>
