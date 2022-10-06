//// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var skAPIkey = "b3a90c7d3eb0ba55e470bab86bc63863";
var GeocodingApi = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=b3a90c7d3eb0ba55e470bab86bc63863";
var CurrentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=b3a90c7d3eb0ba55e470bab86bc63863"
var FiveDayApi = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=b3a90c7d3eb0ba55e470bab86bc63863"


fetch(GeocodingApi)
.then((response) => response.json())
.then((data) => console.log(data));



