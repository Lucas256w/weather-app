import DisplayStats from "./DisplayStats";

class OpenWeatherApi {
  static async nameToCoords(cityName) {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=4fa3f0720ceb21b2300ab7ae8ff03f66`,
    );

    const data = await response.json();

    OpenWeatherApi.latAndLonToWeather(data[0].lat, data[0].lon, cityName);
  }

  static async latAndLonToWeather(lat, lon, cityName) {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=4fa3f0720ceb21b2300ab7ae8ff03f66`,
    );

    const data = await response.json();
    DisplayStats.updateDisplay(data, cityName);
  }
}

export default OpenWeatherApi;
