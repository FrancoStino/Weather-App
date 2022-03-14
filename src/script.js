//update date and hour and week
function resetDate(date)
{
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
dateShown.innerHTML = `${date.getDate()} ${year[date.getMonth()]}`;

let hour = date.getHours();
let minute = date.getMinutes();
let hourShown = document.querySelector(".clock");
if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}
hourShown.innerHTML = `${hour}:${minute}`;

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let weekSmall = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = date.getDay();
let dayOfweek = document.querySelector(".day-big");
dayOfweek.innerHTML = week[day];
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
/*resetDate(new Date(response.data.dt * 1000));
console.log(response.data.dt);
console.log(new Date(response.data.dt * 1000));*/
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
resetDate(new Date());

