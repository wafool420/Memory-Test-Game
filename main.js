const container = document.querySelector(".container");
const startButton = document.getElementById("start-btn");
const input = document.getElementById("answer");
const scoreUI = document.getElementById("point");
const countdown = document.querySelector(".countdown");

const soundPush = document.getElementById("sndPush");
const soundRight = document.getElementById("sndRight");
const soundWrong = document.getElementById("sndWrong");
const soundLoad = document.getElementById("sndLoad");

let colorBlink = 0;
let score = 0;
let Order = 0;
let Result = 0;
let timer = 3;
let orderAmount = 3;
let answerPeriod = 3000;

//Buttons

const b1 = document.getElementById("1");
const b2 = document.getElementById("2");
const b3 = document.getElementById("3");
const b4 = document.getElementById("4");
const b5 = document.getElementById("5");
const b6 = document.getElementById("6");
const b7 = document.getElementById("7");
const b8 = document.getElementById("8");
const b9 = document.getElementById("9");

container.classList.add("hidden");
countdown.classList.add("hidden");

function playSound(sound) {
  if (sound === "Push") {
    soundPush.volume = "0.3";
    soundPush.currentTime = 0;
    soundPush.play();
  } else if (sound === "Right") {
    soundRight.volume = "0.3";
    soundRight.currentTime = 0;
    soundRight.play();
  } else if (sound === "Wrong") {
    soundWrong.volume = "0.3";
    soundWrong.currentTime = 0;
    soundWrong.play();
  } else if (sound === "Load") {
    soundLoad.volume = "0.3";
    soundLoad.currentTime = 0;
    soundLoad.play();
  }
}

function resetColors() {
  b1.style.backgroundColor = "#8b0000"; // dark red
  b2.style.backgroundColor = "#b35900"; // dark orange
  b3.style.backgroundColor = "#b3b300"; // dark yellow

  b4.style.backgroundColor = "#058b00"; // olive green
  b5.style.backgroundColor = "#006400"; // dark green
  b6.style.backgroundColor = "#006666"; // dark cyan

  b7.style.backgroundColor = "#004c66"; // teal blue
  b8.style.backgroundColor = "#000041"; // dark blue
  b9.style.backgroundColor = "#4b0082"; // indigo
}

function startGame() {
  playSound("Load");
  container.classList.toggle("hidden");
  startButton.classList.toggle("hidden");
  for (let i = 1; i <= 9; i++) {
    document.getElementById(i).classList.add("no-hover");
  }
  myInterval = setInterval(startAnimation, 100);
}

function startAnimation() {
  colorBlink++;
  console.log(colorBlink);
  if (colorBlink < 10) {
    playSound("Load");
    document.getElementById(colorBlink).style.filter = "brightness(2)";
  }

  if (colorBlink === 10) {
    console.log("done counting");
    clearInterval(myInterval);
    for (let i = 1; i <= 9; i++) {
      document.getElementById(i).style.removeProperty("filter");
      document.getElementById(i).disabled = true;
    }
    colorBlink = 0;
    gameOrder();
  }
}

function blinkColors(done) {
  const interval = setInterval(() => {
    const btn = document.getElementById(Order[colorBlink]);
    playSound("Load");

    btn.style.filter = "brightness(2)";

    setTimeout(() => {
      btn.style.removeProperty("filter");
    }, 300);

    colorBlink++;

    if (colorBlink === Order.length) {
      clearInterval(interval);
      setTimeout(() => {
        colorBlink = 0;
        done();
      }, 350);
    }
  }, 1000);
}

function compareAnswer() {
  if (Number(answer.value) === Number(Order.join(""))) {
    return "correct";
  } else {
    return "wrong";
  }
}

function disableButtons(done) {
  for (let i = 1; i < 10; i++) {
    document.getElementById(i).disabled = false;
    document.getElementById(i).classList.toggle("no-hover");
    document.getElementById(i).style.removeProperty("filter");
  }
  done();
}

function gameOrder() {
  Order = createColorOrder();
  console.log(Order);
  blinkColors(() => {
    disableButtons(() => {
      setTimeout(() => {
        countdown.classList.remove("hidden");
        countdown.textContent = timer;
        console.log(timer);
        myInterval3 = setInterval(() => {
          timer--;
          countdown.textContent = timer;
          console.log(timer);
          if (timer === 0) {
            Result = compareAnswer();
            if (Result === "correct") {
              playSound("Right");
              for (let i = 1; i < 10; i++) {
                document.getElementById(i).disabled = false;
                document.getElementById(i).classList.toggle("no-hover");
                document.getElementById(i).style.removeProperty("filter");
                document.getElementById(i).style.backgroundColor = "#09ff00";
              }
              setTimeout(() => {
                countdown.classList.add("hidden");
                score++;
                scoreUI.textContent = "Score: " + score;
                Order = 0;
                colorBlink = 0;
                Result = 0;
                timer = 3;
                orderAmount++;
                answerPeriod += 1000;
                input.value = "";
                resetColors();
                setTimeout(() => {
                  myInterval = setInterval(startAnimation, 100);
                }, 100);
              }, 1000);
            } else {
              playSound("Wrong");
              for (let i = 1; i < 10; i++) {
                document.getElementById(i).disabled = false;
                document.getElementById(i).classList.toggle("no-hover");
                document.getElementById(i).style.removeProperty("filter");
                document.getElementById(i).style.backgroundColor = "#ff0000";
              }
              scoreUI.textContent = "Game Over";
              setTimeout(() => {
                colorBlink = 0;
                score = 0;
                Order = 0;
                Result = 0;
                timer = 3;
                orderAmount = 3;
                answerPeriod = 3000;
                input.value = "";
                scoreUI.textContent = "Score: 0";
                resetColors();
                container.classList.add("hidden");
                countdown.classList.add("hidden");
                startButton.classList.toggle("hidden");
              }, 3000);
            }
            clearInterval(myInterval3);
            timer = 10;
          }
        }, 1000);
      }, answerPeriod);
    });
  });
}

function createColorOrder() {
  let colorOrder = [];
  for (let i = 1; i <= orderAmount; i++) {
    colorOrder.push(Math.floor(Math.random() * 9) + 1);
  }
  return colorOrder;
}
