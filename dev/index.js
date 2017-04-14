import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AppContainer } from 'react-hot-loader';
import BoldrTheme from '../src/theme/theme';
// import Root from './Root';
import App from './App';

ReactDOM.render(
  <AppContainer>
    <Router>
      <App />
    </Router>
  </AppContainer>,
  document.getElementById('app'),
);
