const scores = {
  Red: 0,
  Green: 0,
  Blue: 0,
  Yellow: 0,
};

const eventLog = document.getElementById("event-log");
const redScoreElem = document.getElementById("red-score");
const greenScoreElem = document.getElementById("green-score");
const blueScoreElem = document.getElementById("blue-score");
const yellowScoreElem = document.getElementById("yellow-score");
const startButton = document.getElementById("start-button");
const highJumpColorSelect = document.getElementById("high-jump-color");
const submitColorButton = document.getElementById("submit-color");
const highJumpContainer = document.getElementById("high-jump-container");
const body = document.body;

function logEvent(message) {
  const p = document.createElement("p");
  p.textContent = message;
  eventLog.appendChild(p);
}

function updateScores() {
  redScoreElem.textContent = scores.Red;
  greenScoreElem.textContent = scores.Green;
  blueScoreElem.textContent = scores.Blue;
  yellowScoreElem.textContent = scores.Yellow;
}

function changeBackgroundColor(color) {
  body.style.backgroundColor = color;
}

function openingCeremony(callback) {
  logEvent("Welcome to the Sports Event!");
  setTimeout(() => {
    logEvent("Opening Ceremony has concluded.");
    callback();
  }, 1000);
}

function race100M(callback) {
  logEvent("Starting the 100m Race...");
  setTimeout(() => {
    const winner = ["Red", "Green", "Blue", "Yellow"][
      Math.floor(Math.random() * 4)
    ];
    logEvent(`The winner of the 100m race is ${winner}!`);
    scores[winner] += 10;
    updateScores();
    callback();
  }, 2000);
}

function longJump(callback) {
  logEvent("Starting the Long Jump...");
  setTimeout(() => {
    const jumpWinner = ["Red", "Green", "Blue", "Yellow"][
      Math.floor(Math.random() * 4)
    ];
    logEvent(`${jumpWinner} won the Long Jump!`);
    scores[jumpWinner] += 5;
    updateScores();
    callback();
  }, 2000);
}

function highJump(callback) {
  logEvent("Starting the High Jump...");
  highJumpContainer.style.display = "block";

  submitColorButton.addEventListener(
    "click",
    () => {
      const color = highJumpColorSelect.value;
      if (scores[color] !== undefined && color) {
        logEvent(`${color} won the High Jump!`);
        scores[color] += 7;
      } else {
        logEvent("Invalid color entered. No points awarded.");
      }
      updateScores();
      highJumpContainer.style.display = "none";
      callback();
    },
    { once: true }
  );
}

function awardCeremony() {
  logEvent("Award Ceremony!");
  setTimeout(() => {
    const winner = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );
    logEvent(`The overall winner is ${winner} with ${scores[winner]} points!`);
    changeBackgroundColor(winner.toLowerCase());
  }, 1000);
}

function main() {
  startButton.addEventListener("click", () => {
    startButton.disabled = true;
    openingCeremony(() => {
      race100M(() => {
        longJump(() => {
          highJump(awardCeremony);
        });
      });
    });
  });
}

main();
