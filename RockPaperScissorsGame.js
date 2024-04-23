let myChoose;
let computerChoose;
let dataFromApi;
let winner;
let scoreUser = 0;
let scoreComputer = 0;
let result = document.querySelector(".result");

async function fetchData() {
  try {
    const response = await fetch("./resultWin.json");
    const data = await response.json();

    if (!response.ok) {
      throw new Error("failed to get data from api");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

function ChooseRandom() {
  let allChooser = ["rock", "paper", "scissors"];
  let computerRandomChoose = allChooser[Math.round(Math.random() * 2)];
  return computerRandomChoose;
}

Array.from(document.querySelector(".move").children).forEach((ele) => {
  ele.addEventListener("click", async (e) => {
    const data = await fetchData();
    myChoose = e.target.className;
    computerChoose = ChooseRandom();
    desicdeWinner(data);
    if (winner == myChoose) {
      document.querySelector(
        ".score span.yourScore"
      ).innerText = `${++scoreUser}`;
      document.querySelector("span.result").innerText = `User Is Winner`;
    } else if (winner == computerChoose) {
      document.querySelector(
        ".score span.computerScore"
      ).innerText = `${++scoreComputer}`;
      document.querySelector("span.result").innerText = `computer Is Winner`;
    } else {
      result.innerText = winner;
    }
    document.querySelector(".chooser span.user").innerText = `${myChoose}`;
    document.querySelector(
      ".chooser span.computer"
    ).innerText = `${computerChoose}`;
  });

  function desicdeWinner(data) {
    data.forEach((ele) => {
      if (
        (ele.choose1 == myChoose && ele.choose2 == computerChoose) ||
        (ele.choose2 == myChoose && ele.choose1 == computerChoose)
      ) {
        winner = ele.win;
      }
    });
  }
});
