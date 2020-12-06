
const jsClock = document.querySelector(".js-clock");
const jsH1 = jsClock.querySelector("h1");

function getTime() {
  const today = new Date();

  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();

  jsH1.innerText = `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
}

function init(){
  getTime();
  setInterval(getTime, 1000);
}

init();