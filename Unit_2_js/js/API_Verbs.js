document.getElementById("Add_Button").addEventListener("click", Create);
document.getElementById("Ok_Button").addEventListener("click", okFunction);

function Create() {
  let name = document.getElementById("NameInput").value;
  let lastName = document.getElementById("LNInput").value;
  let eMail = document.getElementById("eMailInput").value;
  let message = document.getElementById("OtherWindow");
  if ((name == "") | (lastName == "") | (eMail == "")) {
    return;
  }
  const user = {
    name: `${name}`,
    lastName: `${lastName}`,
    email: `${eMail}`,
  };

  fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((ObjData) => {
      message.classList.add("OtherWindow_Able");
      message.classList.remove("OtherWindow");
      message.children[0].children[0].textContent = `The new user was added successfully`;
      document.getElementById("FNInsertion").textContent = ObjData.name;
      document.getElementById("LNInsertion").textContent = ObjData.lastName;
      document.getElementById("IdInsertion").textContent = ObjData.id;
    })
    .catch((error) => {
      console.log("error", error);
    });
  document.getElementById("NameInput").value = "";
  document.getElementById("LNInput").value = "";
  document.getElementById("eMailInput").value = "";
}

function okFunction() {
  let message = document.getElementById("OtherWindow");

  message.classList.add("OtherWindow");
  message.classList.remove("OtherWindow_Able");
}
