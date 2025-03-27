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
