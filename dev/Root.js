import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import '../src/styles/boldrui.scss';
import Sink from './Sink';

const Root = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
      </ul>

      <hr />

      <Route exact path="/" component={ Sink } />
    </div>
  </Router>
);

export default Root;
