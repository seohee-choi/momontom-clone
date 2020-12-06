const jsName = document.querySelector(".js-name");
const nameInput = jsName.querySelector("input");

const currentName = localStorage.getItem("NAME");

function storeName(event) {
  event.preventDefault();
  localStorage.setItem("NAME", nameInput.value);
  // console.log(event.target.value);
}

function init() {
  if (currentName) {
    nameInput.type = "hidden";
    jsName.innerHTML = `hello, ${currentName}`;
  }
  jsName.addEventListener("submit", storeName);
}

init();
