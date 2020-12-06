const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `src/images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  console.log(image);
  body.prepend(image);
}

function init() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    paintImage(number);
}

init();