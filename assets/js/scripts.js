const cards = document.querySelectorAll('.card')

let hasFlippedCard = false;
let lockBoard =false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip')

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
        }

        secondCard = this;
        hasFlippedCard = false;
        
        checkForMatch();
    }

function checkForMatch() {
    let isMatch = firstCard.dataset.weather === secondCard.dataset.weather;

    isMatch ? disableCards() : unflipCards();
    // do cards match?
    if (firstCard.dataset.weather ===
        secondCard.dataset.weather) {
        // it's a match
       disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard()
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

cards.forEach(card => card.addEventListener('click', flipCard))