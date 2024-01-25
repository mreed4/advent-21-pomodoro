const settingsButton = document.querySelector(".settings");
const startButton = document.querySelector(".start");
const resetButton = document.querySelector(".reset");
const body = document.querySelector("body");

const allInputs = document.querySelectorAll("input");
const [minutesInput, secondsInput] = [...allInputs];
const time = document.querySelector(".time");

console.log(allInputs);

document.addEventListener("keyup", (event) => {
  if (!body.classList.contains("end") && event.code === "Space") {
    handleStartButton();
  }

  if (body.classList.contains("end") && event.code === "Space") {
    handleResetButton();
  }
});

startButton.addEventListener("click", handleStartButton);

settingsButton.addEventListener("click", handleSettingsButton);

resetButton.addEventListener("click", handleResetButton);

allInputs.forEach((input, i) => {
  input.addEventListener("focus", (event) => {
    input.parentElement.classList.remove("lower-opacity");
  });

  input.addEventListener("blur", (event) => {
    input.parentElement.classList.add("lower-opacity");

    if (input.value === "") {
      input.value = "00";
    }

    if (Number(input.value) > 59) {
      input.value = "59";
    }

    if (Number(input.value) < 10) {
      input.value = "0" + Number(input.value);
    }

    if (i === 1) {
      allInputs.forEach((input) => {
        input.disabled = !input.disabled;
      });

      [...time.children].forEach((child) => {
        child.classList.remove("lower-opacity");
      });

      settingsButton.classList.toggle("on");
    }
  });

  input.addEventListener("keydown", disableNonNumericInput);
});

function disableNonNumericInput(event) {
  if (/[^0-9]/.test(event.key) && ["Backspace", "Delete", "Tab"].indexOf(event.key) === -1) {
    event.preventDefault();
    console.log("non-numeric input");
  }
}

function handleStartButton(event) {
  const body = document.querySelector("body");

  settingsButton.disabled = !settingsButton.disabled;

  body.classList.toggle("on");

  if (settingsButton.classList.contains("on")) {
    settingsButton.classList.remove("on");
  }

  allInputs.forEach((input) => {
    if (!input.disabled) {
      input.disabled = !input.disabled;
    }
  });

  [...time.children].forEach((child) => {
    if (child.tagName !== "LABEL") {
      child.classList.remove("lower-opacity");
    }
  });

  if (startButton.children[0].textContent === "play_arrow") {
    startButton.children[0].textContent = "pause";
  } else {
    startButton.children[0].textContent = "play_arrow";
  }

  toggleClock();
}

function handleResetButton(event) {
  const body = document.querySelector("body");

  body.classList.remove("on");
  body.classList.remove("end");

  startButton.children[0].textContent = "play_arrow";

  clearInterval(intervalId);

  allInputs.forEach((input) => {
    input.disabled = !input.disabled;
  });

  [...time.children].forEach((child) => {
    if (child.tagName !== "LABEL") {
      child.classList.remove("lower-opacity");
    }
  });

  minutesInput.value = "00";
  secondsInput.value = "05";
}

function toggleClock() {
  // https://inspiredwebdev.com/create-pomodoro-clock/

  const body = document.querySelector("body");

  const isClockRunning = startButton.children[0].textContent === "pause";

  let totalSeconds = Number(minutesInput.value) * 60 + Number(secondsInput.value);
  let secondsRemaining = totalSeconds;

  if (isClockRunning) {
    intervalId = setInterval(() => {
      if (secondsRemaining === 0) {
        clearInterval(intervalId);
        handleStartButton(); // pause the clock

        const audio = new Audio("./bright-notifications-151766.mp3");
        audio.play();

        body.classList.add("end");
      }

      secondsRemaining -= 1;

      const minutes = Math.floor(secondsRemaining / 60);
      const seconds = secondsRemaining % 60;

      minutesInput.value = minutes;
      secondsInput.value = seconds;

      if (minutes < 10) {
        minutesInput.value = "0" + minutes;
      }

      if (seconds < 10) {
        secondsInput.value = "0" + seconds;
      }

      if (minutes < 0) {
        minutesInput.value = "00";
      }

      if (seconds < 0) {
        secondsInput.value = "00";
      }
    }, 1000);
  } else {
    clearInterval(intervalId);
  }
}

function handleSettingsButton(event) {
  allInputs.forEach((input) => {
    input.disabled = !input.disabled;
  });

  [...time.children].forEach((child, i) => {
    if (child.tagName !== "LABEL") {
      if (child.classList.contains("lower-opacity")) {
        child.classList.remove("lower-opacity");
      } else {
        child.classList.add("lower-opacity");
      }
    }
  });

  settingsButton.classList.toggle("on");

  allInputs[0].focus();
}
