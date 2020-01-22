import React, { useEffect, setState, useState } from 'react';
import {connect} from 'react-redux';
import { show, hide, getWeather, setCity } from '../state/ducks/forms/actions';


const ReduxTest = ({city, show, getWeather, forms, setCity})=> {

  const [cityvalue, setCityValue] = useState("");


  const inputHandle = (e) => {
    setCityValue( e.target.value);
  }


  return <div> redux test in console
    <div>
      <input name='city' 
      value={cityvalue}
             onChange={inputHandle}
             >
      </input>
      <button onClick={()=>getWeather(cityvalue)}>
        Get Weater
      </button>
      <div>
      </div>
    </div>
  </div>
}

const mapStateToProps = ({forms}) => ({
  isShow: forms.isShowing,
  city: forms.name
})

const mapDispatchToProps = { hide, getWeather, setCity};



export default connect(mapStateToProps, mapDispatchToProps )(ReduxTest);