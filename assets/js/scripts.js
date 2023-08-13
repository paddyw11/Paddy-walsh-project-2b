const cards = document.querySelectorAll('.card')

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.toggle('flip')

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard - true;
        firstCard -this;
    }   else {
        // second click
        hasFlippedCard = false;
        secondCard =this

        if (firstCard.dataset.weather === 
            secondCard.dataset.weather) {

            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {

            setTimeout(() => {
            firstCard.class.remove('flip');
            secondCard.class.remove('flip');
            }, 1500);
        }
    }
}   



cards.forEach(card => card.addEventListener('click', flipCard))