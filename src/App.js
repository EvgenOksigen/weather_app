import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/Weather';

import './App.css';

const API_KEY = "9ea6825b8b5dae9d2dafb3fa6056126c";

class App extends React.Component{

  state = {
    temp : undefined,
    city : undefined,
    country : undefined ,
    sunrise : undefined,
    sunset : undefined,
    error : undefined
  }

  gettingWeather = async(e) => {
    const city = e.target.elements.city.value;
    if(city){
      
      
      e.preventDefault();
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data = await api_url.json();
      
      console.log(data);
     
      let sunset = data.sys.sunset;
      let sunrise = data.sys.sunrise;

      let dateOfSunset = new Date();
      let dateOfSunrise = new Date();


      dateOfSunset.setTime(sunset);
      dateOfSunrise.setTime(sunrise);
      
      this.setState({
        temp: data.main.temp,
        city : data.name,
        country : data.sys.country ,
        sunrise : `${dateOfSunrise.getHours()} : ${dateOfSunrise.getMinutes()} : ${dateOfSunrise.getSeconds()}`,
        sunset : `${dateOfSunset.getHours()} : ${dateOfSunset.getMinutes()} : ${dateOfSunset.getSeconds()}`,
        error : ""
      })
    }

    

  }


  render() {
    return(
      <div className="App">
        <Info/>
        <Form getWeather={this.gettingWeather} />
        <Weather temp={this.state.temp}
                 city={this.state.city}
                 country={this.state.country}
                 sunrise={this.state.sunrise}
                 sunset={this.state.sunset}
                 error={this.state.error}
                 />
      </div>
    )
  }
}

export default App;
  