import * as types from "./types";
import createReducer from "../../../utils/createReducer";

const initialState = null;

const signInReducer = createReducer(initialState)({
  [types.SIGN_IN]: (state, { user }) => {

    console.log(user);
    
    return{
    isLogged: true,
    ...user
  }
},

  [types.SET_ME]: (state, { user }) => ({
    ...state,
    ...user,
    permissions: [
      ...user.permissions,
      "reference.action.show",
      "reference.action.create",
      "reference.action.delete",
      "reference.action.edit",
      "racs.action.show",
      "racs.action.create",
      "racs.action.delete",
      "racs.action.edit"
    ],
    isLogged: true
  }),

  [types.SIGN_OUT]: () => null
});

export default signInReducer;
