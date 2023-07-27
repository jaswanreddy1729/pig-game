"use strict";

// selecting the elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const resetGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const hold = document.querySelector(".btn--hold");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");

const score = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const randomNum = () => {
  return Math.floor(Math.random() * 6) + 1;
};
const swtichPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const displayDice = (num) => {
  if (diceEl.classList.contains("hidden")) {
    diceEl.classList.remove("hidden");
  }
  diceEl.setAttribute("src", `dice-${num}.png`);
};

// rolling the dice
rollDice.addEventListener("click", function () {
  if (playing) {
    const num = randomNum();
    displayDice(num);
    if (num !== 1) {
      currentScore += num;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      swtichPlayer();
    }
  }
});

// hold the score
hold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];
    // wins
    if (score[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      swtichPlayer();
    }
  }
});

// reset game
resetGame.addEventListener("click", function () {
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  diceEl.classList.add("hidden");
  document.querySelector(`.player--0`).classList.add("player--active");
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document
    .querySelector(`.player--1`)
    .classList.remove("player--active", "player--winner");
});
