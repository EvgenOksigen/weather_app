import * as types from "./types";
import api from '../../../api'; // like api


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
  console.log(user);
  
return ({
  
  type: types.SET_ME,
  user: {
    ...user,
    // permissions: user.allPermissions
  }
})
}

export const signIn = (credentials) => dispatch => api.users.signin(credentials).then(d => (d ? dispatch(userSignIn(d)):d))

 
export const me = () => dispatch => 
api.users.me().then(data => dispatch(setMe(data)));

export const signOut = () => {
  localStorage.removeItem("token");

  return {
    type: types.SIGN_OUT
  };
};
