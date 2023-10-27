import OpenWeatherApi, { data } from "./API";
import DisplayStats from "./DisplayStats";

function activateUI() {
  const input = document.querySelector("#search-bar");
  const searchBtn = document.querySelector("#confirm-search-btn");
  const leftBtn = document.querySelector("#left-btn");
  const rightBtn = document.querySelector("#right-btn");
  const firstDot = document.querySelector("#first-dot");
  const secondDot = document.querySelector("#second-dot");
  const thirdDot = document.querySelector("#third-dot");

  searchBtn.addEventListener("click", () => {
    OpenWeatherApi.nameToCoords(input.value);
    input.value = "";
    firstDot.className = "dots active";
    secondDot.className = "dots";
    thirdDot.className = "dots";
  });

  leftBtn.addEventListener("click", () => {
    if (secondDot.classList.contains("active")) {
      secondDot.classList.toggle("active");
      firstDot.classList.toggle("active");
      DisplayStats.updateHourlyCards(data, 0, 8);
    } else if (thirdDot.classList.contains("active")) {
      thirdDot.classList.toggle("active");
      secondDot.classList.toggle("active");
      DisplayStats.updateHourlyCards(data, 8, 16);
    }
  });

  rightBtn.addEventListener("click", () => {
    if (secondDot.classList.contains("active")) {
      secondDot.classList.toggle("active");
      thirdDot.classList.toggle("active");
      DisplayStats.updateHourlyCards(data, 16, 24);
    } else if (firstDot.classList.contains("active")) {
      firstDot.classList.toggle("active");
      secondDot.classList.toggle("active");
      DisplayStats.updateHourlyCards(data, 8, 16);
    }
  });
}

export default activateUI;
