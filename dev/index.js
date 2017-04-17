import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import { ThemeProvider } from 'styled-components';
import { AppContainer } from 'react-hot-loader';
import theme from '../src/theme/theme';
// import Root from './Root';
import App from './App';
import configureStore from './store';

const history = createHistory();
const store = configureStore(history);

ReactDOM.render(
  <AppContainer>
    <Provider store={ store }>
      <ConnectedRouter history={ history }>
        <ThemeProvider theme={ theme }>
        <App />
      </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('app'),
);
