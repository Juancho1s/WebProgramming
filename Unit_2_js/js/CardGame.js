/* These are the variables which I am going to use to execute the game */

/* This variable gets all the elements with the class "Game" */
let game_V = document.querySelectorAll(".Game");

/* This for loop generates almost all the classes and articles of the document */
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    let sections = document.createElement("section");
    sections.classList.add("Game_Card");
    sections.innerHTML = `<div class="Game_Container_Card">
      <div class="Game_Front_Container_Card">
        <img
          src="Images/cardBack.png"
          alt="This is the image of the card."
        />
      </div>
      <div class="Back">
        <p class="Number">1</p>
      </div>
      </div>`;
    game_V[i].appendChild(sections);
  }
}

/* This variable refers to the previous selected card (It is a little comfusing but it works with doble iteration) */
let temp;
/* This variable multipies the score according to the number of successes */
let muliplier = 1;
/* This is a follow up of the correct pairs of cards */
let allCorrectSelections = 0;
/* This variable works in order to mix all the numbers on the cards */
let randomSelector_1 = 0;
/* The next arrays are created to contain the reandomization of the cards. By random numbers put in two arrays */
let arryRandom_1 = [];
let arryRandom_2 = [];
/* This array works in dorder to contain the two barables which are provided from the selected cards */
let Selected_Cards = [];
/* This is going to contain all the score from the two players */
let playersCounter = [0, 0];
/* This is the variable which refers to the player's turn */
let playersTurn = true;
/* The next variable works in order to get the div which contains the players */
let playersSection = document.getElementById("Game");
/* This variable is to get the name of the two players */
let players = document.querySelectorAll("input");
/* This variable is to put the names in the game screen */
let names = document.querySelectorAll(".Name");
/* This other variable works in order to get all the classes called Number */
let cards_numbers = document.querySelectorAll(".Number");
/* This varable contains all the players' punctuation */
let punctuationContainer = document.querySelectorAll(".Punctuation");
/* This variable is to have access to all the cards */
let cards = document.querySelectorAll(".Game_Card");

/* This instructin inserts an event to the button restart, at the time it is cliked. */
document.getElementById("Restart").addEventListener("click", restart);
/* The next instruction inserts an event to the button, in otder to call a function. */
document.querySelector(".Start_B").addEventListener("click", Starting);
/* This is the adition of the event to the button, in order to reset all the page */
document.getElementById("Reset").addEventListener("click", Reset);

/* This funciton is the charge of creating the random numbers */
random_Filling(arryRandom_1);
random_Filling(arryRandom_2);

/* Here into this for loop the random numbers are put into the HTML document */
inserting();
/* 
Here, in this function, are created all the processes to know the decision of the players
*/
function onClick() {
  /* First, we need to know (with this conditional) if the click in the card is not repeated */
  if (this == temp) {
    return;
  }
  /* Then We need to know about the selections number from the user if it is greather than 1 the user cannot select anuyone else */
  if (Selected_Cards.length > 1) {
    for (let i = 0; i < Selected_Cards.length; i++) {
      Selected_Cards[i].classList.remove("Selected");
    }
    Selected_Cards = [];
    return;
  }

  /* This variable works in order to create the animation and the showing of the data */
  let container = this.firstElementChild;
  /* The last barable works with this little condition adding a new class to the card thus allowing the change */
  if (container.classList.contains("Selected")) {
    container.classList.remove("Selected");
  } else {
    container.classList.add("Selected");
  }

  /* 
  This query collects all the objects with the classes called Game_Container_Card.Selected
  In order to know the number of the selected cards
  */
  Selected_Cards = document.querySelectorAll(".Game_Container_Card.Selected");

  /*
  Here is the same condition which we saw there up, but this time the conditional works 
  in order to activate or avoid the process to blocking of the cards
  */
  if (Selected_Cards.length > 1) {
    /* 
    In this section the comparation between the selected cards is made and if the data is equal in both of them
    the class selected changes to Correct and all the events from those cards are removed.
    */
    if (
      Selected_Cards[0].children[1].firstElementChild.textContent ==
      Selected_Cards[1].children[1].firstElementChild.textContent
    ) {
      setTimeout(() => {
        Selected_Cards[0].classList.remove("Selected");
        Selected_Cards[0].classList.add("Correct");
        Selected_Cards[1].classList.remove("Selected");
        Selected_Cards[1].classList.add("Correct");

        /* Here we remove all the events of the cards correctly selected */
        temp.replaceWith(temp.cloneNode(true));
        this.replaceWith(this.cloneNode(true));
      }, 1000);
      /* Into this function all the data related to the players will be updated deppending to the result */
      Validating(
        Selected_Cards[1].children[1],
        Selected_Cards[0].children[1],
        playersTurn
      );
      allCorrectSelections++;
      /* Here is added 1 to the multiplier (only if the player answered correctly) */
      muliplier++;
    } else {
      /* If the player answered incorrectly, the selection of the turn will change to the other player */
      if (playersTurn == false) {
        playersTurn = true;
        playersSection.children[1].classList.remove("PlayerTurn");
        playersSection.children[1].children[3].textContent = "";
        playersSection.children[0].children[3].textContent = " <";
        playersSection.children[0].classList.add("PlayerTurn");
      } else {
        playersTurn = false;
        playersSection.children[0].classList.remove("PlayerTurn");
        playersSection.children[0].children[3].textContent = "";
        playersSection.children[1].children[3].textContent = " <";
        playersSection.children[1].classList.add("PlayerTurn");
      }
      /* The multiplier returns to 1 for the next player */
      muliplier = 1;
      /* We have to weit for the next action because of some errors when selecting the cards */
      setTimeout(() => {
        /* In the opposite case, all the "Selected" classes are removed. This to return the card to the original position */
        for (let i = 0; i < Selected_Cards.length; i++) {
          Selected_Cards[i].classList.remove("Selected");
        }
        Selected_Cards = [];
      }, 500);
    }
  } else {
    /* Here we put the varable temp in case the two cards are not selected */
    temp = this;
  }
}

