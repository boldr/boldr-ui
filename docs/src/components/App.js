// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Home from 'docs/src/pages/Home';
import FormPage from 'docs/src/pages/FormPage';

const history = createHistory();

function App(props) {
  return (
    <Router history={history}>
      <Route path="/" component={Home} />
    </Router>
  );
}

export default App;
