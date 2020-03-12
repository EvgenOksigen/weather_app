import * as types from "./types";
import api from '../../../api'; // like api
import moment from 'moment'
import { isStudent, isKhai_mail, isAdmin } from "../../../helpers/validate";


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
let role = isKhai_mail(user.email) ? 
              (isStudent(user.email) ? 2 : isAdmin(user.email) ? 0 : 1):null;

return ({
  type: types.SET_ME,
  user: {
    ...user,
    role
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
