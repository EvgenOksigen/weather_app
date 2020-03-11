import * as types from "./types";
import api from '../../../api'; // like api
import moment from 'moment'


export const userSignIn = ( {token} ) => { 
  
  if (token) {
    
    localStorage.setItem("token", token);
     
    return {
      type: types.SIGN_IN,
      token
    };
  }
};

export const setMe = user =>{

user.birth_date = moment(user.birth_date).format("DD-MM-YYYY")

return ({
  type: types.SET_ME,
  user: {
    ...user,
    // permissions: user.allPermissions
  }
})
}

export const signIn = (credentials) => dispatch =>
  api.users.signin(credentials).then(d => (d ? dispatch(userSignIn(d.data)):d))

 
export const me = () => dispatch => 
api.users.me().then(data => dispatch(setMe(data)));

export const signOut = () => {
  localStorage.removeItem("token");

  return {
    type: types.SIGN_OUT
  };
};
