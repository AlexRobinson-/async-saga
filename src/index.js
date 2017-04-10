import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import createStore from './create-store';

const store = createStore();

(async () => {
  await store.dispatch({ type: 'INCREMENT' })
  await store.dispatch({ type: 'START_SYNCING' })
  await store.dispatch({ type: 'INCREMENT' })
  await store.dispatch({ type: 'STOP_SYNCING' })
  await store.dispatch({ type: 'INCREMENT' })
})()



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
