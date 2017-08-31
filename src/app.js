import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Home, ProfileInfo } from './components/layout';
import { CurrentUser } from './components/containers';
import { Provider } from 'react-redux';
import store from './stores/store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Provider store={store.configureStore()}>
        <div>
          <BrowserRouter>
            <Switch>
              <Route path="/currentuser" component={CurrentUser} />
              <Route path="/profile/:username" component={ProfileInfo} />
              <Route path="/" component={Home} />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));
