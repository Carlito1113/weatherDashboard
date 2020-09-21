
$(document).ready(function () {


$("#weather-btn").on("click", function(event) {
    event.preventDefault();

   var cityInput = $("#weather-input").val().trim();
    console.log(cityInput);
    currentWeather(cityInput);
    forecast(cityInput);


})

function currentWeather(city) {

    $.ajax({
        method="GET",
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