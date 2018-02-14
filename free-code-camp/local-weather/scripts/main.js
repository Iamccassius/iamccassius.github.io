
/* The success-function is called when the geolocation was successfully determined */
function success(pos) {
  let location = pos.coords;
  let latitude = location.latitude;
  let longitude = location.longitude;

  /*The Openweathermap API is called with a getJSON request using the coordinates from the geolocation */
  $.getJSON(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=a823ad7bba736b25bf0604de42c11ee5`, function (response) {

    /* City and Country Name from API Information is passed into HTML */
    document.getElementById("city").innerHTML = `${response.name}, ${response.sys.country}`;

    /* Changes the weather icon depending on API weather ID */
    let weatherId = response.weather[0].icon;
    switch (weatherId) {
      case '01d':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-day-sunny");
        break;
      case '02d':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-day-cloudy");
        break;
      case '03d':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-cloud");
        break;
      case '04d':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-cloudy");
        break;
      case '09d':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-showers");
        break;
      case '10d':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-day-showers");
        break;
      case '11d':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-thunderstorm");
        break;
      case '13d':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-snow");
        break;
      case '50d':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-day-haze");
        break;
      case '01n':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-night-clear");
        break;
      case '02n':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-night-alt-cloudy");
        break;
      case '03n':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-cloud");
        break;
      case '04n':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-cloudy");
        break;
      case '09n':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-showers");
        break;
      case '10n':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-night-alt-showers");
        break;
      case '11n':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-thunderstorm");
        break;
      case '13n':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-snow");
        break;
      case '50n':
        document.getElementById("weather-icon").setAttribute("class", "wi wi-fog");
        break;

      default:
        document.getElementById("weather-icon").setAttribute = "wi wi-refresh";
    }

    /* Temperature in Kelvin from API is converted to Celsius and rounded to one decimal point */
    let tempCelsius = Math.round((response.main.temp - 273.15) * 10) / 10;
    document.getElementById("temperature").innerHTML = `${tempCelsius}`;

    /* Capitalized weather description from API is passed into HTML */
    document.getElementById("weather-description").innerHTML = `${response.weather[0].description}`;

    /* Wind speed and Cloudiness */
    let windInKmh = Math.round(response.wind.speed * 3.6);
    document.getElementById("wind-speed").innerHTML = `wind speed: ${windInKmh} km/h`;

    document.getElementById("cloudiness").innerHTML = `cloudiness: ${response.clouds.all}%`;

    /* Converts the API information about sunrise and sunset from epoch/unix to human readable date and stores it into HTML */
    let sunrise = new Date(response.sys.sunrise * 1000);
    let timeZoneSunrise = (-1) * (sunrise.getTimezoneOffset() / 60);
    let sunriseHours = sunrise.getUTCHours() + timeZoneSunrise;
    let sunriseMinutes = sunrise.getUTCMinutes();

    let sunset = new Date(response.sys.sunset * 1000);
    let timeZoneSunset = (-1) * (sunset.getTimezoneOffset() / 60);
    let sunsetHours = sunset.getUTCHours() + timeZoneSunset;
    let sunsetMinutes = sunset.getUTCMinutes();

    if (timeZoneSunrise >= 0) {
      document.getElementById("sunrise").innerHTML = `sunrise: ${sunriseHours}:${sunriseMinutes} UTC+${timeZoneSunrise}`;
      document.getElementById("sunset").innerHTML = `sunset: ${sunsetHours}:${sunsetMinutes} UTC+${timeZoneSunset}`;
    } else {
      document.getElementById("sunrise").innerHTML = `sunrise: ${sunriseHours}:${sunriseMinutes} UTC${timeZoneSunrise}`;
      document.getElementById("sunset").innerHTML = `sunset: ${sunsetHours}:${sunsetMinutes} UTC${timeZoneSunset}`;
    }

    /* Module to change the temperature unit from Celsius to Fahrenheit */

    document.getElementById("temp-unit").setAttribute("class", "temp-unit-active"); // Displays the temperature unit as a link once the temperature has succesfully been loaded from the API

    /* The tempUnit function is called, when you click on the temperature unit. It converts between Celsius and Fahrenheit */
    function changeTempUnit() {
      let tempUnit = document.getElementById("temp-unit").innerHTML;
      /* If the temperature unit is equal to °C convert the Kelvin API temp to Fahrenheit and display Fahrenheit */
      if (tempUnit === "°C") {
        let tempFahrenheit = Math.round((response.main.temp * (9/5) - 459.67) * 10) / 10;
        document.getElementById("temperature").innerHTML = tempFahrenheit;
        document.getElementById("temp-unit").innerHTML = "°F";
        document.getElementById("temp-unit").addEventListener("click", changeTempUnit);
      }
      /*else if the temperature unit is °F convert the Kelvin API temp to Celsius and display Celsius */
      else if (tempUnit === "°F") {
        let tempCelsius = Math.round((response.main.temp - 273.15) * 10) / 10;
        document.getElementById("temperature").innerHTML = `${tempCelsius}`;
        document.getElementById("temp-unit").innerHTML = "°C";
        document.getElementById("temp-unit").addEventListener("click", changeTempUnit);
      }
      else {
        document.getElementById("temp-unit").innerHTML = "N/A $Temp Unit Error$";    // error message
      }
    }; // closes the changeTempUnit function

    /* Adds an event listener to the temperature unit. When clicked it changes between Fahrenheit and Celsius. */
    document.getElementById("temp-unit").addEventListener("click", changeTempUnit);

  }); // closes the getJSON request

}; // closes the success function

/* The error-function is called when the geolocation was not successfull */
function error(err) {
  document.getElementById("city").innerHTML = "Your location could not be determined. Please enable GPS (on mobile), refresh the page and accept geolocation."
  console.log(err);
};

/* The code below will get executed once the page has fully loaded */
$(document).ready(function() {

  navigator.geolocation.getCurrentPosition(success, error);
  console.log("test");

});
