const para = document.querySelector("p");

para.addEventListener("click", updateName);

function updateName() {
  const name = prompt("Enter new name");
  //para.textContent = "Player 1 " + name;
  para.textContent = `Player 1: ${name}`;
}
