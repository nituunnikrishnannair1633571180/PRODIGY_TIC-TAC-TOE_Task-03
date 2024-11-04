document.addEventListener("DOMContentLoaded", () => {
  let btnRef = document.querySelectorAll(".button-option");
  let popupRef = document.querySelector(".popup");
  let newgameBtn = document.getElementById("new-game");
  let restartBtn = document.getElementById("restart");
  let msgRef = document.getElementById("message");
  let gameModeSelection = document.getElementById("game-mode-selection");
  let gameBoard = document.getElementById("game-board");

  let twoPlayerBtn = document.getElementById("two-player");
  let aiPlayerBtn = document.getElementById("ai-player");

  let isTwoPlayerMode = true; // Default to 2 player mode
  let xTurn = true;
  let count = 0;

  let winningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];

  // Disable all buttons
  const disableButtons = () => {
      btnRef.forEach((element) => (element.disabled = true));
      popupRef.classList.remove("hide");
  };

  // Enable all buttons for new game and restart
  const enableButtons = () => {
      btnRef.forEach((element) => {
          element.innerText = "";
          element.disabled = false;
          element.style.backgroundColor = "#ffffff"; // Reset background
      });
      popupRef.classList.add("hide");
  };

  // Function for when a player wins
  const winFunction = (letter, winPattern) => {
      disableButtons();
      winPattern.forEach(index => {
          btnRef[index].style.backgroundColor = "#ffcc00"; // Highlight the winning buttons
      });
      msgRef.innerHTML = `&#x1F389; <br> '${letter}' Wins!`;
  };

  // Function for a draw
  const drawFunction = () => {
      disableButtons();
      msgRef.innerHTML = "&#x1F60E; <br> It's a Draw!";
  };

  // New Game
  newgameBtn.addEventListener("click", () => {
      count = 0;
      enableButtons();
  });

  restartBtn.addEventListener("click", () => {
      count = 0;
      enableButtons();
  });

  // Win Logic
  const winChecker = () => {
      for (let i of winningPattern) {
          let [a, b, c] = [btnRef[i[0]].innerText, btnRef[i[1]].innerText, btnRef[i[2]].innerText];
          if (a !== "" && a === b && b === c) {
              winFunction(a, i);
              return true;
          }
      }
      return false;
  };

  // AI Move
  const aiMove = () => {
      let availableSpaces = [];
      btnRef.forEach((button, index) => {
          if (button.innerText === "") availableSpaces.push(index);
      });

      if (availableSpaces.length > 0) {
          let aiChoice = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];
          btnRef[aiChoice].innerText = "O";
          btnRef[aiChoice].disabled = true;
          count += 1;

          if (winChecker()) {
              return;
          }

          if (count === 9) {
              drawFunction();
          }
          xTurn = true;  // Set the turn back to player
      }
  };

  // Display X/O on click
  btnRef.forEach((element) => {
      element.addEventListener("click", () => {
          if (xTurn) {
              xTurn = false;
              element.innerText = "X";
              element.disabled = true;
              count += 1;

              if (winChecker()) {
                  return;
              }

              if (count === 9) {
                  drawFunction();
                  return;
              }

              if (!isTwoPlayerMode) {
                  setTimeout(aiMove, 500); // AI response delay
              }
          } else if (isTwoPlayerMode) {
              xTurn = true;
              element.innerText = "O";
              element.disabled = true;
              count += 1;

              if (winChecker()) {
                  return;
              }

              if (count === 9) {
                  drawFunction();
              }
          }
      });
  });

  // Game mode selection
  twoPlayerBtn.addEventListener("click", () => {
      isTwoPlayerMode = true;
      gameModeSelection.classList.add("hide");
      gameBoard.classList.remove("hide");
      enableButtons();
  });

  aiPlayerBtn.addEventListener("click", () => {
      isTwoPlayerMode = false;
      gameModeSelection.classList.add("hide");
      gameBoard.classList.remove("hide");
      enableButtons();
  });

  // Initialize with buttons disabled until game mode is selected
  gameBoard.classList.add("hide");
  enableButtons();
});
