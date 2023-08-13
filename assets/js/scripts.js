const cards = document.querySelectorAll('.card')

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
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
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 1500);
}

cards.forEach(card => card.addEventListener('click', flipCard))