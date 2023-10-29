import OpenWeatherApi, { data } from "./API";
import DisplayStats from "./DisplayStats";

let currentCity = "Boston";

function activateUI() {
  const input = document.querySelector("#search-bar");
  const searchBtn = document.querySelector("#confirm-search-btn");
  const toggleMetric = document.querySelector("#metric-toggle");
  const fahrenheit = document.querySelector("#fahrenheit");
  const celcius = document.querySelector("#celcius");
  const leftBtn = document.querySelector("#left-btn");
  const rightBtn = document.querySelector("#right-btn");
  const firstDot = document.querySelector("#first-dot");
  const secondDot = document.querySelector("#second-dot");
  const thirdDot = document.querySelector("#third-dot");
  let currentMetric = "imperial";

  searchBtn.addEventListener("click", () => {
    const state = OpenWeatherApi.nameToCoords(input.value, currentMetric);
    console.log(state);
    state.then((result) => {
      if (result === true) {
        currentCity = input.value;
        firstDot.className = "dots active";
        secondDot.className = "dots";
        thirdDot.className = "dots";
      }
    });
    input.value = "";
  });

  toggleMetric.addEventListener("click", () => {
    console.log(currentCity);
    if (currentMetric === "imperial") {
      currentMetric = "Metric";
    } else {
      currentMetric = "imperial";
    }
    fahrenheit.classList.toggle("active-metric");
    celcius.classList.toggle("active-metric");
    firstDot.className = "dots active";
    secondDot.className = "dots";
    thirdDot.className = "dots";
    OpenWeatherApi.nameToCoords(currentCity, currentMetric);
  });

  leftBtn.addEventListener("click", () => {
    if (secondDot.classList.contains("active")) {
      secondDot.classList.toggle("active");
      firstDot.classList.toggle("active");
      DisplayStats.updateHourlyCards(data, 0, 8, currentMetric);
    } else if (thirdDot.classList.contains("active")) {
      thirdDot.classList.toggle("active");
      secondDot.classList.toggle("active");
      DisplayStats.updateHourlyCards(data, 8, 16, currentMetric);
    }
  });

  rightBtn.addEventListener("click", () => {
    if (secondDot.classList.contains("active")) {
      secondDot.classList.toggle("active");
      thirdDot.classList.toggle("active");
      DisplayStats.updateHourlyCards(data, 16, 24, currentMetric);
    } else if (firstDot.classList.contains("active")) {
      firstDot.classList.toggle("active");
      secondDot.classList.toggle("active");
      DisplayStats.updateHourlyCards(data, 8, 16, currentMetric);
    }
  });
}

export default activateUI;
export { currentCity };
