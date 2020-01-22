import React from 'react';
import Info from './components/Info';
import Form from './components/Form';
import Weather from './components/Weather';
import ReduxTest from './components/ReduxTest';

import './wrapper.css';
import { API_KEY } from './helpers';



class App extends React.Component{

  state = {
    temp : undefined,
    city : undefined,
    country : undefined ,
    sunrise : undefined,
    sunset : undefined,
    isShowing: false,
    error : undefined
  }

  gettingWeather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    
    if(city){
      
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

    else{
      this.setState({        
          temp : undefined,
          city : undefined,
          country : undefined ,
          sunrise : undefined,
          sunset : undefined,
          isShowing: true,
          error : "ERROR : Введите название города !"
      })
    }

    

  }


  render() {
    return(
      <div className="wrapper">
        <div className="container">
              <Info/>
              <Form getWeather={this.gettingWeather} />
              <Weather temp={this.state.temp}
                      city={this.state.city}
                      country={this.state.country}
                      sunrise={this.state.sunrise}
                      sunset={this.state.sunset}
                      error={this.state.error}
                      />
                      <ReduxTest />

        </div>
      </div>
    )
  }
}

export default App;
  