import React from 'react';
import ReactDOM from 'react-dom';

import App from './App'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from "history"
import 'antd/dist/antd.css';
require('dotenv').config()

const history = createBrowserHistory();


ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>
  , document.getElementById('root')
);
