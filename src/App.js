import React, {useState, useEffect} from 'react';
import './App.css';

const api={
    key: "556424942a8b87529cb1c6da0f118e62",
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
    
    const[query, setQuery] =useState('');
    const [weather, setWeather]=useState({});
    const [forecasting, setForecasting]=useState({});

    const search=event=>{
        if(event.key==="Enter"){
            fetch(`${api.base}weather?q=${query}&units=metric&lang=de&APPID=${api.key}`)
            .then(res=>res.json())
            .then(result=>{
               setWeather(result);
               setQuery('');
               console.log(result);
            });
        }   
    }
    const forecast=event=>{
    	fetch(`${api.base}forecast?q=${query}&APPID=${api.key}`)
    	.then(res=>res.json())
    	.then(result=>{
            setForecasting(result);
            console.log(result)
    	})
    }
    const timeStampConvert=(time)=>{
        const dates=new Date(time*1000);
        let hours= dates.getHours();
        const ampm= hours >=12 ? 'P.M' : 'A.M';
        hours =hours % 12;
        hours = hours ? hours : 12;
        const minutes="0" + dates.getMinutes();
        const seconds="0" + dates.getSeconds();
        return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}${ampm}`;
    }
    const dateBuilder=(d)=>{
        const months=["January","February","March","April","May","June","July","August",
        "September","October","November","December"];
        const days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        
        const day= days[d.getDay()];
        const date= d.getDate();
        const month= months[d.getMonth()];
        const year= d.getFullYear();

        return `${day} ${date} ${month} ${year}`;
    }

	return (
		<div className=
         {(typeof weather.main !="undefined")
           ? ((weather.main.temp>16)
             ? 'app warm'
             : 'app')
           :'app'}
        >
         <main>
		  <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search.."
              value={query}
              onChange={event=>setQuery(event.target.value)}
              onKeyPress={search}
            />
           <button type="submit" onClick={forecast}>Weather Forecast</button> 
          </div>
          {(typeof weather.main != "undefined") ? (
           <div> 
            <div className="location-box">
             <div className="location">{weather.name}, {weather.sys.country}</div>
             <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                 {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">
              <img 
              style={{ height: '100px', objectFit: "contain" }}
              src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} 
                  alt="Icon"
              />
              {weather.weather[0].main}</div>
            </div>
            <div className="sunTime">
             <div className="sunrise">
              <h1>Sunrise Time</h1>
              {timeStampConvert(weather.sys.sunrise)}
             </div>
             <div className="sunset">
              <h1>Sunset Time</h1>
              {timeStampConvert(weather.sys.sunset)}
             </div>
            </div>
           </div> 
          ):('')}
          {(typeof weather.list != "undefined") ? (
             <div>
               <h1>LLl</h1>
             </div>
          ):('')}
         </main> 
		</div>
  );
}

export default App;
