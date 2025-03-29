// Security Shift Dashboard - Initial Setup

// Function to fetch weather data
async function fetchWeather(city) {
    const apiKey = 'YOUR_WEATHER_API_KEY';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

// Function to display weather data
function displayWeather(data) {
    const weatherContainer = document.getElementById('weather');
    weatherContainer.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Condition: ${data.weather[0].description}</p>
    `;
}

// Function to fetch crime reports (Placeholder API)
async function fetchCrimeReports() {
    const crimeApiUrl = 'YOUR_CRIME_API_URL';
    
    try {
        const response = await fetch(crimeApiUrl);
        const data = await response.json();
        displayCrimeReports(data);
    } catch (error) {
        console.error('Error fetching crime reports:', error);
    }
}

// Function to display crime reports
function displayCrimeReports(data) {
    const crimeContainer = document.getElementById('crime-reports');
    crimeContainer.innerHTML = '<h3>Recent Crime Reports</h3>';
    data.forEach(report => {
        crimeContainer.innerHTML += `<p>${report.type} at ${report.location}</p>`;
    });
}

// Run functions on load
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather('Los Angeles'); // Change this to user’s city
    fetchCrimeReports();
});


// 

$(document).ready(function () {
    $("#searchBtn").click(function () {
        let city = $("#cityInput").val().trim();

        if (city === "") {
            alert("Please enter a city name.");
            return;
        }

        fetchWeather(city);
    });

    function fetchWeather(city) {
        let apiKey = "YOUR_API_KEY"; // Replace with your actual API key
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        $.ajax({
            url: apiUrl,
            method: "GET",
            success: function (data) {
                console.log(data); // Check API response in the console
                displayWeather(data);
            },
            error: function () {
                alert("City not found. Please try again.");
            }
        });
    }

    function displayWeather(data) {
        let weatherInfo = `
            <h4>${data.name}, ${data.sys.country}</h4>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;

        $(".selection").html(weatherInfo); // Update the weather section
    }
});
