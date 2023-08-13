const cards = document.querySelectorAll('.card')

function flipCard() {
    this.classlist.toggle('flip')
}
cards.forEach(card => card.addEventListener('click', flipCard));
