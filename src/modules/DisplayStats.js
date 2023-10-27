import UnixTimeConverter from "./UnixTime";

class DisplayStats {
  static updateDisplay(data, cityName) {
    DisplayStats.updateLocationAndTime(data, cityName);
    DisplayStats.updateCurrentTemperature(data);
    DisplayStats.updateCurrentStats(data);
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

  static updateCurrentStats(data) {
    const highTemp = document.querySelector("#high-temp");
    const wind = document.querySelector("#wind");
    const sunrise = document.querySelector("#sunrise");
    const lowTemp = document.querySelector("#low-temp");
    const humidity = document.querySelector("#humidity");
    const sunset = document.querySelector("#sunset");

    highTemp.textContent = data.daily[0].temp.max;
    lowTemp.textContent = data.daily[0].temp.min;
    wind.textContent = `${data.current.wind_speed}mph`;
    sunrise.textContent = UnixTimeConverter.unixTimestampToTime(
      data.current.sunrise,
    );
    sunset.textContent = UnixTimeConverter.unixTimestampToTime(
      data.current.sunset,
    );
    humidity.textContent = `${data.current.humidity}%`;
  }
}

export default DisplayStats;
