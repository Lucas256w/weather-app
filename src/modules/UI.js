import OpenWeatherApi from "./API";

function activateUI() {
  const input = document.querySelector("#search-bar");
  const searchBtn = document.querySelector("#confirm-search-btn");

  searchBtn.addEventListener("click", () => {
    OpenWeatherApi.nameToCoords(input.value);
    input.value = "";
  });
}

export default activateUI;
