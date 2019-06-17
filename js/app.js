

//  I learn most of my code from https://developer.mozilla.org/
const cards = document.querySelector('.deck');
const restertPressed = document.querySelector('.restart');
let openedCards = [];
let matches = 0;
let moves = 0;
let stars = 3;
let time = 0;
let timeCounter = 0;


// Start game and shuffle cards.
function startGame() {
    const beforShuffled = document.querySelectorAll('.deck li');
    /* to convert node list to array
    * https://stackoverflow.com/questions/2735067/how-to-convert-a-dom-node-list-to-an-array-in-javascript
    */
    let array = Array.from(beforShuffled);
    afterShuffled = shuffle(array);
    for (iterator of afterShuffled) {
        cards.appendChild(iterator);
    }
    timer();
}
startGame();

// Listener for listen to click on card.
cards.addEventListener('click', event => {
    const clicked = event.target;
    if (!clicked.classList.contains('match') && !openedCards.includes(clicked)) { // https://www.w3schools.com/jsref/jsref_includes_array.asp
        if (clicked.classList.contains('card') && (openedCards.length < 2)) {
            flipCard(clicked);
            openCard(clicked);
            if (openedCards.length === 2) {
                checkCard();
                move();
            }
        }
    }
    if (matches === 8) {
        win();
    }
})

// Listener for listen to click on restart button.
restertPressed.addEventListener('click', restert);


// To flip card and show what contain. add classes to class name
function flipCard(target) {
    target.classList.add('open', 'show');
}

// Add the clicked card to openedCard array.
function openCard(target) {
    openedCards.push(target);
}

// Check if the two cards matches or not.
function checkCard() {
    const first = openedCards[0].firstElementChild;
    const second = openedCards[1].firstElementChild;
    if (first.className === second.className) {
        LockedCard();
        matches += 1;
        openedCards = [];
    } else {
        setTimeout(() => {
            returnCard();
            openedCards = [];
        }, 500);
    }
}

// Return cards close.
function returnCard() {
    openedCards[0].classList.remove('open', 'show');
    openedCards[1].classList.remove('open', 'show');
}

// Lock cards as matches.
function LockedCard() {
    openedCards[0].classList.add('match');
    openedCards[1].classList.add('match');
}

// Calculate moves for determain the stars and end the game.
function move() {
    moves++;
    document.querySelector('.moves').textContent = moves;
    if (moves === 9) {
        document.querySelector('.stars').firstElementChild.remove();
        stars--;
    } else if (moves === 13) {
        document.querySelector('.stars').firstElementChild.remove();
        stars--;
    } else if (moves === 17) {
        document.querySelector('.stars').firstElementChild.remove();
        stars--;
    } else if (moves > 20) {
        gameOver();
    }

}

// Calculate timer for the game.
function timer() {
    // learn advanced about timer from https://www.w3schools.com/jsref/met_win_settimeout.asp .
    document.querySelector('.time').textContent = time;
    time++;
    timeCounter = setTimeout(timer, 1000);
}

function stopTimer() {
    clearTimeout(timeCounter);
    time = 0;
    document.querySelector('.time').textContent = time;
}

// Alert if win the game.
function win() {
    /*  I used sweetalert2 to let the alet looks good and I learnd about it from :
    *   https://code.tutsplus.com/tutorials/creating-pretty-popup-messages-using-sweetalert2--cms-30662
    *  and https://sweetalert2.github.io/
    */
    swal({
        type: 'success',
        title: 'Congratulations',
        text: 'You win with ' + stars + ' stars and ' + time + ' seconds.' ,
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Restart Game?'
            }).then((result) => {
              if (result.value) {
                timer();
                restert();
            }
    });
    stopTimer();

}

// Alert if lost the game.
function gameOver() {
    swal({
        type: 'error',
        title: 'Oops...',
        text: 'Game over!',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: 'Restart Game?'
            }).then((result) => {
              if (result.value) {
                timer();
                restert();
            }
    });
    stopTimer();
}

// function for restart button.
function restert() {
    // Reset all cards and Shuffle to start again.
    const resttCards = document.querySelectorAll('.deck li');
    for (const iterator of resttCards) {
        iterator.className = 'card';
    }
    startGame();
    openedCards = [];
    matches = 0;

    // Reset moves
    moves = 0;
    document.querySelector('.moves').textContent = moves;

    // Resert stars
    const resetStars = document.querySelector('.stars');
    for (let newStars = stars; newStars < 3; newStars++) {
        const newElement = document.createElement('li');
        newElement.innerHTML = '<i class="fa fa-star"> </i>';
        resetStars.appendChild(newElement);
    }
    stars = 3;

    // Reset time
    stopTimer();
    timeCounter = 0;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
* a list that holds all of your cards and Listener for click cards *DONE*
*/
/*
* Display the cards on the page *DONE*
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/
/*
* set up the event listener for a card. If a card is clicked: *YES*
*  - display the card's symbol (put this functionality in another function that you call from this one) *DONE*
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one) *DONE*
*  - if the list already has another card, check to see if the two cards match *DONE*
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one) *DONE*
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one) *DONE*
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one) *DONE*
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one) *DONE*
*/
