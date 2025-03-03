document.addEventListener("DOMContentLoaded", () => {
  const choices = document.querySelectorAll(".choice");
  const msg = document.querySelector("#msg");
  const userScorePara = document.querySelector("#user-score");
  const compScorePara = document.querySelector("#comp-score");
  const historyTableBody = document.querySelector("#history-table tbody");
  const resetBtn = document.querySelector("#reset-btn");
  const historyContainer = document.querySelector(".history");

  let userScore = localStorage.getItem("userScore") ? parseInt(localStorage.getItem("userScore")) : 0;
  let compScore = localStorage.getItem("compScore") ? parseInt(localStorage.getItem("compScore")) : 0;
  let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || [];

  // Initialize displayed scores
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;

  const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
  };

  const showWinner = (userWin, userChoice, compChoice) => {
    let winner = "";
    if (userWin) {
      userScore++;
      winner = "You";
      msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
      msg.style.backgroundColor = "green";
    } else if (userChoice !== compChoice) {
      compScore++;
      winner = "Computer";
      msg.innerText =`You Lose! ${compChoice} beats your ${userChoice}`;
      msg.style.backgroundColor = "red";
    } else {
      // It's a draw
      winner = "Draw";
      msg.innerText = "Game was Draw! Play Again.";
      msg.style.backgroundColor = "gray";
    }

    updateScores();
    gameHistory.push({
      userChoice,
      compChoice,
      winner,
      userScore,
      compScore
    });

    // Update game history in localStorage
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));
    updateHistoryTable();  // Update table after storing the game history
  };

  const playGame = (userChoice) => {
    const compChoice = genCompChoice();

    choices.forEach(choice => {
      choice.style.backgroundColor = ""; 
      choice.classList.remove("zoom");  // Remove zoom animation if it was applied earlier
    });

    const userChoiceElement = document.getElementById(userChoice);
    const compChoiceElement = document.getElementById(compChoice);

    // Set the background color for user and computer choices
    if(userChoice===compChoice){
      userChoiceElement.style.backgroundColor = "gray";  // User background color
    compChoiceElement.style.backgroundColor = "gray";   // Computer background color
    }
    else{
    userChoiceElement.style.backgroundColor = "rgb(133, 82, 55)";  // User background color
    compChoiceElement.style.backgroundColor = "rgb(92, 24, 23)";   // Computer background color
    }

    // Apply the zoom animation to both user and computer choices
    userChoiceElement.classList.add("zoom");
    compChoiceElement.classList.add("zoom");

    setTimeout(() => {
      userChoiceElement.classList.remove("zoom");
      compChoiceElement.classList.remove("zoom");
      userChoiceElement.style.backgroundColor ='';
      compChoiceElement.style.backgroundColor ='';

    }, 1000);  // The zoom lasts for 1 second

    // Handle the outcome after the zoom animation finishes
    setTimeout(() => {
      if (userChoice === compChoice) {
        // userChoiceElement.style.backgroundColor = "gray";
        // compChoiceElement.style.backgroundColor = "gray"; 
        // setTimeout(() => {
        //   userChoiceElement.style.backgroundColor = '';
        //   compChoiceElement.style.backgroundColor = '';
        // }, 1000);
        showWinner(false, userChoice, compChoice); 
      } else {
        let userWin = true;
        if (userChoice === "rock") {
          userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
          userWin = compChoice === "scissors" ? false : true;
        } else {
          userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
      }
    }, 1000); // Wait for 1 second before deciding the outcome
  };

  const updateHistoryTable = () => {
    historyTableBody.innerHTML = ''; 

    gameHistory.forEach((game, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${game.userChoice}</td>
        <td>${game.compChoice}</td>
        <td>${game.winner}</td>
        <td>${game.userScore}</td>
        <td>${game.compScore}</td>
      `;
      historyTableBody.appendChild(row);
    });
  };

  const updateScores = () => {
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;

    localStorage.setItem("userScore", userScore);
    localStorage.setItem("compScore", compScore);
  };

  choices.forEach((choice) => {
    choice.addEventListener("click", () => {
      const userChoice = choice.getAttribute("id");
      playGame(userChoice);
       // Show the history section when any choice is selected
       historyContainer.style.display = "block";
    });
  });

  updateHistoryTable();

  // Reset button functionality
  resetBtn.addEventListener("click", () => {
    // Reset scores and game history
    userScore = 0;
    compScore = 0;
    gameHistory = [];

    // Update UI and localStorage
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Play Your Move";
    msg.style.backgroundColor = "#431d0c";  

    // Clear localStorage
    localStorage.setItem("userScore", userScore);
    localStorage.setItem("compScore", compScore);
    localStorage.setItem("gameHistory", JSON.stringify(gameHistory));

    // Clear the history table
    updateHistoryTable();
  });
});


// Get the button and the divs
const btn = document.getElementById("btn");
const frontPage = document.querySelector(".front_page");
const container = document.querySelector(".container");

// Add event listener to the button
btn.addEventListener("click", function() {
    // Hide the front page and show the container
    frontPage.style.display = "none";
    container.style.display = "block";
});