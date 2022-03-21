// Check browser cache first, use if there and less than 10 seconds old
if(localStorage.when != null
  && parseInt(localStorage.when) + 10000 > Date.now()) {
  let freshness = Math.round((Date.now() - localStorage.when)/1000) + " second(s)";
  document.getElementById("descrip").innerHTML = localStorage.description; // calling description from localstorage
  document.getElementById("temperr").innerHTML = localStorage.temperature; // calling temperature from localstorage
  document.getElementById("favsss").innerHTML= localStorage.city; // calling city from localstorage
  document.getElementById("humid").innerHTML= "Humidity:" + " "+localStorage.humidity+"%";// calling humidity from localstorage
  document.getElementById("Winds").innerHTML="Wind:" + " "+localStorage.wind+"km/hr";// calling wind from localstorage
  document.getElementById("pressu").innerHTML= "Pressure:"+" "+localStorage.pressure+"hPa";//calling pressure from localstorage
  document.getElementById("Tempr").innerHTML=localStorage.Tempers;// calling min-max temperature from localstorage
  document.getElementById("icons").src = "http://openweathermap.org/img/wn/"+localStorage.icon+".png"; // calling icon from localstorage
  document.getElementById("date").innerHTML=localStorage.time;// calling date from localstorage
  // No local cache, access network
  } else {

fetch('http://localhost/Weather_App/MilanShrestha_2059153_prototype3.php')// connecting js with php to fetch data
.then(function(response){
	return response.json()
}).then(function(response){
  console.log(response)
  document.getElementById("favsss").innerHTML = response.city; // fetching id from html content and link with JSON to get city
  document.getElementById("descrip").innerHTML =  response.weather_description;  // fetching id from html content and link with JSON to get weather_description
  document.getElementById("humid").innerHTML = "Humidity: " + response.weather_humidity + "%"; // fetching id from html content and link with JSON to get weather_humidity
  document.getElementById("Winds").innerText =  "Wind: " + response.weather_wind+ " km/hr"; // fetching id from html content and link with JSON to get weather_wind
  document.getElementById("temperr").innerHTML = response.weather_temperature + "°C";               // fetching id from html content and link with JSON to get weatehr_temperature
  document.getElementById("Tempr").innerHTML = "Min:"+ " " + response.weather_min + "°C" +","+" " + "Max:"+ " "+response.weather_max + "°C"; // fetching html content Temp from JSON to get max/min temperature
  document.getElementById("pressu").innerHTML="Pressure:" + response.weather_pressure+ " "+"hPa"; // fetching id from html  and link with JSON to get weather_pressure
  document.getElementById("icons").src = "http://openweathermap.org/img/wn/"+response.weather_icon+".png";// fetching id from html  and link with JSON to get weather_icon
  document.getElementById("date").innerHTML="Time:"+ " " +response.weather_when;
// Save new data to browser, with new timestamp
localStorage.city = response.city;
localStorage.temperature = response.weather_temperature+ "°C";
localStorage.icon=response.weather_icon;
localStorage.description = response.weather_description;
localStorage.humidity = response.weather_humidity;
localStorage.wind = response.weather_wind;
localStorage.pressure = response.weather_pressure;
localStorage.Tempers = "Min:"+ " " + response.weather_min + "°C" +","+" " + "Max:"+ " "+response.weather_max + "°C";
localStorage.time= "Time:"+ " "  +response.weather_when;
localStorage.when = Date.now(); // milliseconds since January 1 1970



})

.catch((err) => {  // handle error
 console.log(err);  // Displaying error in console
});
  }