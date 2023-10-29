import DisplayStats from "./DisplayStats";

let data;

class OpenWeatherApi {
  static async nameToCoords(cityName, currentMetric) {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "flex";
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=4fa3f0720ceb21b2300ab7ae8ff03f66`,
        { mode: "cors" },
      );

      const coorddata = await response.json();
      /* eslint-disable no-else-return */
      if (coorddata.length !== 0) {
        OpenWeatherApi.latAndLonToWeather(
          coorddata[0].lat,
          coorddata[0].lon,
          cityName,
          currentMetric,
        );
        return true;
      } else {
        loadingScreen.style.display = "none";
        alert("Not a Real Place");
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async latAndLonToWeather(lat, lon, cityName, currentMetric) {
    const loadingScreen = document.getElementById("loading-screen");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${currentMetric}&exclude=minutely,alerts&appid=4fa3f0720ceb21b2300ab7ae8ff03f66`,
        { mode: "cors" },
      );

      data = await response.json();
      DisplayStats.updateDisplay(data, cityName, currentMetric);
    } catch (error) {
      console.log(error);
    } finally {
      loadingScreen.style.display = "none";
    }
  }
}

export { data };
export default OpenWeatherApi;
