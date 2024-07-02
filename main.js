let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 3;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let inputnumbArea = document.getElementById("input-numb");
let answerArea = document.getElementById("answer");
let resultGifImg = document.getElementById("result-gif-img");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", function () {
    userInput.value = "";
});


function pickRandomNum() {
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log("정답", computerNum);
    answerArea.textContent = `정답은 ${computerNum}`;
}

function play() {
    let userValue = userInput.value;

    if (userValue === "") {
        resultArea.textContent = "숫자를 입력해주세요.";
        return;
    }

    userValue = parseInt(userValue);

    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100 사이의 숫자를 입력해주세요.";
        return;
    }

    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
        return;
    }

    chances--;
    chanceArea.textContent = `남은 기회: ${chances}번`;
    console.log("chances", chances);

    if (userValue < computerNum) {
        resultGifImg.src = "./images/up.gif";
        resultGifImg.style.display = "block";
        resultArea.textContent = "끌어 올려!";
    } else if (userValue > computerNum) {
        resultGifImg.src = "./images/down.gif";
        resultGifImg.style.display = "block";
        resultArea.textContent = "내리게 해줄게!";
    } else {
        resultGifImg.src = "./images/correct.gif";
        resultGifImg.style.display = "block";
        resultArea.textContent = "진실의 방으로!";
        gameOver = true;
    }

    history.push(userValue);
    inputnumbArea.textContent = `당신이 입력한 숫자는: ${history.join(", ")}`;
    console.log(history);

    if (chances < 1) {
        gameOver = true;
    }

    if (gameOver) {
        playButton.disabled = true;
    }
}

function reset() {
    userInput.value = "";
    pickRandomNum();
    chances = 3;
    gameOver = false;
    history = [];
    chanceArea.textContent = `남은 기회: ${chances}번`;
    inputnumbArea.textContent = `당신이 입력한 숫자는: ${history.join(", ")}`;
    playButton.disabled = false;
    resultArea.textContent = ""; // 리셋할 때도 result-area 비우기
    resultGifImg.style.display = "none";
}

pickRandomNum();
