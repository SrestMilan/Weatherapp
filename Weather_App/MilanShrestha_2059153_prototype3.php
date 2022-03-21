<?php
$mysqli = new mysqli("localhost","root","","db_2059153");// connecting to database db_2059153
// delay time for 10 sec  
$sql = "SELECT *
FROM weather
WHERE city = 'luton'# including city=luton
AND weather_when >= DATE_SUB(NOW(), INTERVAL 10 SECOND)  
ORDER BY weather_when DESC limit 1";
$result = $mysqli -> query($sql); 
// If 0 record found
if ($result->num_rows == 0) {
$url = 'https://api.openweathermap.org/data/2.5/weather?q=luton&appid=84c271388ed7d9fd812d27b74989329f&units=metric'; // fetching data from open weather api
// Get data from openweathermap and store in JSON object
$data = file_get_contents($url);
$json = json_decode($data, true);
// Fetch required fields
$weather_description = $json['weather'][0]['description']; # fetching the weather_description
$weather_temperature = $json['main']['temp'];
$weather_wind = $json['wind']['speed']; # fetching wind speed
$weather_when = date("Y-m-d H:i:s"); // fetching date and time
$city = $json['name'];
$weather_humidity = $json['main']['humidity'];
$weather_pressure = $json['main']['pressure'];
$weather_max = $json['main']['temp_max'];
$weather_min = $json['main']['temp_min'];
$weather_icon = $json['weather'][0]['icon'];# fetching icon according to weather_description



// Build INSERT SQL statement
$sql = "INSERT INTO weather (weather_description, weather_temperature, weather_wind,weather_when,city, weather_humidity, weather_pressure, weather_max, weather_min,weather_icon)
VALUES('{$weather_description}', {$weather_temperature}, {$weather_wind},'{$weather_when}','{$city}', {$weather_humidity}, {$weather_pressure}, {$weather_max}, {$weather_min},'{$weather_icon}');";
// Run SQL statement and report errors
if (!$mysqli -> query($sql)) {
echo("<h4>SQL error description: " . $mysqli -> error . "</h4>");

}
}
$sql = "SELECT *  # sql query for date
FROM weather
ORDER BY weather_when DESC limit 1";
$result = $mysqli -> query($sql);
// Get data, convert to JSON and print
$row = $result -> fetch_assoc();
print json_encode($row);
// Free result set and close connection
$result -> free_result();
$mysqli -> close();
?>