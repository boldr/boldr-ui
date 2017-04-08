import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import '../src/styles/boldrui.scss';
import Sink from './Sink';

const Root = () => (
  <Router>
    <div>
      <Route exact path="/" component={ Sink } />
    </div>
  </Router>
);

export default Root;
