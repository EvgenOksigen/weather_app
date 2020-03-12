import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router } from "react-router-dom";
import history from "./routes/history";


import store from './state/store'


import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

import * as serviceWorker from './serviceWorker';
import {App} from './routes/loadable';


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
  , document.getElementById('root'));

serviceWorker.unregister();
