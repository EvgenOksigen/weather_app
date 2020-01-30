import * as types from "./types";
// import api from "../../../api";
import api from '../../../api'; // like api


const apiUser = ms => new Promise(resolve=> {setTimeout(resolve, ms);});

  async function sin(data, ms) {
    await apiUser(ms).then(()=> data)
  }


export const userSignIn = ( user ) => { //let take users by timeout
  
  if (user) {
    //plase for JWT 
     
    localStorage.setItem("user", JSON.stringify(user));

    return {
      type: types.SIGN_IN,
      user
    };
  }
};

export const setMe = user =>{
return ({
  
  type: types.SET_ME,
  user: {
    ...user,
    // permissions: user.allPermissions
  }
})
}

export const me = () => dispatch => {

  const data = JSON.parse(localStorage.getItem('user'))
  
  
  sin(api.users, 1000).then(() => {
    api.users.forEach((user)=>{
      if(user.password === data.password &&
       (user.nameOrMail === data.username  || user.nameOrMail === data.email)) {
         dispatch(setMe(user))
           }
         }
       )
    
    // dispatch(setMe(data));
  })
}

export const signIn = (data) => dispatch => {

  
 return (
   sin(api.users, 1500).then(()=>
   api.users.forEach((user)=>{
     if(user.password === data.password &&
      (user.nameOrMail === data.username  || user.nameOrMail === data.email)) {
        dispatch(userSignIn(user))
          }
        }
      )
    )
  )
  /* 
  export const signIn = credentials => dispatch =>
  api.user
    .signin(credentials)
    .then(data => (data && !data.errors ? dispatch(userSignIn(data)) : data));
 */
}

export const signOut = () => {
  localStorage.removeItem("user");

  return {
    type: types.SIGN_OUT
  };
};
