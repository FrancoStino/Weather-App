let apiKey = "5c295f8a5977862a68c4b22eb14217b5";

function lastUpdated(timestamp){
let date = new Date(timestamp);
let updated = document.querySelector("#updated");
let hour = date.getHours();
let minute = date.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}
updated.innerHTML=`${hour}:${minute}`;
}

function systemDate()
{
  date = new Date();
let year = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let dateShown = document.querySelector("#date-html");
dateShown.innerHTML = `${date.getDate()} ${year[date.getMonth()]} ${date.getYear()+1900}`;
  let weekSmall = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
let hour = date.getHours();
let minute = date.getMinutes();
let hourShown = document.querySelector(".clock");
if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}
hourShown.innerHTML = `${hour}:${minute} ${weekSmall[day]}`;
}

function getInfoOfCity(response){
let cityName = document.querySelector(".location-name-big");
cityName.innerHTML=response.data.name;

let country = document.getElementById("country");
if(response.data.sys.country === undefined){
  country.innerHTML = "";
}
else{
 country.innerHTML=response.data.sys.country;
}
let active =document.getElementsByClassName("active");
let far = document.getElementById("far");
if(active[0]!==far){
changeActive();
}
let signLittle = document.querySelector("#signLittle");
 signLittle.innerHTML ="°C";
let cityTemp= document.querySelector("#temp");
celcius = Math.round(response.data.main.temp);
cityTemp.innerHTML= Math.round(response.data.main.temp);
let cityDescription =document.querySelector(".weather-name-big"); 
cityDescription.innerHTML=response.data.weather[0].description;
let humidity = document.querySelector(".weather-humidity");
humidity.innerHTML=`<strong>humidity:</strong> ${response.data.main.humidity}%`;
let wind = document.querySelector(".weather-wind");
wind.innerHTML=`<strong>Wind:</strong> ${response.data.wind.speed}m/s`;
let percipitation = document.querySelector("#feels");
percipitation.innerHTML=`${Math.round(response.data.main.feels_like)}`;
lastUpdated(response.data.dt*1000);
let image = document.querySelector(".weather-photo-big");
image.setAttribute("src",`images/big/${response.data.weather[0].icon}.svg`);
image.setAttribute("alt",`${response.data.weather[0].description}`);
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
axios.get(forecastUrl).then(forecastApi);
}

function getCurrent(pos) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.longitude}&lon=${pos.coords.latitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getInfoOfCity);
}

function getResponse(cityName){
  let cityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(cityUrl).then(getInfoOfCity);
}

function changeLocationToValue(event){
event.preventDefault();
let input = document.querySelector("input");
let input2 = input.value.trim();
input.value='';
getResponse(input2);
}

function prevent(event){
 event.preventDefault();
 navigator.geolocation.getCurrentPosition(getCurrent);


}

function forecastApi(response){
  for(let i=1;i<6;i++){
  let dayMax = document.querySelector(`.no${i} .max`);
  dayMax.innerHTML =Math.round(response.data.daily[i].temp.max);
    let dayMin = document.querySelector(`.no${i} .min`);
  dayMin.innerHTML =Math.round(response.data.daily[i].temp.min);
  let img = document.querySelector(`.no${i} img`);
  img.setAttribute("src",`images/small/${response.data.daily[i].weather[0].icon}.svg`);
  img.setAttribute("alt",`${response.data.daily[i].weather[0].description}`);
  }
}

function displayForecast(){
  let forecast = document.querySelector(".forecast");
  let weekSmall = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date();
  let day = date.getDay();
  forecast.innerHTML =`<div class="col-1 col-md-1"></div>`;
  let size = 5;
  for(let i=1;i<6;i++){
    if(i===3 || i===5){
        forecast.innerHTML = forecast.innerHTML + `<div class="col-1 col-md-auto no-gutters "></div>
      <div class="col-1 col-md-auto no-gutters"></div>`;
    }
    if(i==5){
      size=10;
    }
  forecast.innerHTML = forecast.innerHTML +`
   <div class="col-${size} col-md-2">
        <div class="card no${i}" style="width: 100%;">
          <img class="card-img-top" src="images/animated/snowy-3.svg" alt="Card image cap" />
          <div>
            <p class="card-text">${weekSmall[(day + i) % 7]}</p>
          </div>
          <h7 class="card-text"><span class="max">9</span>° / <span class="min">12</span>°</h7>
        </div>
      </div>
  `
}
}

function changeActive(){

let active =document.getElementsByClassName("active");

let far = document.getElementById("far");
let cel = document.getElementById("cel");

if(active[0]===far){
  cel.classList.add("active");
  far.classList.remove("active");
}
else{
  far.classList.add("active");
  cel.classList.remove("active");
}
}

function toFarenheit(num){
 return Math.round(num*9/5 +32);
}

function toCelcius(num){
  return Math.round((num-32)*5 / 9);
}

function toFarenheitAll(event){
event.preventDefault();
let tempBig= document.querySelector("#temp");
if(tempBig.innerHTML==celcius){
  tempBig.innerHTML=toFarenheit(tempBig.innerHTML);
  let feels = document.querySelector("#feels");
  feels.innerHTML =toFarenheit(feels.innerHTML);
  let signLittle = document.querySelector("#signLittle");
 signLittle.innerHTML ="°F";
 for(let i=1;i<6;i++){
  let dayMax = document.querySelector(`.no${i} .max`);
  dayMax.innerHTML =toFarenheit(dayMax.innerHTML);
    let dayMin = document.querySelector(`.no${i} .min`);
  dayMin.innerHTML = toFarenheit(dayMin.innerHTML);
  }
  changeActive();
}
else{
  return;
}
}

function toCelciusAll(event){
  event.preventDefault();
let tempBig= document.querySelector("#temp");
if(tempBig.innerHTML==celcius){
  return;
}
else{
  tempBig.innerHTML=toCelcius(tempBig.innerHTML);
  let feels = document.querySelector("#feels");
  feels.innerHTML = toCelcius(feels.innerHTML);
  let signLittle = document.querySelector("#signLittle");
 signLittle.innerHTML ="°C";
  for(let i=1;i<6;i++){
  let dayMax = document.querySelector(`.no${i} .max`);
  dayMax.innerHTML =toCelcius(dayMax.innerHTML);
    let dayMin = document.querySelector(`.no${i} .min`);
  dayMin.innerHTML = toCelcius(dayMin.innerHTML);
  }
 changeActive();

}
}

systemDate();
displayForecast();
let celcius = null;
navigator.geolocation.getCurrentPosition(getCurrent);
let search = document.querySelector("#search");
search.addEventListener("submit",changeLocationToValue);
let here = document.querySelector("#here");
here.addEventListener("click",prevent);
let far=document.querySelector("button#far");
far.addEventListener("click",toFarenheitAll);
let cel= document.querySelector("button#cel");
cel.addEventListener("click",toCelciusAll);
