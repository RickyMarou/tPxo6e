const display = document.getElementById("display");
const numberButtons = document.querySelectorAll("[data-number]");

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", (event) => {
    appendNumber(event.target.innerHTML);
  });
});

function appendNumber(numberStr) {
  display.innerHTML += numberStr;
}

document.addEventListener("keydown", (keyboardEvent) => {
  const { key } = keyboardEvent;
  switch (key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      appendNumber(key);
      break;

    default:
      console.log(`pressed ${key}`);
      break;
  }
});
