import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import { ThemeProvider } from 'styled-components';
import { AppContainer } from 'react-hot-loader';
import theme from '../src/theme/theme';
// import Root from './Root';
import Root from './Root';
import configureStore from './store';

const history = createHistory();
const store = configureStore(history);
if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update')
  whyDidYouUpdate(React)
}
ReactDOM.render(
  <AppContainer>
    <Provider store={ store }>
      <ConnectedRouter history={ history }>
        <ThemeProvider theme={ theme }>
        <Root theme={ theme }/>
      </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('app'),
);
