import * as types from "./types";
import createReducer from "../../../utils/createReducer";

const initialState = {
  temp : undefined,
  city : undefined,
  country : undefined ,
  sunrise : undefined,
  sunset : undefined,
  isShowing: false,
  error : undefined
}

const startReducer = createReducer(initialState)({
  [types.SHOW]: (state) => ({
    ...state,
    isShowing: true
  }),

  [types.HIDE]: (state) => ({
    ...state,
    isShowing: false
  }),

  [types.GET_WEATHER]: (state) =>({
    ...state
  }),
  [types.SET_CITY]: (state) => ({
    ...state,
    name: 'London'
  })
});

export default startReducer;