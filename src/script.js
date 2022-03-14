//update date and hour and week
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
updated.innerHTML=`<strong>${hour}:${minute}</strong>`;
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

let hour = date.getHours();
let minute = date.getMinutes();
let hourShown = document.querySelector(".clock");
if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}

let weekSmall = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = date.getDay();
hourShown.innerHTML = `${hour}:${minute} ${weekSmall[day]}`;
let daySmall = document.querySelector(".no1 p");
daySmall.innerHTML = weekSmall[(day + 1) % 7];
daySmall = document.querySelector(".no2 p");
daySmall.innerHTML = weekSmall[(day + 2) % 7];
daySmall = document.querySelector(".no3 p");
daySmall.innerHTML = weekSmall[(day + 3) % 7];
daySmall = document.querySelector(".no4 p");
daySmall.innerHTML = weekSmall[(day + 4) % 7];
daySmall = document.querySelector(".no5 p");
daySmall.innerHTML = weekSmall[(day + 5) % 7];
}
/*convert unit
function farToCel(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = "-6";
}
function CelToFar(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = "7";
}
let cel = document.querySelector("#cel");
let far = document.querySelector("#far");
cel.addEventListener("click", farToCel);
far.addEventListener("click", CelToFar);*/
//////API GEOLOCATION////
let apiKey = "5c295f8a5977862a68c4b22eb14217b5";


function getInfoOfCity(response){
let cityName = document.querySelector(".location-name-big");
cityName.innerHTML=response.data.name;
let cityTemp= document.querySelector("#temp");
cityTemp.innerHTML= Math.round(response.data.main.temp);
let cityDescription =document.querySelector(".weather-name-big"); 
cityDescription.innerHTML=response.data.weather[0].description;
let humidity = document.querySelector(".weather-humidity");
humidity.innerHTML=`<strong>humidity:</strong> ${response.data.main.humidity}%`;
let wind = document.querySelector(".weather-wind");
wind.innerHTML=`<strong>Wind:</strong> ${response.data.wind.speed}m/s`;
let percipitation = document.querySelector(".precipitation");
percipitation.innerHTML=`<strong>Feels like:</strong> ${Math.round(response.data.main.feels_like)}℃`;
lastUpdated(response.data.dt*1000);
let image = document.querySelector(".weather-photo-big");
image.setAttribute("src",`images/big/${response.data.weather[0].icon}.svg`);
image.setAttribute("alt",`${response.data.weather[0].description}`);
}

function getCurrent(pos) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.longitude}&lon=${pos.coords.latitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getInfoOfCity);
}
navigator.geolocation.getCurrentPosition(getCurrent);

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

let search = document.querySelector("#search");
search.addEventListener("submit",changeLocationToValue);

function prevent(event){
 event.preventDefault();
 navigator.geolocation.getCurrentPosition(getCurrent);
}

let here = document.querySelector("#here");
here.addEventListener("click",prevent);
systemDate();

