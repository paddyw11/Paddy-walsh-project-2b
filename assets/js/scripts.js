/* jshint esversion: 8 */
var cards = document.querySelectorAll(".card");

let hasFlippedCard = false;
let lockBoard = false;
let score = 0;
let counter = document.querySelector(".score");
let firstCard, secondCard;
let congratsModal = document.getElementById("congratsBk");
let closeCongratsBtn = document.getElementById("closeCongratsBtn");
let revisionModal = document.getElementById("revisionModal");
let finalTime =document.getElementById("finalTime");
const revisionBtn = document.getElementById("revisionBtn"); // revision modal open
const closeBtn = document.getElementById("closeBtn"); // revision modal close
const resetButton = document.getElementById("resetButton",);
const resetButton2 = document.getElementById("resetButton2");

window.onload = initialiseBoard();

// Revision modal
revisionBtn.addEventListener("click", showRevisionModal); // listen for open click of revision modal
closeBtn.addEventListener("click", closeRevisionModal); // listen for close revision modal button

// listen for click on close button for congrats modal
closeCongratsBtn.addEventListener("click", () => {
    closeCongratsModal();
    resetBoard(); l
});

function showRevisionModal() {
    revisionModal.style.display = "block";
}

function closeRevisionModal() {
    revisionModal.style.display = "none";
}
// resets the board and shuffles location
function initialiseBoard() {
    cards.forEach((card) => card.addEventListener("click", flipCard));
    shuffle();
}
// card flip logic
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flip");
    playAudio(this);

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;
        moveCounter();
        return;
    }
    hasFlippedCard = false;
    secondCard = this;
    moveCounter();
    checkForMatch();
    checkWin();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.weather === secondCard.dataset.weather;

    // do cards match?
    if (isMatch) {
        // it's a match
        disableCards();
    } else {
        //if it's not a match
        unflipCards();
    }
}
//fucntion to prevent the cards being clicked whilst active
function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");
        lockBoard = false;
    }, 1500);
}

//function to shuffle the locations of the cards
function shuffle() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
}

// funtion to add a move to the counter and begin the timer
function moveCounter() {
    if (hasFlippedCard) {
        score++;
        counter.innerHTML = score;

        if (score === 1) {
            second = 0;
            minute = 0;
            startTimer();
        }
    }
}

// timer
var second = 0,
    minute = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + " mins : " + second + " secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            minute = 0;
        }
    }, 1000);
}

// function to play audio on card flip
function playAudio(card) {
    const audio = card.querySelector("audio");
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

// Congratulations modal
function checkWin() {
    const allFlipped = Array.from(cards).every((card) =>
        card.classList.contains("flip")
    );

    if (allFlipped) {
        finalTime = timer.innerHTML;
        showCongratsModal();
        document.getElementById("totalMoves").innerHTML = score;
        document.getElementById("totalTime").innerHTML = finalTime;
    }
}

function showCongratsModal() {
    congratsModal.classList.add("show");
}

function closeCongratsModal() {
    congratsModal.classList.remove("show");
}

// function to reset the board, timer and counter
function resetBoard() {
    lockBoard = false;
    hasFlippedCard = false;
    [firstCard, secondCard] = [null, null];
    score = 0;
    counter.innerHTML = 0;
    second = 0;
    minute = 0;
    clearInterval(interval);
    timer.innerHTML = "00 : 00";
    cards.forEach((card) => card.classList.remove("flip"));
    initialiseBoard();
    closeCongratsModal();
}


resetButton.addEventListener("click", resetBoard);
resetButton2.addEventListener("click", resetBoard);
