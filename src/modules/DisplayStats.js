import UnixTimeConverter from "./UnixTime";

class DisplayStats {
  static updateDisplay(data, cityName, currentMetric) {
    DisplayStats.updateLocationAndTime(data, cityName);
    DisplayStats.updateCurrentTemperature(data, currentMetric);
    DisplayStats.updateCurrentStats(data, currentMetric);
    DisplayStats.updateHourlyCards(data, 0, 8, currentMetric);
    DisplayStats.updateFiveDaysCards(data, currentMetric);
  }

  static updateLocationAndTime(data, cityName) {
    const location = document.querySelector("#location");
    const currentDate = document.querySelector("#current-date");

    location.textContent = cityName;
    currentDate.textContent = UnixTimeConverter.unixTimestampToDateString(
      data.current.dt,
    );
  }

  static updateCurrentTemperature(data, currentMetric) {
    const icon = document.querySelector("#current-weather-icon");
    const currentTemp = document.querySelector("#current-temperature");
    const currentTempSubText = document.querySelector(
      "#current-temperature-subtext",
    );
    let unit;
    if (currentMetric === "imperial") {
      unit = "F";
    } else {
      unit = "C";
    }

    icon.src = `./images/${data.current.weather[0].main}.svg`;
    currentTemp.textContent = `${Math.round(data.current.temp)}°${unit}`;
    currentTempSubText.textContent = `${data.current.weather[0].main}`;
  }

  static updateCurrentStats(data, currentMetric) {
    const highTemp = document.querySelector("#high-temp");
    const wind = document.querySelector("#wind");
    const sunrise = document.querySelector("#sunrise");
    const lowTemp = document.querySelector("#low-temp");
    const humidity = document.querySelector("#humidity");
    const sunset = document.querySelector("#sunset");

    let unitWind;
    let unitTemp;
    if (currentMetric === "imperial") {
      unitWind = "mph";
      unitTemp = "F";
      sunrise.textContent = UnixTimeConverter.unixTimestampToTime(
        data.current.sunrise,
      );
      sunset.textContent = UnixTimeConverter.unixTimestampToTime(
        data.current.sunset,
      );
    } else {
      unitWind = "m/s";
      unitTemp = "C";
      sunrise.textContent = UnixTimeConverter.unixTimestampToMilitaryTime(
        data.current.sunrise,
      );
      sunset.textContent = UnixTimeConverter.unixTimestampToMilitaryTime(
        data.current.sunset,
      );
    }

    highTemp.textContent = `${data.daily[0].temp.max}°${unitTemp}`;
    lowTemp.textContent = `${data.daily[0].temp.min}°${unitTemp}`;

    wind.textContent = `${data.current.wind_speed}${unitWind}`;

    humidity.textContent = `${data.current.humidity}%`;
  }

  static updateHourlyCards(data, start, end, currentMetric) {
    const container = document.querySelector(
      "#weather-by-hour-cards-container",
    );
    container.innerHTML = "";

    for (let i = start; i < end; i += 1) {
      const card = document.createElement("div");
      const cardTime = document.createElement("div");
      const cardPic = document.createElement("img");
      const cardTemp = document.createElement("div");
      card.className = "weather-by-hour-cards";
      cardTime.className = "card-time";
      cardPic.className = "card-pic";
      cardTemp.className = "card-temp";

      let unitTemp;
      if (currentMetric === "imperial") {
        unitTemp = "°F";
        cardTime.textContent = UnixTimeConverter.unixTimestampToTime(
          data.hourly[i].dt,
        );
      } else {
        unitTemp = "°C";
        cardTime.textContent = UnixTimeConverter.unixTimestampToMilitaryTime(
          data.hourly[i].dt,
        );
      }

      // cardTime.textContent = UnixTimeConverter.unixTimestampToTime(
      //   data.hourly[i].dt,
      // );
      cardPic.src = `./images/${data.hourly[i].weather[0].main}.svg`;
      cardTemp.textContent = `${Math.round(data.hourly[i].temp)}${unitTemp}`;

      card.appendChild(cardTime);
      card.appendChild(cardPic);
      card.appendChild(cardTemp);

      container.appendChild(card);
    }
  }

  static updateFiveDaysCards(data, currentMetric) {
    const container = document.querySelector("#next-five-days-cards-container");
    container.innerHTML = "";

    let unitTemp;
    let unitWind;
    if (currentMetric === "imperial") {
      unitTemp = "°F";
      unitWind = "mph";
    } else {
      unitTemp = "°C";
      unitWind = "m/s";
    }

    for (let i = 1; i < 6; i += 1) {
      const card = document.createElement("div");
      const cardDay = document.createElement("div");
      const dayMain = document.createElement("div");
      const daySub = document.createElement("div");
      const img = document.createElement("img");
      const cardTempLow = document.createElement("div");
      const lowMain = document.createElement("div");
      const lowSub = document.createElement("div");
      const cardTempHigh = document.createElement("div");
      const highMain = document.createElement("div");
      const highSub = document.createElement("div");
      const cardWind = document.createElement("div");
      const windMain = document.createElement("div");
      const windSub = document.createElement("div");
      const cardHumidity = document.createElement("div");
      const humidityMain = document.createElement("div");
      const humiditySub = document.createElement("div");

      card.className = "next-five-days-card";
      img.className = "next-five-days-weather-icon";
      cardDay.className = "next-five-days-stats";
      cardTempLow.className = "next-five-days-stats";
      cardTempHigh.className = "next-five-days-stats";
      cardWind.className = "next-five-days-stats";
      cardHumidity.className = "next-five-days-stats";

      img.src = `./images/${data.daily[i].weather[0].main}.svg`;

      dayMain.textContent = UnixTimeConverter.unixTimestampToDateOfWeek(
        data.daily[i].dt,
      );
      daySub.textContent = UnixTimeConverter.unixTimestampToMonthDate(
        data.daily[i].dt,
      );

      lowMain.textContent = `${data.daily[i].temp.min}${unitTemp}`;
      lowSub.textContent = "Low";

      highMain.textContent = `${data.daily[i].temp.max}${unitTemp}`;
      highSub.textContent = "High";

      windMain.textContent = `${data.daily[i].wind_speed}${unitWind}`;
      windSub.textContent = "Wind";

      humidityMain.textContent = `${data.daily[i].humidity}%`;
      humiditySub.textContent = "Humidity";

      cardDay.appendChild(dayMain);
      cardDay.appendChild(daySub);

      cardTempLow.appendChild(lowMain);
      cardTempLow.appendChild(lowSub);

      cardTempHigh.appendChild(highMain);
      cardTempHigh.appendChild(highSub);

      cardWind.appendChild(windMain);
      cardWind.appendChild(windSub);

      cardHumidity.appendChild(humidityMain);
      cardHumidity.appendChild(humiditySub);

      card.appendChild(cardDay);
      card.appendChild(img);
      card.appendChild(cardTempLow);
      card.appendChild(cardTempHigh);
      card.appendChild(cardWind);
      card.appendChild(cardHumidity);

      container.appendChild(card);
    }
  }
}

export default DisplayStats;
