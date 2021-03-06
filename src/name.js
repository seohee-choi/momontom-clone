const jsName = document.querySelector(".js-name");
const nameInput = jsName.querySelector("input");
const H3 = document.querySelector("h3");

function storeName(event) {
  event.preventDefault();
  localStorage.setItem("NAME", nameInput.value);
  paint(nameInput.value);
}

function paint(currentName) {
  jsName.innerHTML = `hello, ${currentName}`;
}

function init() {
  const currentName = localStorage.getItem("NAME");
  if (currentName) {
    paint(currentName);
  } else {
    // jsName.classList.add("NAME");
    jsName.addEventListener("submit", storeName);
  }
}

init();
