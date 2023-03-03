document.getElementById("Add_Button").addEventListener("click", Create);
document
  .getElementById("InputID_Update")
  .addEventListener("keyup", ValidatingId);

document
  .getElementById("InputID_Delete")
  .addEventListener("keyup", ValidatingIdDelete);

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

function ValidatingIdDelete() {
  fetch("https://reqres.in/api/users/2")
    .then((response) => response.json())
    .then((ObjData) => IdDeleteInsertion(ObjData));
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
  } else {
    userData.innerHTML = "";
  }
  document.getElementById("Update_Button").addEventListener("click", Update);
}

function IdDeleteInsertion(ObjData) {
  let userData = document.getElementById("IDDeleteDisplay");
  let typed = document.getElementById("InputID_Delete");
  if (ObjData.data.id == typed.value) {
    if (userData.children.length > 0) {
      userData.innerHTML = "";
    }
    let display = `<lable>Name:</lable>
        <h3>${ObjData.data.first_name}</h3>
        <lable>Last name:</lable>
        <h3>${ObjData.data.last_name}</h3>
        <lable>e-mail:</lable>
        <h3>${ObjData.data.email}</h3>

        <h4 style="margin-top: 10px">Are you shure you want to delete this user?</h4>

        <button id="Delete_Button" class="Update_Button">Delete</button>`;
    userData.innerHTML += display;
  } else {
    userData.innerHTML = "";
  }
  document.getElementById("Delete_Button").addEventListener("click", Delete);
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
        <section class="AllowDeny">
          <button id="Ok_Button">OK</button>
        </section>
      </article>
    </article>`;

  document.getElementById("IDDisplay").innerHTML = "";
  document.querySelector("body").innerHTML += confirmationMessage;
  document
    .getElementById("Ok_Button")
    .addEventListener("click", okUpdateFunction);
}

function Delete() {
  document.getElementById("IDDeleteDisplay").innerHTML = "";
  document.getElementById("InputID_Delete").value = "";

  let url = "https://reqres.in/api/users/2";

  let options = {
    method: "DELETE",
  };

  fetch(url, options)
    .then((response) => response.status)
    .then((ObjData) => {
      let deleteMessage = `<article id="OtherWindow" class="OtherWindow">
      <article id="ValidationWindow" class="ValidationWindow">
        <h2 id="Message" class="Message">The user was successfully deleted!!</h2>
        <h3>Api response: ${ObjData}</h3>
        <button id="OK_DeleteButton">Ok</button>
      </article>
    </article>`;

      document.querySelector("body").innerHTML += deleteMessage;
      document
        .getElementById("OK_DeleteButton")
        .addEventListener("click", okDeleteFunction);
    });
}

function okUpdateFunction() {
  let message = document.getElementById("OtherWindow");
  document
    .getElementById("InputID_Update")
    .addEventListener("keyup", ValidatingId);

  message.remove();
}

function okDeleteFunction() {
  let message = document.getElementById("OtherWindow");
  document
    .getElementById("InputID_Delete")
    .addEventListener("keyup", ValidatingIdDelete);

  message.remove();
}

function okAddFunction() {
  let message = document.getElementById("OtherWindow");
  document.getElementById("Add_Button").addEventListener("click", Create);

  message.remove();
}
