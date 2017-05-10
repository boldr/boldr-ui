import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import ConnectedRouter from 'react-router-redux/ConnectedRouter';
import { ThemeProvider } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import theme from '../src/theme/theme';
// import Root from './Root';
import Root from './Root';
import configureStore from './store';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
const history = createHistory();
const store = configureStore(history);
// if (process.env.NODE_ENV !== 'production') {
//   const {whyDidYouUpdate} = require('why-did-you-update')
//   whyDidYouUpdate(React)
// }
ReactDOM.render(
  <AppContainer>
    <Provider store={ store }>
      <ConnectedRouter history={ history }>
        <MuiThemeProvider>
        <ThemeProvider theme={ theme }>
        <Root theme={ theme }/>
      </ThemeProvider>
    </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  </AppContainer>,
  document.getElementById('app'),
);
