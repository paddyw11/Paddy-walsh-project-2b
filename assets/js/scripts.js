var cards = document.querySelectorAll('.card');
cards.forEach((card) => card.addEventListener("click", flipCard));


let hasFlippedCard = false;
let lockBoard = false;
let score = 0;
let counter = document.querySelector(".score");
let firstCard, secondCard;

const revisionBtn = document.getElementById("revisionBtn"); // HOW TO PLAY BTN
const closeBtn = document.getElementById("closeBtn"); // HOW TO PLAY CLOSE WINDOW


// REVISION BTN
revisionBtn.addEventListener('click', showRevisionModal); // listen for open click of revision modal
closeBtn.addEventListener('click', closeRevisionModal); // listen for close revision modal button

function showRevisionModal() {
    revisionmodal.style.display = "block";
}

function closeRevisionModal() {
    revisionmodal.style.display = "none";
}


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
}

function checkForMatch() {
    let isMatch = firstCard.dataset.weather === secondCard.dataset.weather;

    isMatch ? disableCards() : unflipCards();
    // do cards match?
    if (isMatch) {
        // it's a match
        disableCards();
    } else {
        unflipCards();
    }
}

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
        //resetBoard();
        
    }, 1500);
}

//function to shuffle to locations of the cards
function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
};

// fucntion for the move counter
function moveCounter() {
    score++;
    counter.innerHTML = score;

    if (score === 1) {
        second = 0;
        minute = 0;
        startTimer();
    }
}

// timer
var second = 0,
    minute = 0;
var timer = document.querySelector(".timer");
var interval;


function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = "Elasped Time: " + minute + " mins " + second + " secs ";
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
    timer.innerHTML = "Elapsed Time 0 mins 0 secs";
    cards.forEach(card => card.classList.remove("flip"));
    shuffle();
}

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetBoard);

