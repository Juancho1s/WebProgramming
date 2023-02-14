fetch("https://reqres.in/api/users?page=1")
  .then((response) => response.json())
  .then((ObjData) => CreateUI(ObjData));

  fetch("https://reqres.in/api/users?page=2")
  .then((response) => response.json())
  .then((ObjData) => CreateUI(ObjData));

function CreateUI(ObjData) {
  const user = ObjData.data;
  const Card = document.getElementById("Container");
  user.forEach((user) => {
    let newCard =`
    <article class="Card">
        <img class="Card_Avatar" src="${user.avatar}" alt="This is the user's avatar." />
        <section class="Card_UserData">
          <div class="FirstName">
            <h3>First Name:${"   " + user.first_name}</h3>
          </div>
          <div class="LastName">
            <h3>Last Name:${"   " + user.last_name}</h3>
          </div>
          <div class="email">
            <h3>e-mail:${"   " + user.email}</h3>
          </div>
          <div class="ID">
            <h3>ID:${"   " + user.id}</h3>
          </div>
        </section>
      </article>
    `;
    Card.innerHTML += newCard;
  });
}
