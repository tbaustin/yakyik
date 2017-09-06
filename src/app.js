import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './stores/store';
import routes from './routes';

const initialState = window.__PRELOAD_STATE__;

class App extends Component {
  render() {
    return (
      <Provider store={store.configureStore(initialState)}>
        <div>
          <BrowserRouter>
            {routes}
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
