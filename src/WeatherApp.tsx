import { useState } from "react";
export const WeatherApp = () => {

  const diffKelvin = 273.15;
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const handleCityChange = (e: any) => {
    setCity(e.target.value);
  }

  const fetchWeatherData = async (city: string) => {
    try {
      const baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const response = await fetch(`${baseUrl}?q=${city}&appid=${apiKey}`);
      const data = await response.json();
      console.log('data', data);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (city.length > 0) {
      fetchWeatherData(city)
    }
  }

  return (
    <div className="container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={city} onChange={handleCityChange}/>
        <button type="submit">Search City</button>
      </form>
      { weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {parseInt(weatherData?.main?.temp - diffKelvin)} °C</p>
          <p>Weather conditions: {weatherData?.weather[0]?.description}</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
        </div>

      )}
    </div>
  )
}
