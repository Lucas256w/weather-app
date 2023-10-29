import activateUI from "./modules/UI";
import OpenWeatherApi from "./modules/API";

activateUI();
OpenWeatherApi.nameToCoords("Boston", "imperial");
