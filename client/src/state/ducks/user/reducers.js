import * as types from "./types";
import createReducer from "../../../utils/createReducer";

const initialState = null;

const signInReducer = createReducer(initialState)({
  //

  [types.SIGN_IN]: (state, { user }) => {
    return{
      ...user,
      isLogged: true,
  }
},

  [types.SET_ME]: (state, { user }) => {
    return ({
    ...state,
    ...user,
    isLogged: true
  })
}, 

  [types.SIGN_OUT]: () => null
});

export default signInReducer;
