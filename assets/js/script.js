$(document).ready(function () {

    

$("#weather-btn").on("click", function(event) {
    event.preventDefault();

   var cityInput = $("#weather-input").val().trim();
    console.log(cityInput);

    if (cityInput === "") {
        alert("You must enter a city");
        return;
    }

    currentWeather(cityInput);
    forecast(cityInput);

})

function currentWeather(city) {

    $.ajax({
        method: "GET",
        url:"https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=2b082fc72e5c1ea2495f67dc43747872&units=imperial"
        
    }).then(function(data){

        console.log(data);

    })
}

function forecast(city) {

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=2b082fc72e5c1ea2495f67dc43747872&units=imperial"
    }).then(function (data){
        console.log(data);
    })
}












})

// use this calc to change the temp to F
// $(".high-" + i).text("High: " + Math.floor((response.daily[i].temp.max - 273.15) * 9/5 + 32) + "\xB0");
// response.daily[i].temp.max - 273.15) * 9/5 + 32) + "\xB0");
// "\xB0" this puts in the degrees symbol
