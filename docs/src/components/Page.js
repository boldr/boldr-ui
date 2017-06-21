// @flow

import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Home from 'docs/src/pages/Home';
const history = createHistory();

export default function Page() {
  return (
    <Router history={history}>
      <Route path="/" component={Home} />
    </Router>
  );
}
