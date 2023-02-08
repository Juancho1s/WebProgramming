/* These are the variables which I am going to use to execute the game */

/*This variable works in order to get all the elements with the classes called Game_Card*/
let cards = document.querySelectorAll(".Game_Card");
/* This other variable works in order to get all the classes called Number */
let cards_numbers = document.querySelectorAll(".Number");
/* This variable refers to the previous selected card (It is a little comfusing but it works with doble iteration) */
let temp;
/* The next arrays are created to contain the reandomization of the cards. By random numbers put in two arrays */
let arryRandom_1 = [];
let arryRandom_2 = [];
/* This array works in dorder to contain the two barables which are provided from the selected cards */
let Selected_Cards = [];

/* This funciton is the charge of creating the random numbers */
random_Filling(arryRandom_1);
random_Filling(arryRandom_2);

/* Here into this for loop the random numbers are put into the HTML document */
for (let i = 0; i < cards.length; i++) {
  /* The implementation of the numbers of every array is decided from here because a single array has the middle of the total data */
  if (i < cards.length / 2) {
    cards[i].addEventListener("click", onClick);
    cards_numbers[i].textContent = arryRandom_1[i];
  } else {
    cards[i].addEventListener("click", onClick);
    cards_numbers[i].textContent = arryRandom_2[i - 10];
  }
}

/* 
Here, in this function, is created all the processes to know the decitions from the players
*/
function onClick() {
  /* First, we need to know (with this conditional) if the click in the card in not repeated */
  if(this == temp){
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
    the class selected chagnes to Correct and all the events from those cards are removed.
    */
    if (Selected_Cards[0].children[1].textContent == Selected_Cards[1].children[1].textContent) {
      Selected_Cards[0].classList.remove("Selected");
      Selected_Cards[0].classList.add("Correct");
      Selected_Cards[1].classList.remove("Selected");
      Selected_Cards[1].classList.add("Correct");
      temp.removeEventListener();
      this.removeEventListener();
    }else{
      setTimeout(()=>{
        for (let i = 0; i < Selected_Cards.length; i++) {
          Selected_Cards[i].classList.remove("Selected");
        }
        Selected_Cards = [];
      }, 1000);
    }
  }else{
    temp = this;
  }
}

/* This function fills arrays  */
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
