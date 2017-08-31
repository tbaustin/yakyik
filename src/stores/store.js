import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  accountReducer,
  zoneReducer,
  commentReducer,
  profileReducer
} from '../reducers';

let store;

export default {
  configureStore: () => {
    const reducers = combineReducers({
      zone: zoneReducer,
      comment: commentReducer,
      account: accountReducer,
      profile: profileReducer
    });

    store = createStore(reducers, applyMiddleware(thunk));

    return store;
  },

  currentStore: () => {
    return store;
  }
};
