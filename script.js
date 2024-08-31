document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    getWeather();
});

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '56d9a8ef06b3162b0c956c7a3467c446'; // Your Weatherstack API key
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Full response:", data); // Log the full response

        if (response.ok && !data.error) {
            const weatherInfo = `
                <div class="weather-info">
                    <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
                    <p><img src="${data.current.weather_icons[0]}" alt="Weather Icon"> 
                    ${data.current.weather_descriptions[0]} - ${data.current.temperature}°C</p>
                    <p>Humidity: ${data.current.humidity}%</p>
                    <p>Wind Speed: ${data.current.wind_speed} km/h</p>
                </div>
            `;
            document.getElementById('weatherDisplay').innerHTML = weatherInfo;
        } else {
            console.error("Error response:", data.error ? data.error.info : 'Failed to fetch weather data');
            document.getElementById('weatherDisplay').innerHTML = `<p class="error">${data.error ? data.error.info : 'Failed to fetch weather data'}</p>`;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('weatherDisplay').innerHTML = '<p class="error">Failed to fetch weather data. Please try again later.</p>';
    }
}
