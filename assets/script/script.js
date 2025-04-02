
var searchBtn = $('#searchBtn');
var apiKey = '931664c785d510f11897e2e2f9ec4232';
var newsKey = 'd6cab18fc0c54fcf9aaa61177589c449';

var createDataContainer = function (data) {

    // Clear previous data
    $('#dataContainer').empty(); // Clear previous results
    if (!data || data.length === 0) {
        console.error('No data found to display.');
        return;
    }
           
    for (var i = 0; i < 5; i++) {
        var tempCelsius = function (kelvin) {
            return Math.round(kelvin - 273.15) * 9/5 + 32; // Convert Kelvin to Celsius and round it 
        }

        var meterpsToMph = function (meterps) {
            return Math.round(meterps * 2.23694); // Convert meters per second to miles per hour and round it
        }

        var dataContainer = $('#dataContainer');

        var dataRow = $('<div>');
        dataRow.addClass('row dataRow p-5'); // Add a unique class for each row


        var dataName = $('<div>');
        dataName.addClass('col-6 dataName');
        dataName.text(data.list[i].weather[0].description); // Example incident name

        var data1 = $('<div>');
        data1.addClass('col data1');
        data1.text(data.list[i].main.humidity + '%'); // Example rain percentage value

        var data2 = $('<div>');
        data2.addClass('col data2');
        data2.text(tempCelsius(data.list[i].main.temp) + '°C'); // Example proximity value

        var data3 = $('<div>');
        data3.addClass('col data3');
        data3.text(meterpsToMph(data.list[i].wind.speed) + ' mph'); // Example wind speed value

        // Append the elements to the incidentContainer
        
        dataRow.append(dataName);
        dataRow.append(data1);
        dataRow.append(data2);
        dataRow.append(data3);

        dataContainer.append(dataRow);
    }

};

$('#cityInput').on('input', function (event) {
    event.preventDefault(); // Prevent default form submission
    var city = $('#cityInput').val().trim();
  
    if (city === '') {
        $('#dataContainer').empty(); // Clear previous results if input is empty
        return;
    }
    console.log('Searching for weather in: ' + city);
    citySearch(city);
});

// $('#searchBtn').on('click', function (event) {
//     event.preventDefault(); // Prevent default form submission
//     var city = $('#cityInput').val().trim();
  
//     if (city === '') {
//         alert('Please enter a city name.');
//         return;
//     }
//     console.log('Searching for weather in: ' + city);
//     citySearch(city);
// });

var citySearch = function (city) {
    var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${apiKey}`;

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data); // Log the retrieved data to the console
            chooseCity(data); // Call chooseCity with the retrieved data
        })
        .catch(function (error) {
            console.error('Error fetching weather:', error);
        });
    

}
var chooseCity = function (city) {

    if (!city || city.length === 0) {
        console.error('No city data found.');
        return;
    }
    // Clear previous data
    $('#dataContainer').empty(); // Clear previous results
    // Create a new data container for the selected city
    console.log(city);
    if (city.length === 0) {
        console.error('No city data found.');
        return;
    }
    // Create a new data container for the selected city
    // Check if the city data is valid
    if (!city[0] || !city[0].name) {
        console.error('Invalid city data received.');
        return;
    }

    for (var i = 0; i < 5; i++) {
        var country = city[i].country; // Default to 'Unknown' if country is not available
        var state = city[i].state;
        var cityName = city[i].name;

        if (country === 'US' && state) {
            cityName += ', ' + state; // Append state if available
        } else if (country !== 'US' && state) {
            cityName += ', ' + state; // Append state for non-US countries
        } else if (country !== 'US' && !state) {
            cityName += ', ' + country; // Append country if no state is available
        } else if (country === 'US' && !state) {
            cityName += ', ' + country; // Append country if no state is available
        }
        // Check if the city name is valid and not empty
        if (!cityName || cityName.trim() === '') {
            console.error('Invalid city name found, skipping...');
            continue; // Skip to the next iteration if the city name is invalid
        }
        
        // Ensure the city name is not empty
        cityName = cityName.trim(); // Trim any leading or trailing whitespace
        
        var dataContainer = $('#dataContainer');

        var dataRow = $('<div>');
        dataRow.addClass('row dataRow justify-content-center p-1');


        var dataName = $('<div>');
        dataName.addClass('col-10 dataName'); 
        var option = $('<button>');
        option.addClass('btn btn-secondary btn-lg col-12 option py-3 p-5');
        option.text(cityName);
        option.on('click', function (event) {
            var lat = city[i].lat;
            var lon = city[i].lon;
            weatherSearch(lat, lon); // Call weather search with selected city coordinates
            $('#dataContainer').empty(); // Clear previous results
            $('#cityInput').val(cityName); // Set the input field to the selected city name
            console.log('Weather search initiated for: ' + lat + ', ' + lon);
        }
        );

        dataName.append(option);
        dataRow.append(dataName);

        dataContainer.append(dataRow);
    }
}


// provides possible city matches for a given city name


var weatherSearch = function (lat, lon) {
    if (!lat || !lon) {
        console.error('Invalid latitude or logitude provided for weather search.');
        return;
    }
    // Construct the URL for the weather API
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    // Fetch the weather data from the API

    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data); // Log the retrieved weather data to the console
            createDataContainer(data);
        })
        .catch(function (error) {
            console.error('Error fetching weather:', error);
        });
}



// var countries = function () {
    
//     var url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=${apiKey}`;
    
//     fetch(url)
//         .then(function (response) {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(function (data) {
//             suggestions.innerHTML = ''; // Clear previous suggestions
//             if (data.length === 0) {
//                 console.error('No results found for the specified city.');
//                 return;
//             }
//             data.forEach(city => {
//                 var item = document.createElement('div');
//                 item.textContent = `${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`;
//                 item.classList.add('suggestion-item'); // Add a class for styling

//                 item.onclick = function () {
//                     document.getElementById('cityInput').value = this.textContent;
//                     suggestions.innerHTML = ''; // Clear suggestions after selection
//                     citySearch(this.textContent); // Call the city search function
//                 };

//                 suggestions.appendChild(item);
//             });
//         })
//         .catch(function (error) {
//             console.error('Error fetching weather:', error);
//         });

// }