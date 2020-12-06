const weather = document.querySelector(".js-weather");
function saveCoord(coordsobj) {
  localStorage.setItem("coords", JSON.stringify(coordsobj));
}
function getWeather(lat, lon) {
  console.log(lat, lon);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=78ad1bedba1523e99f8aa2817f319420&units=metric`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      const temp = json.main.temp;
      const place = json.name;
      weather.innerText = `Now ${place} is ${temp}🌡`;
    });
}
function handleGeoSucces(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const coordsObj = {
    lat,
    lon,
  };
  saveCoord(coordsObj);
  console.log(loadedCoord);
  getWeather(lat, lon);
}
function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, () => {
    console.log("geo location error");
  });
}
function loadCoords() {
  const loadedCoord = localStorage.getItem("coords");
  if (loadedCoord) {
    const parseCoord = JSON.parse(loadedCoord);
    console.log(parseCoord);
    console.log(parseCoord.lat);
    getWeather(parseCoord.lat, parseCoord.lon);
  } else askForCoords();
}

function init() {
  loadCoords();
}

init();
