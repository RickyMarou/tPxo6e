const displayContent = document.getElementById("display-content");
const numberButtons = document.querySelectorAll("[data-number]");

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", (event) => {
    appendNumber(event.target.innerHTML);
  });
});

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
    case "Backspace":
      popNumber();
      break;
    default:
      console.log(`pressed ${key}`);
      break;
  }
});

function appendNumber(numberStr) {
  displayContent.innerHTML += numberStr;
  adjustDisplaySize();
}

function popNumber() {
  displayContent.innerHTML = displayContent.innerHTML.slice(0, -1);
  adjustDisplaySize();
}

function adjustDisplaySize() {
  const contentLength = displayContent.innerHTML.length;
  if (contentLength <= 8) {
    displayContent.style.fontSize = undefined;
    return;
  }

  const overflowingCharacterCount = contentLength - 8;
  const fontSize = Math.max(0.3, 1 - overflowingCharacterCount * 0.1);

  displayContent.style.fontSize = `${fontSize}em`;
}
