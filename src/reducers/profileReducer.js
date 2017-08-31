import constants from '../constants/constants';

const initialState = {
  list: [],
  map: {},
  appStatus: 'ready'
};

export default (state = initialState, action) => {
  let updatedState = Object.assign({}, state);
  let updatedList = Object.assign([], updatedState.list);
  let updatedMap = Object.assign({}, updatedState.map);

  switch (action.type) {
    case constants.PROFILE_RECEIVED:
      updatedList = [action.profile];
      updatedState['list'] = updatedList;

      updatedMap[action.profile.username] = action.profile;
      updatedState['map'] = updatedMap;

      updatedState['appStatus'] = action.status;

      return updatedState;

    case constants.APPLICATION_STATE:
      if (action.reducer != 'profile') {
        return updatedState;
      }
      updatedState['appStatus'] = action.status;
      return updatedState;

    default:
      return state;
  }
};
