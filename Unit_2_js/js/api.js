fetch("https://reqres.in/api/users?page=2")
  .then((response) => response.json())
  .then((ObjData) => CreateUI(ObjData));

function CreateUI(ObjData) {
    let container = document.getElementById("Users");
    console.log(ObjData);
  const user = ObjData.data;
  console.log(user);
  user.forEach((user) => {
    console.log(user.avatar);
  });
}

