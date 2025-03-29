var cityInput = $('#cityInput'); 
var newsKey = 'd6cab18fc0c54fcf9aaa61177589c449';


var createCrimeBlock = function () {
    var incidentBlock = $("<div>");
    incidentBlock.addClass("row incidentContainer");


    var incidentContainer = $("<div>");
    incidentContainer.addClass("col-6 incidentName");

    var rainPercentage = $("<div>");
    rainPercentage.addClass("col");

    var proximity = $("<div>");
    proximity.addClass("col");

    var incidentTime = $("<div>");
    incidentTime.addClass(col);



};

var createWeatherBlock = function () {
    var weatherBlock = $("<div>");
    weatherBlock.addClass("row weatherContainer");

    var weatherContainer = $("<div>");
    weatherContainer.addClass("col-6 weatherDay");

    var rainPercentage = $("<div>");
    rainPercentage.addClass("col");

    var temperature = $("<div>");
    temperature.addClass("col");

    var windSpeed = $("<div>");
    windSpeed.addClass("col");
}




// $(document).ready(function () {
//     $('#searchBtn').click(function () {
//         let city = $('#cityInput').val().trim();

//         if (city === '') {
//             alert('Please enter a city name.');
//             return;
//         }

//         fetchWeather(city);
//     });

//     var fetchWeather = function (city) {
//         var apiKey = 'f3d7c2f1a2e7b2b3b6e9b6e1e9b6e9b6';
//         var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

//         fetch(url)
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                 displayWeather(data);
//             })
//             .catch(function (error) {
//                 console.error('Error fetching weather:', error);
//             });
//     }


// }
// );

var fetchWeather = function (city) {
    var apiKey = '931664c785d510f11897e2e2f9ec4232';
    var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data); // Log the retrieved data to the console
            // You can process the data further here
        })
        .catch(function (error) {
            console.error('Error fetching weather:', error);
        });
}

fetchWeather('Birmingham');


