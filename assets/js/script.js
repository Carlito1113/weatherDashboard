$(document).ready(function () {
  // weather button
  $('#weather-btn').on('click', function (event) {
    event.preventDefault();

    var cityInput = $('#weather-input').val().trim();
    console.log(cityInput);

    if (cityInput === '') {
      alert('You must enter a city');
      return;
    }

    currentWeather(cityInput);
    forecast(cityInput);
  });

  function currentWeather(city) {
    $.ajax({
      method: 'GET',
      url:
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&appid=2b082fc72e5c1ea2495f67dc43747872&units=imperial',

      // weather data function
    }).then(function (data) {
      console.log(data);

      var cityObj = {
        cityName: data.name,
        cityTemp: data.main.temp,
        cityHumidity: data.main.humidity,
        cityWindSpeed: data.wind.speed,
        cityWeatherIconName: data.weather[0].icon,
      };
      // latitude and longitude data pull
      var cityLon = data.coord.lon;
      var cityLat = data.coord.lat;

      let queryUrl =
        'https://api.openweathermap.org/data/2.5/uvi?lat=' +
        cityLat +
        '&lon=' +
        cityLon +
        '&appid=2b082fc72e5c1ea2495f67dc43747872&units=imperial';
      $.ajax({
        url: queryUrl,
        method: 'GET',
      }).then(function (uv) {
        console.log(uv);
      });
    });
  }

  function forecast(city) {
    $('.forecastDiv').empty();

    $.ajax({
      method: 'GET',
      url:
        'https://api.openweathermap.org/data/2.5/forecast?q=' +
        city +
        '&appid=2b082fc72e5c1ea2495f67dc43747872&units=imperial',
    }).then(function (data) {
      console.log(data);
      //
      for (var i = 0; i != data.list.length; i = i + 8) {
        // storing all info needed in an object
        var cityInfo = {
          date: data.list[i].dt_txt,
          temp: data.list[i].main.temp,
          humidity: data.list[i].main.humidity,
          icon: data.list[i].weather[0].icon,
        };
        var weatherIcon =
          'https:///openweathermap.org/img/w/' + cityInfo.icon + '.png';
        // put the 5 day forecast on the page
        appendForecast(weatherIcon, cityInfo.temp, cityInfo.humidity);
      }
    });
  }

  function appendForecast(icon, temp, humidity) {
    var forecastDiv = $('<div>');
    forecastDiv.addClass('col-sm-2');
    var weatherIcon = $('<img>');
    weatherIcon.attr('src', icon);
    var weatherTemp = $('<p>');
    weatherTemp.text('Temperature: ' + temp + 'F');
    var weatherHum = $('<p>');
    weatherHum.text('Humidity: ' + humidity);

    $('.forecastDiv').append(forecastDiv);
    forecastDiv.append(weatherIcon, weatherTemp, weatherHum);
  }
});

// use this calc to change the temp to F
// $(".high-" + i).text("High: " + Math.floor((data.daily[i].temp.max - 273.15) * 9/5 + 32) + "\xB0");
// data.daily[i].temp.max - 273.15) * 9/5 + 32) + "\xB0");
// "\xB0" this puts in the degrees symbol
