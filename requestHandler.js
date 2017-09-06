import axios from 'axios';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';

// REACT-ROUTER 4 CHANGES
import { StaticRouter } from 'react-router-dom';

import store from './src/stores/store';
import routes from './src/routes';
import controllers from './controllers';

function handleRequest(req, res, next) {
  let initialStore = null;
  let reducers = {};
  const { account, zone, profile } = controllers;
  const { page, slug } = req.params;
  //get current user
  account
    .currentUser(req)
    .then(result => {
      reducers['account'] = {
        user: result
      };

      //fetch zones
      return zone.get(null);
    })
    .then(zones => {
      reducers['zone'] = {
        selectedZone: 0,
        appStatus: 'ready',
        list: zones
      };

      if (req.url === `/profile/${slug}`) {
        return profile.get({ username: slug });
      }
    })
    .then(profiles => {
      if (profiles) {
        const profile = profiles[0];
        const profileMap = {};
        profileMap[slug] = profile;
        reducers['profile'] = {
          list: [profile],
          map: profileMap,
          appStatus: 'ready'
        };
      }
    })
    .then(() => {
      initialStore = store.configureStore(reducers);

      const initialState = JSON.stringify(initialStore.getState())
        .replace(/<\/script/g, '<\\/script')
        .replace(/<!--/g, '<\\!--');

      const context = {};

      const reactComponent = renderToString(
        <Provider store={initialStore}>
          <StaticRouter location={req.url} context={context}>
            {routes}
          </StaticRouter>
        </Provider>
      );

      if (context.url) {
        redirect(context.status, context.url);
      } else {
        res.status(200).render('index', { reactComponent, initialState });
      }
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = handleRequest;
