const settings = document.querySelector(".settings");
const allInputs = document.querySelectorAll("input");
const startButton = document.querySelector(".start");
const time = document.querySelector(".time");

console.log(allInputs);

settings.addEventListener("click", () => {
  allInputs.forEach((input) => {
    input.disabled = !input.disabled;
  });

  [...time.children].forEach((child, i) => {
    if (child.classList.contains("lower-opacity")) {
      child.classList.remove("lower-opacity");
    } else {
      child.classList.add("lower-opacity");
    }
  });

  allInputs[0].focus();
});

allInputs.forEach((input, i) => {
  input.addEventListener("focus", (event) => {
    input.parentElement.classList.remove("lower-opacity");
  });

  input.addEventListener("blur", (event) => {
    input.parentElement.classList.add("lower-opacity");

    // Revert to original state on
    if (i === 1) {
      allInputs.forEach((input) => {
        input.disabled = !input.disabled;
      });

      [...time.children].forEach((child) => {
        child.classList.remove("lower-opacity");
      });
    }
  });
});

startButton.addEventListener("click", handleStart);

function handleStart(event) {
  const wrapper = document.querySelector(".wrapper");
  const ring = document.querySelector(".ring");
  const colon = document.querySelector(".colon");
  const body = document.querySelector("body");

  settings.disabled = !settings.disabled;

  wrapper.classList.toggle("on");
  ring.classList.toggle("on");
  colon.classList.toggle("on");
  startButton.classList.toggle("on");
  body.classList.toggle("on");

  allInputs.forEach((input) => {
    if (!input.disabled) {
      input.disabled = !input.disabled;
    }

    input.classList.toggle("on");
  });

  [...time.children].forEach((child) => {
    child.classList.remove("lower-opacity");
  });

  if (startButton.children[0].textContent === "play_arrow") {
    startButton.children[0].textContent = "pause";
  } else {
    startButton.children[0].textContent = "play_arrow";
  }
}
