import hotBg from './assets/hot.jpg'
import coldBg from './assets/cold.jpg'
import Descriptions from './components/Descriptions';
import { useEffect } from 'react';
import { getFormattedWeatherData } from './weatherService';

function App() {


  useEffect(() => {

    const fetchWeatherData = async () => {
      
      const data = await getFormattedWeatherData('paris')
    }

  }, [])

  return (
  <div className="app" style={{ backgroundImage: `url(${coldBg})` }}>
    <div className='overlay'>
      <div className='container'>
        
        <div className='section section__inputs'>
          <input type="text" name="city" placeholder='Enter city name...' />
          <button>F</button>
        </div>

        <div className='section section__temperature'>
          <div className='icon'>
            <h3>London, GB</h3>
            <img src='' alt='weatherIcon' />
            <h3>Cloudy</h3>
          </div>
          <div className='temperature'>
            <h1>34C</h1>
          </div>
        </div>

        <Descriptions />

      </div>
    </div>
  </div>
  );
}

export default App;
