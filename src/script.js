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

function getInfoOfCity(response){
let cityName = document.querySelector(".location-name-big");
cityName.innerHTML=response.data.name;
let cityTemp= document.querySelector("#temp");
cityTemp.innerHTML= Math.round(response.data.main.temp);
celcius = Math.round(response.data.main.temp);
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
 /* let no1 = document.querySelector(".no1");
  no1.innerHTML=toFarenheit(no1.innerHTML);
  let no2 =document.querySelector(".no2");
  no2.innerHTML=toFarenheit(no2.innerHTML);
  let no3 =document.querySelector(".no3");
  no3.innerHTML=toFarenheit(no3.innerHTML);
  let no4 =document.querySelector(".no4");
  no4.innerHTML=toFarenheit(no4.innerHTML);
  let no5 = document.querySelector(".no5");
  no5.innerHTML=toFarenheit(no5.innerHTML);*/
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
}
}

let celcius = null;
navigator.geolocation.getCurrentPosition(getCurrent);
let search = document.querySelector("#search");
search.addEventListener("submit",changeLocationToValue);
let here = document.querySelector("#here");
here.addEventListener("click",prevent);
systemDate();
let far=document.querySelector("button#far");
far.addEventListener("click",toFarenheitAll);
let cel= document.querySelector("button#cel");
cel.addEventListener("click",toCelciusAll);
/*let cel=document.querySelector("button#cel");
far.addEventListener("click",toCelciusAll);
*/
