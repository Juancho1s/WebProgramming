function pressSubmit() {
  put_list.push(
    parseInt(document.getElementById("Container_Input_text").value)
  );
  try_L.textContent = "[" + put_list.toString() + "]";
  document.getElementById("Container_Input_text").value = "";
  if (put_list[counter_list] == Random_Num) {
    Result_P.textContent =
      "The number is:" +
      put_list[counter_list] +
      ". Congratulations, You Win!!";
    validation = true;
  } else if (put_list[counter_list] < Random_Num) {
    Result_P.textContent =
      " The number wich you are looking for is greater. You already have " +
      (10 - put_list.length) +
      " attempts";
  } else if (put_list[counter_list] > Random_Num) {
    Result_P.textContent =
      " The number wich you are looking for is less. You already have " +
      (10 - put_list.length) +
      " attempts";
  }
  if ((put_list.length == 3) | (validation == true)) {
    Result_P.textContent =
      "Sorry, You lost. The good news are that you can restart.";
    validation = true;
    document.getElementById("Container_Input_Restart").disabled = false;
    document.getElementById("Container_Input_Submit").disabled = true;
    document.getElementById("Container_Input_text").value = "";
    return;
  }
  counter_list++;
}

function pressRestart() {
    Random_Num = Math.floor(Math.random() * 100) + 1;
    put_list = [];
    counter_list = 0;
    validation = false;
    document.getElementById("Container_Input_Submit").disabled = false;
}

let Random_Num = Math.floor(Math.random() * 100) + 1;
let put_list = [];
let counter_list = 0;
let validation = false;

const button_submit = document.getElementById("Container_Input_Submit");
const button_restart = document.getElementById("Container_Input_Restart");
const try_L = document.getElementById("Output_Numbers_list");
const Result_P = document.getElementById("Output_Resoult");

button_submit.addEventListener("click", pressSubmit);
button_restart.addEventListener("click", pressRestart);
