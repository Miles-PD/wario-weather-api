import Descriptions from './components/Descriptions';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';
import "./App.css"
import Canvas from './components/Canvas';
import * as constants from './constants.js'

function App() {

  const [city, setCity] = useState('Paris');
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState('metric');
  //const [bg, setBg] = useState('hotBg')

  // background graphic stuff
  var [currentBG, setCurrentBG] = useState(null);
  var [currentFG, setCurrentFG] = useState(null)
  const [weatherOverlay, setWeatherOverlay] = useState('blizzard')



  

  useEffect(() => {

    

    const fetchWeatherData = async () => {
      
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      function findBGandFG() {

        const threshold = units === "metric" ? 20 : 60;
    
        if (data.temp <= threshold) {
        setCurrentBG('snow');
        setCurrentFG('snow');
        }
        else {
          setCurrentBG('sunny');
        setCurrentFG('sunny');
        }

      }

      findBGandFG();

    }


    fetchWeatherData();
    console.log(currentBG, 'Effect')

  }, [city, units])

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
      e.currentTarget.blur();
    }
  }

  return (
    <div className="app">
        { weather && ( <Canvas width={640} height={480} currentBG={currentBG} currentFG={currentFG}></Canvas> )}
      <div className='overlay'>
  
    { weather && (
          <div className='container'>
        
            <div className='section section__inputs'>
              <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder='Enter city name...' />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>
    
            <div className='section section__temperature'>
              <div className='icon'>
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt='weatherIcon' />
                <h3>{weather.description}</h3>
              </div>
              <div className='temperature'>
                <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`}</h1>
              </div>
            </div>
    
            <Descriptions weather={weather} units={units} />
    
          </div>
    )}
      </div>
    </div>
    
  );
}

export default App;
