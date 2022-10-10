//// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var weatherAPIkey = "b3a90c7d3eb0ba55e470bab86bc63863";

function forecast(lat, lon) {
    var forecastUrl =
        (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIkey}`);
    fetch(forecastUrl)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            console.log(res.list.slice(0, 5));

            //Getting the date and converting from UNIX timestamp into correct format
            var unformattedDate = res.list[0].dt
            var date = new Date(unformattedDate * 1000);
            var formattedDate = moment(date).format("DD/MM/YYYY");

            //wind and humidity values
            var wind = res.list[0].wind.speed + (" MPH")
            var humidity = res.list[0].main.humidity + (" %")

            //Converting the temp from K to F
            var temp = res.list[0].main.temp
            var actualTemp = (temp - 273.15) * 9 / 5 + 32
            var trueTemp = Math.round(actualTemp) + (" F°")

            //icon
            var icon = res.list[0].weather[0].icon
            var iconurl = `http://openweathermap.org/img/w/${icon}.png`

            //Creating an array with all my variables
            var todaysWeather = [wind, humidity, trueTemp, icon, formattedDate]


            //For loops to go through my 5 day forecast
            for (let i = 0; i < todaysWeather.length; i++) {
                const accurateDisplayedWeather = todaysWeather[i];
                console.log(accurateDisplayedWeather)
            }

        });
}


function searchApi(userInput) {
    var GeocodingApi = (`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${weatherAPIkey}`);
    fetch(GeocodingApi)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            var lon = res[0].lon;
            var lat = res[0].lat;
            console.log("lat: " + lat, "Lon: " + lon);
            forecast(lat, lon);
            return lat, lon;
        });
}


document.getElementById("searchBtn").addEventListener("click", function () {
    var userCityInput = document.getElementById("UserInput").value
    var location = searchApi(userCityInput)
    console.log(location)
})
