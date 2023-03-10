let mistakeChanceEasy = 40;
let mistakeChanceHard = 5;
let gameDone = false;
let playerMove = true;
let gameFields = document.getElementsByClassName("gameField");
let emptyFieldValue = "   "; // alt + 255

Array.from(gameFields).forEach(function (el) {
  el.textContent = emptyFieldValue;
});

// Player move
document.addEventListener('click', function (e) {
  if (e.target.classList.contains("gameField") && playerMove && !gameDone && e.target.textContent === emptyFieldValue) {
    e.target.classList.remove("emptyField");
    e.target.classList.add("player");
    playerMove = false;
    document.getElementById("playerPriority").textContent == "Player Symbol: X" ? e.target.textContent = "X" : e.target.textContent = "O";

    if (!winCheck() && document.getElementsByClassName("emptyField").length) {
      makeComputerMove();
    }
  }
});

// Computer move
function makeComputerMove() {

  let chosenFieldIndex = 0;

  function perfectPlay() {
    if (oneAwayFromWin("computer")) {
      chosenFieldIndex = oneAwayFromWin("computer");
    } else if (oneAwayFromWin("player")) {
      chosenFieldIndex = oneAwayFromWin("player");
    } else {
      randomPlay();
    }
  }

  function randomPlay() {
    chosenFieldIndex = Math.floor(Math.random() * gameFields.length);
    while (gameFields[chosenFieldIndex].textContent != emptyFieldValue) {
      chosenFieldIndex = Math.floor(Math.random() * gameFields.length);
    }
  }

  // Calculate random chance to make a mistake
  if (document.getElementById("playerDifficulty").textContent == "Difficulty: Easy") {
    if (Math.floor(Math.random() * Math.floor(100) + 1) <= mistakeChanceEasy) {
      randomPlay();
    } else {
      perfectPlay();
    }
  } else {
    if (Math.floor(Math.random() * Math.floor(100) + 1) <= mistakeChanceHard) {
      randomPlay();
    } else {
      perfectPlay();
    }
  }

  gameFields[chosenFieldIndex].classList.remove("emptyField");
  gameFields[chosenFieldIndex].classList.add("computer");
  playerMove = true;
  document.getElementById("playerPriority").textContent == "Player Symbol: X" ? gameFields[chosenFieldIndex].textContent = "O" : gameFields[chosenFieldIndex].textContent = "X";

  winCheck();
}

let winConditions =
  [[0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]];

function winCheck() {

  // Check if are there are no fields left to play for a draw
  if (!document.getElementsByClassName("emptyField").length) {
    gameDone = true;
    document.getElementById("message").textContent = "XO DRAW!";
    document.getElementById("message").style.display = "block"
  }

  for (let i = 0; i < winConditions.length; i++) {

    if (gameFields[winConditions[i][0]].textContent != emptyFieldValue &&
      gameFields[winConditions[i][0]].textContent == gameFields[winConditions[i][1]].textContent &&
      gameFields[winConditions[i][1]].textContent == gameFields[winConditions[i][2]].textContent) {

      gameDone = true;

      if (playerMove) {
        document.getElementById("message").textContent = document.getElementById("playerPriority").textContent == "Player Symbol: X" ? "O WINNER!" : "X WINNER!";
      } else {
        document.getElementById("message").textContent = document.getElementById("playerPriority").textContent == "Player Symbol: X" ? "X WINNER!" : "O WINNER!";
      }

      document.getElementById("message").style.display = "block";
      gameFields[winConditions[i][0]].style.color = "yellow";
      gameFields[winConditions[i][1]].style.color = "yellow";
      gameFields[winConditions[i][2]].style.color = "yellow";
    }
  }

  return gameDone;
}

function oneAwayFromWin(nextToMove) {

  let fieldRequiredForWin = 0;
  let opponent = nextToMove == "player" ? "computer" : "player";

  for (let i = 0; i < winConditions.length; i++) {

    if ((gameFields[winConditions[i][0]].classList.contains(nextToMove) || gameFields[winConditions[i][1]].classList.contains(nextToMove)) &&
      gameFields[winConditions[i][0]].textContent == gameFields[winConditions[i][1]].textContent &&
      !gameFields[winConditions[i][2]].classList.contains(opponent)) {
      fieldRequiredForWin = winConditions[i][2];
    }

    if ((gameFields[winConditions[i][1]].classList.contains(nextToMove) || gameFields[winConditions[i][2]].classList.contains(nextToMove)) &&
      gameFields[winConditions[i][1]].textContent == gameFields[winConditions[i][2]].textContent &&
      !gameFields[winConditions[i][0]].classList.contains(opponent)) {
      fieldRequiredForWin = winConditions[i][0];
    }

    if ((gameFields[winConditions[i][0]].classList.contains(nextToMove) || gameFields[winConditions[i][2]].classList.contains(nextToMove)) &&
      gameFields[winConditions[i][0]].textContent == gameFields[winConditions[i][2]].textContent &&
      !gameFields[winConditions[i][1]].classList.contains(opponent)) {
      fieldRequiredForWin = winConditions[i][1];
    }

  }

  return fieldRequiredForWin;
}

function cleanUI() {

  gameDone = false;
  document.getElementById("message").style.display = "none";
  document.getElementById("message").textContent = "";

  Array.from(gameFields).forEach(function (el) {
    el.textContent = emptyFieldValue;
    el.style.color = "white";
    el.classList = "gameField emptyField";
  });

}

function changeDifficulty() {

  if (document.getElementById("playerDifficulty").textContent == "Difficulty: Easy") {
    document.getElementById("playerDifficulty").textContent = "Difficulty: Hard";
  } else {
    document.getElementById("playerDifficulty").textContent = "Difficulty: Easy";
  }

  resetGame();
}

function changePriority() {

  cleanUI();

  if (document.getElementById("playerPriority").textContent == "Player Symbol: X") {
    playerMove = false;
    document.getElementById("playerPriority").textContent = "Player Symbol: O";
    makeComputerMove();
  } else {
    playerMove = true;
    document.getElementById("playerPriority").textContent = "Player Symbol: X";
  }

}

function resetGame() {

  cleanUI();

  if (document.getElementById("playerPriority").textContent == "Player Symbol: X") {
    playerMove = true;
  } else {
    makeComputerMove();
  }

}