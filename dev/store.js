import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

export default function configureStore(history) {
  const reduxRouterMiddleware = routerMiddleware(history);

  const middlewares = [thunk, reduxRouterMiddleware];

  const enhancers = [
    applyMiddleware(...middlewares),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f,
  ];

  // Creating the store
  const store = createStore(rootReducer, compose(...enhancers));

  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
