// import { useState,useEffect } from 'react';
// import './App.css';
// // import react from 'react';


// export default function App() {
  
//   let [getValue,setValue]=useState()
//   let [data,setData]=useState()
//   // console.log(data)
//   // let submit=(e)=>{
//   //   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${getValue}&appid=751d66e130befad396405dc13796a57c&units=metric`)
//   //   .then((res)=>res.json())
//   //   .then((finalres)=>{
//   //     console.log(finalres)
//   //   })
//   //   setData(finalres)
    
//   // }


  
//   // let Submit= async ()=>{
//   //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${getValue}&appid=751d66e130befad396405dc13796a57c&units=metric`;
    
//   //   const response = await fetch(url);
//   //   const parsedData = await response.json();
//   //   setData(parsedData)  
//   //   console.log(parsedData) 
//   // }

//   const fetchData = async () => {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=malkapur&appid=751d66e130befad396405dc13796a57c&units=metric`;
    
//     const response = await fetch(url);
//     const parsedData = await response.json();
//     setData(parsedData)  
//     // console.log(parsedData) 
   
// }

// useEffect(() => {
//     fetchData();
// }, []);

//   return (
//     <>
//       <div className="container">
//         <h1>Weather App</h1>
//         <form   id="passwordForm">
//           <div className="form-group">
//             <input type="text" value={getValue} onChange={(e)=>setValue(e.target.value)} placeholder="Enter City Name" />
//             <button type="button" >Submit</button>
//           </div>
//           <div className="form-group">
//             <h2>{}</h2>
//           </div>
//           <div className="form-group">
//             <h2></h2>
//           </div>
//           <div className="form-group">
//             <img src="" alt="Nature" />
//           </div>
//           <div className="form-group">
//             <p>clear</p>
//           </div>
//         </form>
//       </div>
//     </>
//   )
// }










import React, { useState, useEffect } from 'react';
import './App.css';
import Spinnar from './Spinnar'

export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  let [loading, setLoading] = useState()
 


  useEffect(() => {
    if (city.trim() !== '') {
      fetchData(city);
    }
  }, [city]);

  const fetchData = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`);
      setLoading(true)
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(city);
  };

  return (
    <div className="container">
      
      <h1>Weather App</h1>
     {loading && <Spinnar/>} 
      <form onSubmit={handleSubmit} id="weatherForm">
        <div className="form-group">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name"
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name} {weatherData.sys.country}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="" />
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}