/* This is the functions which works in order to put the random numbers on the cards */
function inserting() {
  /* Here we need to trestart the variable because of the refresh */
  let cards_numbers = document.querySelectorAll(".Number");
  for (let i = 0; i < 10; i++) {
    /* The implementation of the numbers of every array is decided from here because a single array has the middle of the total data */
    cards_numbers[i + randomSelector_1].textContent = arryRandom_1[i];
    randomSelector_1++;
    cards_numbers[i + randomSelector_1].textContent = arryRandom_2[i];
  }
}

/* This function makes the changes of the color for the differents cards */
function Validating(card_1, card_2, playerTurn) {
  setTimeout(() => {
    if (playerTurn == true) {
      card_1.classList.add("Back_Correct_P1");
      card_2.classList.add("Back_Correct_P1");
      playersCounter[0] = playersCounter[0] + 1 * muliplier;
      punctuationContainer[0].textContent = playersCounter[0];
      if (allCorrectSelections == 10) {
        ActivationFinal();
      }
    } else {
      card_1.classList.add("Back_Correct_P2");
      card_2.classList.add("Back_Correct_P2");
      playersCounter[1] = playersCounter[1] + 1 * muliplier;
      punctuationContainer[1].textContent = playersCounter[1];
      if (allCorrectSelections == 10) {
        ActivationFinal();
      }
    }
  }, 500);
}

function ActivationFinal() {
  let fin = document.querySelector(".FinalWindow");
  let format = document.getElementById("Format");
  let winerName = document.querySelector(".WinerName");
  let punctuation = document.querySelector(".FinalPunctuation");

  fin.classList.add("FinalWindow_Able");
  fin.classList.remove(".FinalWindow");
  playersSection.classList.add("GameWindow");
  playersSection.classList.remove("GameWindow_Able");
  format.classList.remove("Format_Able");
  format.classList.add("Format");
  if (playersCounter[0] > playersCounter[1]) {
    winerName.textContent = `${players[0].value} wins`;
    punctuation.textContent = `Score: ${playersCounter[0]} points`;
  } else {
    winerName.textContent = `${players[1].value} wins`;
    punctuation.textContent = `Score: ${playersCounter[1]} points`;
  }
}

/* This function fills the arrays with random numbers */
function random_Filling(arryRandom) {
  for (let index = 0; index < 10; index++) {
    let aux = Math.floor(Math.random() * 10) + 1;
    if (arryRandom.includes(aux) == false) {
      arryRandom.push(aux);
    } else {
      index--;
    }
  }
}

function Starting() {
  /* This set of variables are only to appear or disappear the elements on the screen */
  let start = document.getElementById("Start");
  let format = document.getElementById("Format");
  let game = document.getElementById("Game");

  /* In this loop are put the names in the game screen's variables */
  for (let i = 0; i < names.length; i++) {
    names[i].textContent = players[i].value + ":";
  }

  /* This section works in order to show the game screen */
  start.classList.add("DisAble");
  format.classList.add("Format_Able");
  format.classList.remove("Format");
  game.classList.add("GameWindow_Able");
  game.classList.remove("GameWindow");

  transition();
}

function transition() {
  let cards = document.querySelectorAll(".Game_Card");
  /* This section introduces a little transition for the game */
  for (let i = 0; i < cards.length; i++) {
    (() => {
      setTimeout(() => {
        cards[i].children[0].classList.add("Selected");
      }, i * 200);
    })(i);
  }

  /* This is very similar to the last one but thisone avoids both of them are simultaneously */
  setTimeout(Delay, 2500, cards);
  setTimeout(() => {
    cards.forEach((element) => {
      element.addEventListener("click", onClick);
    });
  }, 8000);
}

/* This function makes a little delay in order to give to user a time to checke the cards */
function Delay(cards) {
  for (let i = 0; i < cards.length; i++) {
    (() => {
      setTimeout(() => {
        cards[i].children[0].classList.remove("Selected");
      }, i * 200);
    })(i);
  }
}

function cleaning() {
  muliplier = 1;
  Selected_Cards = [];
  arryRandom_1 = [];
  arryRandom_2 = [];
  playersCounter = [0, 0];
  playersTurn = true;
  randomSelector_1 = 0;
  playersTurn = true;
  allCorrectSelections = 0;

  random_Filling(arryRandom_1);
  random_Filling(arryRandom_2);
  inserting();
  playersSection.children[1].classList.remove("PlayerTurn");
  playersSection.children[1].children[3].textContent = "";
  playersSection.children[0].children[3].textContent = " <";
  playersSection.children[0].classList.add("PlayerTurn");
}

function restart() {
  /* This variable is to have access to all the cards again, becuase of the refresh */
  cards = document.querySelectorAll(".Game_Card");
  let cardsBack1 = document.querySelectorAll(".Back");
  let correctCards = document.querySelectorAll(".Correct");

  cleaning();

  for (let i = 0; i < 20; i++) {
    cardsBack1[i].classList.remove("Back_Correct_P1");
    cardsBack1[i].classList.remove("Back_Correct_P2");
    correctCards[i].classList.remove("Correct");
  }
  document
    .querySelector(".FinalWindow_Able")
    .classList.remove("FinalWindow_Able");
  document.getElementById("Format").classList.add("Format_Able");
  punctuationContainer[0].textContent = "0";
  punctuationContainer[1].textContent = "0";
  playersSection.classList.add("GameWindow_Able");
  transition();
}

function Reset() {
  location.reload();
}
