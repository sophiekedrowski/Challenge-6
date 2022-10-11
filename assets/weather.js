//// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// var oneCallURL = "https://api.openweathermap.org/data/3.0/onecall?"
// var exclueItems = "minutely,hourly,alerts"

var weatherAPIkey = "b3a90c7d3eb0ba55e470bab86bc63863";

function forecast(lat, lon, userInput) {
    var forecastUrl =
        (`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIkey}`);

    // (`${oneCallURL}lat=${lat}&lon=${lon}&exclude=${exclueItems}&appid=${weatherAPIkey}`)
    fetch(forecastUrl)
        .then((res) => res.json())
        .then((res) => {
            function getWeather(day) {
                //Getting the date and converting from UNIX timestamp into correct format
                var unformattedDate = res.list[day].dt
                var date = new Date(unformattedDate * 1000);
                var formattedDate = moment(date).format("MM/DD/YYYY");
                //wind and humidity values
                var wind = ("Wind:") + res.list[day].wind.speed + (" MPH")
                var humidity = ("Humiditiy:") + res.list[day].main.humidity + ("%")
                //Converting the temp from K to F
                var temp = res.list[day].main.temp
                var actualTemp = (temp - 273.15) * 9 / 5 + 32
                var trueTemp = ("Temp:") + Math.round(actualTemp) + (" F°")
                //icon
                var icon = res.list[day].weather[0].icon
                var iconurl = `http://openweathermap.org/img/w/${icon}.png`
                var city = res.city.name
                //Creating an array with all my variables
                return { city: city, date: formattedDate, iconurl: iconurl, temp: trueTemp, wind: wind, humidity: humidity };
            }

            var currentWeather = getWeather(0);
            document.getElementById("city-date").innerHTML = `${currentWeather.city} (${currentWeather.date})`
            document.getElementById("temp").innerHTML = `${currentWeather.temp}`
            document.getElementById("wind").innerHTML = `${currentWeather.wind}`
            document.getElementById("humidity").innerHTML = `${currentWeather.humidity}`
            document.getElementById("current-icon").src = `${currentWeather.iconurl}`

            // For loops to go through my 5 day forecast
            var dayNumber = 1
            for (let i = 0; i < res.list.length; i++) {
                var dailyWeatherFormmated = getWeather(i);
                if (res.list[i].dt_txt.endsWith("9:00:00")) {
                    var dayDiv = document.getElementById(`day-${dayNumber}`).children
                    dayDiv[0].innerHTML = `${dailyWeatherFormmated.date}`
                    dayDiv[1].src = dailyWeatherFormmated.iconurl
                    dayDiv[2].innerHTML = `${dailyWeatherFormmated.temp}`
                    dayDiv[3].innerHTML = `${dailyWeatherFormmated.wind}`
                    dayDiv[4].innerHTML = `${dailyWeatherFormmated.humidity}`
                    dayNumber++

                }

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
            forecast(lat, lon, userInput);
            return lat, lon;
        });
}


document.getElementById("searchBtn").addEventListener("click", function (event) {
    event.preventDefault();
    var userCityInput = document.getElementById("UserInput").value
    var location = searchApi(userCityInput)
})

function GettingStorage() {
    var locations = JSON.parse(localStorage.getItem("userInput"));
    if (Array.isArray(locations) == false) {
    localStorage.setItem("userInput", JSON.stringify([]));
    }
    return locations
    }


GettingStorage();