const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let score = 0;
let counter = document.querySelector(".score");
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flip");
    moveCounter();
    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

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
    if (firstCard.dataset.weather === secondCard.dataset.weather) {
        // it's a match
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    });
})();

function moveCounter() {
    score++;
    counter.innerHTML = score;

    if (score === 1) {
        second = 0;
        minute = 0;
        startTimer();
    }
}
cards.forEach((card) => card.addEventListener("click", flipCard));
