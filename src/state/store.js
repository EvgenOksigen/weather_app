import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import * as reducers from "./ducks";


const composeEnhancer =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

export default createStore(
  (state, action) =>
    combineReducers({ ...reducers })(state, action),
  composeEnhancer(applyMiddleware(thunkMiddleware))
);
