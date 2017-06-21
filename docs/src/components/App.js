// @flow

import React from 'react';
import PropTypes from 'prop-types';
import Page from 'docs/src/components/Page';

function App(props) {
  return <Page />;
}

App.propTypes = {
  dark: PropTypes.bool.isRequired,
};

export default App;
