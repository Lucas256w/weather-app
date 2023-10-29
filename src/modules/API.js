import DisplayStats from "./DisplayStats";

let data;

class OpenWeatherApi {
  static async nameToCoords(cityName, currentMetric) {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "flex";
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=4fa3f0720ceb21b2300ab7ae8ff03f66`,
      );

      const coorddata = await response.json();
      if (coorddata.length !== 0) {
        OpenWeatherApi.latAndLonToWeather(
          coorddata[0].lat,
          coorddata[0].lon,
          cityName,
          currentMetric,
        );
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
