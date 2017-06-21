// @flow
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactPerf from 'react-addons-perf';
import '../../src/styles/boldrui.scss';
import App from 'docs/src/components/App';

window.Perf = ReactPerf;

const docs = (state = { dark: false }, action) => {
  if (action.type === 'TOGGLE_THEME_SHADE') {
    return {
      ...state,
      dark: !state.dark,
    };
  }
  return state;
};

export const store = createStore(docs);

const DOM_NODE = document.querySelector('#app');

render(
  <AppContainer
    errorReporter={({ error }) => {
      throw error;
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </AppContainer>,
  DOM_NODE,
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default; // eslint-disable-line global-require

    render(
      <AppContainer
        errorReporter={({ error }) => {
          throw error;
        }}
      >
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>,
      DOM_NODE,
    );
  });
}
