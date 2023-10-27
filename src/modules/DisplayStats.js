import UnixTimeConverter from "./UnixTime";

class DisplayStats {
  static updateDisplay(data, cityName) {
    DisplayStats.updateLocationAndTime(data, cityName);
    DisplayStats.updateCurrentTemperature(data);
  }

  static updateLocationAndTime(data, cityName) {
    const location = document.querySelector("#location");
    const currentDate = document.querySelector("#current-date");

    location.textContent = cityName;
    currentDate.textContent = UnixTimeConverter.unixTimestampToDateString(
      data.current.dt,
    );
  }

  static updateCurrentTemperature(data) {
    const icon = document.querySelector("#current-weather-icon");
    const currentTemp = document.querySelector("#current-temperature");
    const currentTempSubText = document.querySelector(
      "#current-temperature-subtext",
    );

    icon.src = `./Images/${data.current.weather[0].main}.svg`;
    currentTemp.textContent = `${Math.round(data.current.temp)}°`;
    currentTempSubText.textContent = `${data.current.weather[0].main}`;
  }
}

export default DisplayStats;
