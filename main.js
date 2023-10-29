(()=>{"use strict";const e=class{static unixTimestampToDateString(e){return new Date(1e3*e).toLocaleDateString("en-Us",{weekday:"long",month:"long",day:"numeric"})}static unixTimestampToTime(e){const t=new Date(1e3*e),a=t.getHours(),n=t.getMinutes(),i=a>=12?"pm":"am";return`${a%12||12}:${String(n).padStart(2,"0")} ${i}`}static unixTimestampToMonthDate(e){const t=new Date(1e3*e);return`${t.getMonth()+1}/${t.getDate()}`}static unixTimestampToDateOfWeek(e){return new Date(1e3*e).toLocaleDateString("en-US",{weekday:"short"})}static unixTimestampToMilitaryTime(e){const t=new Date(1e3*e),a=t.getHours(),n=t.getMinutes();return`${String(a).padStart(2,"0")}:${String(n).padStart(2,"0")}`}};class t{static updateDisplay(e,a,n){t.updateLocationAndTime(e,a),t.updateCurrentTemperature(e,n),t.updateCurrentStats(e,n),t.updateHourlyCards(e,0,8,n),t.updateFiveDaysCards(e,n)}static updateLocationAndTime(t,a){const n=document.querySelector("#location"),i=document.querySelector("#current-date");n.textContent=a,i.textContent=e.unixTimestampToDateString(t.current.dt)}static updateCurrentTemperature(e,t){const a=document.querySelector("#current-weather-icon"),n=document.querySelector("#current-temperature"),i=document.querySelector("#current-temperature-subtext");let c;c="imperial"===t?"F":"C",a.src=`./Images/${e.current.weather[0].main}.svg`,n.textContent=`${Math.round(e.current.temp)}°${c}`,i.textContent=`${e.current.weather[0].main}`}static updateCurrentStats(t,a){const n=document.querySelector("#high-temp"),i=document.querySelector("#wind"),c=document.querySelector("#sunrise"),s=document.querySelector("#low-temp"),o=document.querySelector("#humidity"),r=document.querySelector("#sunset");let d,l;"imperial"===a?(d="mph",l="F",c.textContent=e.unixTimestampToTime(t.current.sunrise),r.textContent=e.unixTimestampToTime(t.current.sunset)):(d="m/s",l="C",c.textContent=e.unixTimestampToMilitaryTime(t.current.sunrise),r.textContent=e.unixTimestampToMilitaryTime(t.current.sunset)),n.textContent=`${t.daily[0].temp.max}°${l}`,s.textContent=`${t.daily[0].temp.min}°${l}`,i.textContent=`${t.current.wind_speed}${d}`,o.textContent=`${t.current.humidity}%`}static updateHourlyCards(t,a,n,i){const c=document.querySelector("#weather-by-hour-cards-container");c.innerHTML="";for(let s=a;s<n;s+=1){const a=document.createElement("div"),n=document.createElement("div"),o=document.createElement("img"),r=document.createElement("div");let d;a.className="weather-by-hour-cards",n.className="card-time",o.className="card-pic",r.className="card-temp","imperial"===i?(d="°F",n.textContent=e.unixTimestampToTime(t.hourly[s].dt)):(d="°C",n.textContent=e.unixTimestampToMilitaryTime(t.hourly[s].dt)),o.src=`./Images/${t.hourly[s].weather[0].main}.svg`,r.textContent=`${Math.round(t.hourly[s].temp)}${d}`,a.appendChild(n),a.appendChild(o),a.appendChild(r),c.appendChild(a)}}static updateFiveDaysCards(t,a){const n=document.querySelector("#next-five-days-cards-container");let i,c;n.innerHTML="","imperial"===a?(i="°F",c="mph"):(i="°C",c="m/s");for(let a=1;a<6;a+=1){const s=document.createElement("div"),o=document.createElement("div"),r=document.createElement("div"),d=document.createElement("div"),l=document.createElement("img"),m=document.createElement("div"),u=document.createElement("div"),p=document.createElement("div"),y=document.createElement("div"),h=document.createElement("div"),C=document.createElement("div"),g=document.createElement("div"),v=document.createElement("div"),x=document.createElement("div"),T=document.createElement("div"),S=document.createElement("div"),$=document.createElement("div");s.className="next-five-days-card",l.className="next-five-days-weather-icon",o.className="next-five-days-stats",m.className="next-five-days-stats",y.className="next-five-days-stats",g.className="next-five-days-stats",T.className="next-five-days-stats",l.src=`./images/${t.daily[a].weather[0].main}.svg`,r.textContent=e.unixTimestampToDateOfWeek(t.daily[a].dt),d.textContent=e.unixTimestampToMonthDate(t.daily[a].dt),u.textContent=`${t.daily[a].temp.min}${i}`,p.textContent="Low",h.textContent=`${t.daily[a].temp.max}${i}`,C.textContent="High",v.textContent=`${t.daily[a].wind_speed}${c}`,x.textContent="Wind",S.textContent=`${t.daily[a].humidity}%`,$.textContent="Humidity",o.appendChild(r),o.appendChild(d),m.appendChild(u),m.appendChild(p),y.appendChild(h),y.appendChild(C),g.appendChild(v),g.appendChild(x),T.appendChild(S),T.appendChild($),s.appendChild(o),s.appendChild(l),s.appendChild(m),s.appendChild(y),s.appendChild(g),s.appendChild(T),n.appendChild(s)}}}const a=t;let n;class i{static async nameToCoords(e,t){document.getElementById("loading-screen").style.display="flex";try{const a=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=5&appid=4fa3f0720ceb21b2300ab7ae8ff03f66`),n=await a.json();0!==n.length&&i.latAndLonToWeather(n[0].lat,n[0].lon,e,t)}catch(e){console.log(e)}}static async latAndLonToWeather(e,t,i,c){const s=document.getElementById("loading-screen");try{const s=await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${e}&lon=${t}&units=${c}&exclude=minutely,alerts&appid=4fa3f0720ceb21b2300ab7ae8ff03f66`);n=await s.json(),a.updateDisplay(n,i,c)}catch(e){console.log(e)}finally{s.style.display="none"}}}const c=i;let s="Boston";(function(){const e=document.querySelector("#search-bar"),t=document.querySelector("#confirm-search-btn"),i=document.querySelector("#metric-toggle"),o=document.querySelector("#fahrenheit"),r=document.querySelector("#celcius"),d=document.querySelector("#left-btn"),l=document.querySelector("#right-btn"),m=document.querySelector("#first-dot"),u=document.querySelector("#second-dot"),p=document.querySelector("#third-dot");let y="imperial";t.addEventListener("click",(()=>{c.nameToCoords(e.value,y),s=e.value,e.value="",m.className="dots active",u.className="dots",p.className="dots"})),i.addEventListener("click",(()=>{y="imperial"===y?"Metric":"imperial",o.classList.toggle("active-metric"),r.classList.toggle("active-metric"),m.className="dots active",u.className="dots",p.className="dots",c.nameToCoords(s,y)})),d.addEventListener("click",(()=>{u.classList.contains("active")?(u.classList.toggle("active"),m.classList.toggle("active"),a.updateHourlyCards(n,0,8,y)):p.classList.contains("active")&&(p.classList.toggle("active"),u.classList.toggle("active"),a.updateHourlyCards(n,8,16,y))})),l.addEventListener("click",(()=>{u.classList.contains("active")?(u.classList.toggle("active"),p.classList.toggle("active"),a.updateHourlyCards(n,16,24,y)):m.classList.contains("active")&&(m.classList.toggle("active"),u.classList.toggle("active"),a.updateHourlyCards(n,8,16,y))}))})(),c.nameToCoords("Boston","imperial")})();