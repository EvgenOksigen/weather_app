import * as types from "./types";
import axios from 'axios'
import { API_KEY } from "../../../helpers";

export const show = () =>( {
  type : types.SHOW
});


export const hide = () => ({
  type : types.HIDE
});

export const getWeth = (data) => ({
  type : types.GET_WEATHER,
  payload : data
});

export const getWeather = (value) => dispatch =>{
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${API_KEY}`)
    .then(res => {
      dispatch(getWeth(res.data))
    })  
};

export const setCity = () => ({
  type :types.SET_CITY
})