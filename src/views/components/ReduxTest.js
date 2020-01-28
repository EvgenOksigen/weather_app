import React, { useState } from 'react';
import {connect} from 'react-redux';
import { getWeather } from '../state/ducks/forms/actions';


const ReduxTest = ({ getWeather, data })=> {

  const [cityvalue, setCityValue] = useState("");

  const inputHandle = (e) => {
    setCityValue( e.target.value );
  }

  return (
    <div>
      <input name='city' 
      value={cityvalue}
             onChange={inputHandle}
             >
      </input>
      <button onClick={()=>getWeather(cityvalue)}>
        Get Weater
      </button>
      <p>Name : {data.name}</p>
      <p>Country : {data.sys && data.sys.country}</p>
    </div>
    )
  }

const mapStateToProps = ({ forms }) => ({
  isShow: forms.isShowing,
  city: forms.name,
  data: forms.data
})

const mapDispatchToProps = { getWeather };



export default connect(mapStateToProps, mapDispatchToProps )(ReduxTest);