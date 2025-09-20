let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;
let btns = ["red", "green", "yellow", "purple"];

let h2 = document.querySelector("h2");
let scoreBox = document.querySelector("#score");

document.addEventListener("keypress", function () {
  if (!started) {
    startGame();
  }
});

function startGame() {
  console.log("Game Started");
  started = true;
  level = 0;
  gameSeq = [];
  userSeq = [];
  levelUp();
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 250); 
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 250); 
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  scoreBox.innerText = `Score: ${level - 1}`;

  let randIdx = Math.floor(Math.random() * 4); 
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);

  console.log("Game Seq:", gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level - 1}</b> <br> Press any key to restart.`;
    scoreBox.innerText = `Score: 0`;

    // Game Over effect
    document.body.style.background = "red";
    setTimeout(() => {
      document.body.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
    }, 400);

    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

//  Magical Cursor Effect //

document.addEventListener("mousemove", function (e) {
  let dot = document.createElement("div");
  dot.className = "magic-dot";
  dot.style.left = e.pageX + "px";
  dot.style.top = e.pageY + "px";
  document.body.appendChild(dot);

  setTimeout(() => {
    dot.remove();
  }, 700);
});

