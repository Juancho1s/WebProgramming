document.getElementById("Add_Button").addEventListener("click", Create);
document
  .getElementById("InputID_Update")
  .addEventListener("keyup", ValidatingId);

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
      let confirmationMessage = `<article id="OtherWindow" class="OtherWindow">
      <article id="ValidationWindow" class="ValidationWindow">
        <h2 id="Message" class="Message">The new user was successfully added!!</h2>
        <div>
          <h2>First Name:</h2>
          <h3 id="FNInsertion">${ObjData.name}</h3>
        </div>
        <div>
          <h2>Last Name:</h2>
          <h3 id="LNInsertion">${ObjData.lastName}</h3>
        </div>
        <div>
          <h2>ID:</h2>
          <h3 id="IdInsertion">${ObjData.id}</h3>
        </div>
        <button id="Ok_Button">OK</button>
      </article>
    </article>`;

      document.querySelector("body").innerHTML += confirmationMessage;
      document
        .getElementById("Ok_Button")
        .addEventListener("click", okAddFunction);
    })
    .catch((error) => {
      console.log("error", error);
    });
  document.getElementById("NameInput").value = "";
  document.getElementById("LNInput").value = "";
  document.getElementById("eMailInput").value = "";
}

function ValidatingId() {
  fetch("https://reqres.in/api/users/2")
    .then((response) => response.json())
    .then((ObjData) => IdInsertion(ObjData));
}

function IdInsertion(ObjData) {
  let userData = document.getElementById("IDDisplay");
  let typed = document.getElementById("InputID_Update");
  if (ObjData.data.id == typed.value) {
    if (userData.children.length > 0) {
      userData.innerHTML = "";
    }
    let display = `<lable>Name:</lable>
        <input id="NameUpdate" class="NameInput" type="text" value="${ObjData.data.first_name}"/>
        <lable>Last name:</lable>
        <input id="LNUpdate" class="LNInput" type="text" value="${ObjData.data.last_name}" />
        <lable>e-mail:</lable>
        <input id="eMailUpdate" class="eMailInput" type="text" value="${ObjData.data.email}"/>
        <button id="Update_Button" class="Update_Button">Update</button>`;
    userData.innerHTML += display;

    userData.classList.add("IDDisplay_Able");
    userData.classList.remove("IDDisplay");
  } else {
    userData.innerHTML = "";
    userData.classList.add("IDDisplay");
    userData.classList.remove("IDDisplay_Able");
  }
  document.getElementById("Update_Button").addEventListener("click", Update);
}

function Update() {
  let url = "https://reqres.in/api/users/2";

  let UpdatedUser = {
    first_name: `${document.getElementById("NameUpdate").value}`,
    last_name: `${document.getElementById("LNUpdate").value}`,
    email: `${document.getElementById("eMailUpdate").value}`,
    id: `${document.getElementById("InputID_Update").value}`,
  };

  let options = {
    method: "PUT",
    body: JSON.stringify(UpdatedUser),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((ObjData) => UpdateMessage(ObjData));
}

function UpdateMessage(ObjData) {
  let confirmationMessage = `<article id="OtherWindow" class="OtherWindow">
      <article id="ValidationWindow" class="ValidationWindow">
        <h2 id="Message" class="Message">The user was successfully updated to:</h2>
        <div>
          <h2>First Name:</h2>
          <h3 id="FNInsertion">${
            document.getElementById("NameUpdate").value
          }</h3>
        </div>
        <div>
          <h2>Last Name:</h2>
          <h3 id="LNInsertion">${document.getElementById("LNUpdate").value}</h3>
        </div>
        <div>
          <h2>e-mail</h2>
          <h3 id="EmailInsertion">${
            document.getElementById("eMailUpdate").value
          }</h3>
        </div>
        <div>
          <h2>Date:</h2>
          <h3 id="UpdateDate">${ObjData.updatedAt}</h3>
        </div>
        <button id="Ok_Button">OK</button>
      </article>
    </article>`;

  document.querySelector("body").innerHTML += confirmationMessage;
  document
    .getElementById("Ok_Button")
    .addEventListener("click", okUpdateFunction);
}

function okUpdateFunction() {
  let message = document.getElementById("OtherWindow");
  document
    .getElementById("InputID_Update")
    .addEventListener("keyup", ValidatingId);
  document.getElementById("IDDisplay").innerHTML = "";

  message.remove();
}

function okAddFunction() {
  let message = document.getElementById("OtherWindow");
  document.getElementById("Add_Button").addEventListener("click", Create);

  message.remove();
}
