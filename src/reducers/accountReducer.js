import constants from '../constants/constants';

const initialState = {
  user: null
};

export default (state = initialState, action) => {
  let updatedState = Object.assign({}, state);

  switch (action.type) {
    case constants.CURRENT_USER_RECEIVED:
      updatedState['user'] = action.user;
      return updatedState;

    case constants.PROFILE_UPDATED:
      if (action.profile._id != updatedState.user._id) return updatedState;

      updatedState['user'] = action.profile;
      return updatedState;

    default:
      return state;
  }
};
