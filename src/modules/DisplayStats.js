import UnixTimeConverter from "./UnixTime";

class DisplayStats {
  static updateDisplay(data, cityName) {
    DisplayStats.updateLocationAndTime(data, cityName);
    DisplayStats.updateCurrentTemperature(data);
    DisplayStats.updateCurrentStats(data);
    DisplayStats.updateHourlyCards(data, 0, 8);
    DisplayStats.updateHourlyCardsBtns(data);
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

  static updateHourlyCards(data, start, end) {
    const container = document.querySelector(
      "#weather-by-hour-cards-container",
    );
    container.innerHTML = "";

    for (let i = start; i < end; i++) {
      const card = document.createElement("div");
      const cardTime = document.createElement("div");
      const cardPic = document.createElement("img");
      const cardTemp = document.createElement("div");
      card.className = "weather-by-hour-cards";
      cardTime.className = "card-time";
      cardPic.className = "card-pic";
      cardTemp.className = "card-temp";

      cardTime.textContent = UnixTimeConverter.unixTimestampToTime(
        data.hourly[i].dt,
      );
      cardPic.src = `./Images/${data.hourly[i].weather[0].main}.svg`;
      cardTemp.textContent = `${Math.round(data.hourly[i].temp)}°`;

      card.appendChild(cardTime);
      card.appendChild(cardPic);
      card.appendChild(cardTemp);

      container.appendChild(card);
    }
  }

  static updateHourlyCardsBtns(data) {
    const leftBtn = document.querySelector("#left-btn");
    const rightBtn = document.querySelector("#right-btn");
    const firstDot = document.querySelector("#first-dot");
    const secondDot = document.querySelector("#second-dot");
    const thirdDot = document.querySelector("#third-dot");

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
}

export default DisplayStats;
