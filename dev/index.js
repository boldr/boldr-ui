import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';

import { AppContainer } from 'react-hot-loader';
import BoldrTheme from '../src/theme/theme';
// import Root from './Root';
import App from './App';
import configureStore from './store';

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
  <AppContainer>
    <Provider store={ store }>
      <ConnectedRouter history={ history }>
        <App />
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('app'),
);
