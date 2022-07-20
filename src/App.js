
import './App.css';
import Search from './components/search/Search';
import CurrentWeather from './components/current_weather/CurrentWeather';
import { weatherApiUrl,apiKey } from './components/api';
import { useState } from 'react';
import Forecast from './components/forecast/Forecast';

function App() {
  const [currentWeather,setCurrentWeather] =useState(null)
  const [forecast,setForecast] =useState(null)

  const handleOnSearchChange= (searchData)=>{
    
    const [lat,lon]= searchData.value.split(" ");
  
    const currentWeatherFetch=fetch(`${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const foreCastFetch = fetch(`${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    Promise.all([currentWeatherFetch,foreCastFetch])
    .then(async(response)=>{

      const weatherResponse= await response[0].json()
      const forecastResponse= await response[1].json()
      
      
      setCurrentWeather({city:searchData.label,...weatherResponse})
      setForecast({city:searchData.label,...forecastResponse})

    })
    .catch(console.log)
  }
  console.log(currentWeather)
  console.log(forecast)
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather &&<CurrentWeather data={currentWeather}/>}
      {forecast &&<Forecast data={forecast}/>}
    </div>
  );
}

export default App;
