var searchBtn = $('.searchBtn');
var apiKey = "931664c785d510f11897e2e2f9ec4232";
var newsKey = "d6cab18fc0c54fcf9aaa61177589c449";


var createDataContainer = function () {
    var dataContainer = $('#dataContainer');

    var dataRow = $('<div>');
    dataRow.addClass('row dataRow p-5');


    var dataName = $('<div>');
    dataName.addClass('col-6 dataName');
    dataName.text('Theft from Vehicle'); // Example incident name

    var data1 = $('<div>');
    data1.addClass('col data1');
    data1.text('55% rain'); // Example rain percentage value

    var data2 = $('<div>');
    data2.addClass('col data2');
    data2.text('1.2 Miles'); // Example proximity value

    var data3 = $('<div>');
    data3.addClass('col data3');
    data3.text('00:00PM');

    // Append the elements to the incidentContainer
    
    dataRow.append(dataName);
    dataRow.append(data1);
    dataRow.append(data2);
    dataRow.append(data3);

    dataContainer.append(dataRow);


};
searchBtn.on('click', function () {
    createDataContainer();
});





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
            // You can process the data further here
        })
        .catch(function (error) {
            console.error('Error fetching weather:', error);
        });
}

citySearch('Birmingham');

// provides possible city matches for a given city name


document.getElementById('cityInput').addEventListener('input', function () {
    var input = this.value;

    var url = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`;

    if(input.length > 2) {
        fetch(url)
        .then(response => response.json())
        .then(data => {
        
            
            var suggestions = document.getElementById('suggestions');
            suggestions.innerHTML = ''; // Clear previous suggestions

            data.forEach(city => {
                var item = document.createElement('div');
                item.textContent = `${city.name}, ${city.state ? city.state + ', ' : ''}${city.country}`;
                item.onclick = function() {
                    document.getElementById('cityInput').value = this.textContent;
                    suggestions.innerHTML = ''; // Clear suggestions after selection
                    citySearch(this.textContent); // Call the city search function
                };
                suggestions.appendChild(item);
            });
        })
            .catch(error => console.error('Error fetching city suggestions:', error));
        } else {
            document.getElementById('suggestions').innerHTML = ''; // Clear suggestions if input is less than 3 characters
        }

    }
);
