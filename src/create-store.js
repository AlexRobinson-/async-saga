import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';
import createAsyncSagaMiddleware from './async-saga';
import sagas from './sagas';

const asyncSagaMiddleware = createAsyncSagaMiddleware()

export default () => {
  const store = createStore(
    reducer,
    applyMiddleware(
      thunk,
      asyncSagaMiddleware.middleware,
      logger
    )
  )

  asyncSagaMiddleware.initialize(
    store,
    sagas
  )

  return store;
}

