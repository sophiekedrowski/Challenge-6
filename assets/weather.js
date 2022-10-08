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
// var GeocodingApi = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=b3a90c7d3eb0ba55e470bab86bc63863";
var CurrentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=b3a90c7d3eb0ba55e470bab86bc63863"
var FiveDayApi = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=b3a90c7d3eb0ba55e470bab86bc63863"


var weatherAPIkey = "b3a90c7d3eb0ba55e470bab86bc63863";


function searchApi(userInput) {
  var GeocodingApi = (`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${weatherAPIkey}`);
  fetch(GeocodingApi)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      var lon = res.city.coord.lon;
      var lat = res.city.coord.lat;
      var cityID = res.city.id;
      console.log("lat: " + lat, "Lon: " + lon);
      function uvApi() {
        var uvUrl =
          "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
          lat + "&lon=" + lon + "&appid=" + weatherAPIkey + "&cnt=1";
        fetch(uvUrl)
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            var uvIndex = res[0].value;
            console.log(uvIndex);
            function forecast() {
              var forecastUrl =
                "https://api.openweathermap.org/data/2.5/forecast?id=" +
                cityID +
                "&appid=" +
                weatherAPIkey;
              fetch(forecastUrl)
                .then((res) => res.json())
                .then((res) => {
                  console.log(res.list.slice(0, 5));
                });
            }
            forecast();
          });
      }
      uvApi();
    });
}
;
return lat, lon;


document.getElementById("searchBtn").addEventListener("click", function () {
  var userCityInput = document.getElementById("UserInput").value
  var location = searchApi(userCityInput)
  console.log(location)
})
